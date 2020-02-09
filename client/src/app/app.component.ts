import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppRoutes } from './app-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    loggedIn = false;
    appRoutes = AppRoutes.slice(1);
    homeRoute = AppRoutes[0]
    pages = ["Team", "Registration", "Competitors", "Schedule", "Events", "Merchandise", "Accommodation", "Travel", "FAQs"];
    selectedPage = "Home";
    name = ""
    avatarUrl = ""

    constructor(private router: Router, private httpClient: HttpClient) {
        if (localStorage.getItem('loggedIn') == undefined) {
            localStorage.setItem('loggedIn', this.loggedIn.toString())
        } else {
            this.loggedIn = localStorage.getItem('loggedIn') === 'true'
        }
        this.getDetails()
    }

    isCurrentRouter(page) {
        return "/" + page.path === this.router.url;
    }

    open(page) {
        this.router.navigate([page.path])
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
        window.location.href = window.location.origin + environment.loginPath + "?redirect=" + window.location.origin + "&origin=" + window.location.origin
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
