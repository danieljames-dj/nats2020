declare var Instamojo: any;

import { Component, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import * as moment from "moment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: "app-accommodation",
  templateUrl: "./accommodation.component.html",
  styleUrls: ["./accommodation.component.css"]
})
export class AccommodationComponent implements OnInit {

  loggedIn = false;
  accomodationPaid = false;
  loading = true;

  dormin = 0;
  dormout = 0;
  startDate = new Date(2020, 3, 21);
  dobstart = new Date(1992, 1, 1);
  largeScreen = false;
  iconClass = "";

  mainselect: String;
  selected: String;
  dob = moment();
  fullcin = moment();
  fullcout = moment();
  fulltype: number;
  amount = 0;
  //accomodationChoice="t1";
  sharein = 0;
  shareout = 0;

  preferredRoommate: String;

  constructor(private httpClient: HttpClient, private router: Router) {
    if (localStorage.getItem('loggedIn') != undefined) {
      this.loggedIn = localStorage.getItem('loggedIn') === 'true'
    }

    const params = new HttpParams();
    this.httpClient.get(environment.baseApiUrl + "/api/accomodation/getAccomodations", {params: params}).subscribe((res: {accomdetails, regPaid}) => {
      console.log(res);
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

      var paidAccomodations: []
      if (res.accomdetails != undefined && res.regPaid == true) {
        console.log("RESRES");
        console.log(res);
      }

  })


  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dob = moment(event.value);
  }

  entirecheckin(type: string, event: MatDatepickerInputEvent<Date>) {
    this.fullcin = moment(event.value);
    this.payshare();
  }

  entirecheckout(type: string, event: MatDatepickerInputEvent<Date>) {
    this.fullcout = moment(event.value);
    this.payshare();
  }

  payshare() {
    console.log();
    // if(this.selected=='shared2')
    // (this.accomodationChoice=="t1")?this.amount=2700:(this.accomodationChoice=="t2")?this.amount=3600:  (this.accomodationChoice=="t3")?this.amount=3600:(this.accomodationChoice=="t4")?this.amount=4500:this.amount=0;
    // if(this.selected=='shared3')
    // (this.accomodationChoice=="t1")?this.amount=2400:(this.accomodationChoice=="t2")?this.amount=3200:  (this.accomodationChoice=="t3")?this.amount=3200:(this.accomodationChoice=="t4")?this.amount=4000:this.amount=0;
    if (this.selected == "shared2")
      this.amount = Math.max(0, (this.shareout - this.sharein) * 900);

    if (this.selected == "shared3")
      this.amount = Math.max(0, (this.shareout - this.sharein) * 800);

    if (this.mainselect == "main2") {
      this.amount = Math.max(0, (this.dormout - this.dormin + 1) * 250);
    }
    if (this.selected == "entire") {
      if (this.fulltype == 2) {
        this.amount = Math.max(
          0,
          this.fullcout.diff(this.fullcin, "days") * 1800
        );
      }
      if (this.fulltype == 3) {
        this.amount = Math.max(
          0,
          this.fullcout.diff(this.fullcin, "days") * 2400
        );
      }
    }
  }

  makeAccomodationOrder() {
    var accomodationData = {
      'dormin': this.dormin,
      'dormout': this.dormout,
      'mainselect': this.mainselect,
      'selected': this.selected,
      'dob': this.dob,
      'fullcin': this.fullcin,
      'fullcout': this.fullcout,
      'fulltype': this.fulltype,
      'amount': this.amount,
      'sharein': this.sharein,
      'shareout': this.shareout,
      'preferredRoommate': this.preferredRoommate
    };

    const params = new HttpParams().set('accomodationData', JSON.stringify(accomodationData)).set('webhook', window.location.origin + "/api/accomodation/confirmPayment");

    this.httpClient.get(environment.baseApiUrl + "/api/accomodation/createOrder", {params: params}).subscribe((res: {payment_request}) => {
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
                  this.accomodationPaid = true;
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
    if (window.screen.width > 768) {
      this.iconClass = "fa fa-arrow-circle-left";
    } else {
      this.iconClass = "fa fa-arrow-circle-down";
    }
  }
}
