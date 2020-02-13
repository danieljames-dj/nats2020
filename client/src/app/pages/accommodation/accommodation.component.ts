import { Component, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import * as moment from "moment";
@Component({
  selector: "app-accommodation",
  templateUrl: "./accommodation.component.html",
  styleUrls: ["./accommodation.component.css"]
})
export class AccommodationComponent implements OnInit {
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

  prefer: String;

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
      this.amount = Math.max(0, (this.shareout - this.sharein + 1) * 900);

    if (this.selected == "shared3")
      this.amount = Math.max(0, (this.shareout - this.sharein + 1) * 800);

    if (this.mainselect == "main2") {
      this.amount = Math.max(0, (this.dormout - this.dormin + 1) * 250);
    }
    if (this.selected == "entire") {
      if (this.fulltype == 2) {
        this.amount = Math.max(
          0,
          this.fullcout.diff(this.fullcin, "days") * 1700
        );
      }
      if (this.fulltype == 3) {
        this.amount = Math.max(
          0,
          this.fullcout.diff(this.fullcin, "days") * 2260
        );
      }
    }
  }

  constructor() {}

  ngOnInit() {
    if (window.screen.width > 768) {
      this.iconClass = "fa fa-arrow-circle-left";
    } else {
      this.iconClass = "fa fa-arrow-circle-down";
    }
  }
}
