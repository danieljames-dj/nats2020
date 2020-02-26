declare var Instamojo: any;

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css']
})
export class MerchandiseComponent implements OnInit {
  constructor(private httpClient: HttpClient) { 

    const params = new HttpParams();
    this.httpClient.get(environment.baseApiUrl + "/api/merchandise/getMerchandise", {params: params}).subscribe((res: [{merchDetails,regPaid}]) => {
      // console.log(res);
      // if(res.regPaid==true){
      //   this.prev++;
      //   console.log(this.prev);
      // }
      // if (res.accomdetails != undefined) {
      //     this.loggedIn = true;
      // } else {
      //     this.loggedIn = false;
      // }
      // if (res.regPaid == true) {
      //     this.accomodationPaid = true;
      // }
      // this.loading = false;
      // console.log(this.loggedIn, this.accomodationPaid);
      
      
      for (var merch of res) {
        if (merch.merchDetails != undefined && merch.regPaid == true) {
          console.log(merch);
        }
      }
  })

  }

  merchCount = [0,0,0,0];
  merchNames = ['Signature T-shirts','random merch','','']
  merchCosts = [500,700,550,400];
  amount=0
orderText="";
orderTextFunc(){
  this.orderText="";
  for(var i=0; i<this.merchCount.length; i++) {
    if (this.merchCount[i] > 0 ){
      this.orderText+= this.merchNames[i]+ " X " + this.merchCount[i].toString() + "<br>"; 
    }
}
}





updateAmount(){
  this.amount=0;
  for(var i=0; i<this.merchCount.length; i++) {
    this.amount += this.merchCount[i]*this.merchCosts[i];
}
}


  inc(n){
    this.merchCount[n]++;
    this.orderTextFunc();
    this.updateAmount();
    
  }
  dec(n){
    this.merchCount[n]= Math.max(0, this.merchCount[n]-1);
    this.orderTextFunc();
    this.updateAmount();
  }

  makeMerchOrder() {
    var merchData = {
      'merchCounts': this.merchCount,
      'amount': this.amount
    };

    console.log(merchData);

    const params = new HttpParams().set('merchData', JSON.stringify(merchData)).set('webhook', window.location.origin + "/api/merchandise/confirmPayment");

    this.httpClient.get(environment.baseApiUrl + "/api/merchandise/createOrder", {params: params}).subscribe((res: {payment_request}) => {
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
                  console.log("FAILURE");
                  console.log(response);
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

   
  ngOnInit() {
  }
}
