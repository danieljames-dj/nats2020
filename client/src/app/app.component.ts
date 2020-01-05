import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    loggedIn = false;
    pages = ["Our Team", "Registration", "Competitors", "Schedule", "Merchandise", "Accommodation", "Travel", "FAQ"];
    selectedPage = "Home";
    name = ""
    avatarUrl = ""

    constructor(private httpClient: HttpClient) {
        var url = new URL(window.location.href)
        var code = url.searchParams.get("code");
        if (code != undefined) {
            this.getAccessToken(code)
        }
    }

    public getAccessToken(code) {
        const params = new HttpParams()
            .set('code', code);
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        this.httpClient.get("http://localhost:3000/api/getAccessToken", {params: params, headers: headers}).subscribe((res: {access_token}) => {
            this.getDetails(res.access_token)
        })
    }

    public getDetails(accessToken) {
        const params = new HttpParams()
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + accessToken
        })
        this.httpClient.get("https://www.worldcubeassociation.org/api/v0/me", {params: params, headers: headers}).subscribe((res: {me}) => {
            if(res.me != undefined) {
                this.name = res.me.name
                this.avatarUrl = res.me.avatar.url
                this.loggedIn = true
            }
        })
    }

    login() {
        window.location.replace("https://www.worldcubeassociation.org/oauth/authorize?client_id=cavDExYlzIT3bo_X6ZaYwJ55CJceHT4Yrmx1PVtYwxM&redirect_uri=http%3A%2F%2Flocalhost%3A4200&response_type=code&scope=public+dob+email")
    }

    openPage(page) {
        this.selectedPage = page
    }

    logout() {
        //
    }
}
