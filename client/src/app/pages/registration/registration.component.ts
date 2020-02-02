declare var Razorpay: any;
declare var Instamojo: any;

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
//import { MatButtonToggleModule } from '@angular/material';
//import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    loggedIn = false;
    loading = true;
    registered = false;
    res;

    constructor(private httpClient: HttpClient, private router: Router) {
        if (localStorage.getItem('loggedIn') != undefined) {
            this.loggedIn = localStorage.getItem('loggedIn') === 'true'
        }
        const params = new HttpParams()
        this.httpClient.get(environment.baseApiUrl + "/api/payment/getPaymentStatus", {params: params}).subscribe((res: {details, regPaid}) => {
            this.res = res;
            if (res.details != undefined) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
            if (res.regPaid == true) {
                this.registered = true;
            }
            this.loading = false;
            console.log(this.loggedIn, this.registered)
        })
    }

  costUpdate(){
    var c=0;
    for (let key in this.event_flags) {
      if (this.event_flags[key]){
        c++;
      }
     
  }
      
    
    if(c<1){
        this.cost=0;
      }else{
      this.cost=(c)*50 + 350;
      }
    
    console.log(c, this.cost)
  }

  buttonOpacity(id){
    if (this.event_flags[id]){
      return 1
    }else{
      return 0.2
    }

  }
  addEvent(val){
    //this.event_obj[event.target.id]=1;
    //console.log(this.myFlagForButtonToggle);
    //console.log(this.event_obj);
    
    // if(this.event_flags[val]===false){
    //   this.event_obj[val]=true;
    //   this.costUpdate();
    // }else{
    //   this.event_obj[val]=false;
    //   this.costUpdate();
    // }
      
    this.costUpdate();
    console.log(this.event_flags);
    //console.log(this.event_flags[val]);
    //console.log(val);
  
  }

  public cost=0;
  public event_flags={"2":false, "3":false, "4":false, "5":false, "6":false, "7":false, "oh":false, "fmc":false, "3b":false, "4b":false, "5b":false, "mb":false, "sk":false, "py":false, "me":false, "cl":false, "sq":false };
  //public event_obj={"2":false, "3":false, "4":false, "5":false, "6":false, "7":false, "oh":false, "fmc":false, "3b":false, "4b":false, "5b":false, "mb":false, "sk":false, "py":false, "me":false, "cl":false, "sq":false };




  //public event_array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    ngOnInit() {
    }

    makeOrder() {
        var events = new Array();
        for (let i in this.event_flags) {
            if (this.event_flags[i]) {
                events.push(i)
            }
        }
        var self = this
        const params = new HttpParams().set('events', JSON.stringify(events)).set('webhook', environment.baseApiUrl + "/api/payment/confirmPayment");
        this.httpClient.get(environment.baseApiUrl + "/api/payment/createOrder", {params: params}).subscribe((res: {payment_request}) => {
            if (res.payment_request != undefined) {
                Instamojo.configure({
                    handlers: {
                      onOpen: function() {
                          console.log("Payment dialog opened");
                      },
                      onClose: function() {
                        console.log("Payment dialog closed");
                      },
                      onSuccess: function(response) {
                        console.log("Payment successful");
                      },
                      onFailure: function(response) {
                        console.log("Payment failed");
                      }
                    }
                  });

                Instamojo.open(res.payment_request.longurl);

            } else {
                alert("Something went wrong...")
            }
        })
    }

    paymentCompleted(response, self){
        self.httpClient.post(environment.baseApiUrl + "/api/payment/confirmPayment", JSON.stringify(response), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }
        )}).subscribe((res: {success}) => {
            alert(res.success)
        })
    }

}
