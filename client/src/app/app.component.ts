import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    loggedIn = false;
    pages = ["Team", "Registration", "Competitors", "Schedule", "Events", "Merchandise", "Accommodation", "Travel", "FAQs"];
    selectedPage = "Home";
    name = ""
    avatarUrl = ""

    constructor(private httpClient: HttpClient) {
        if (localStorage.getItem('loggedIn') == undefined) {
            localStorage.setItem('loggedIn', this.loggedIn.toString())
        } else {
            this.loggedIn = localStorage.getItem('loggedIn') === 'true'
        }
        this.getDetails()
    }

    public getDetails() {
        const params = new HttpParams()
        this.httpClient.get(environment.baseApiUrl + "/api/auth/getLoginDetails", {params: params}).subscribe((res: {isLoggedIn}) => {
            if (res.isLoggedIn === true) {
                this.loggedIn = true
                localStorage.setItem('loggedIn', this.loggedIn.toString())
            } else {
                this.loggedIn = false
            }
        })
    }

    login() {
        window.location.href = window.location.origin + environment.loginPath + "?redirect=" + window.location.href + "&origin=" + window.location.origin
    }

    openPage(page) {
        this.selectedPage = page
    }

    logout() {
        const params = new HttpParams()
        this.httpClient.post(environment.baseApiUrl + "/api/auth/logout", {params: params}).subscribe((res: {}) => {
            this.loggedIn = false
            localStorage.setItem('loggedIn', this.loggedIn.toString())
            window.location.reload()
        })
    }
}
