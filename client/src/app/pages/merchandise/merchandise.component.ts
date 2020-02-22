import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css']
})
export class MerchandiseComponent implements OnInit {


  merch = [0,0,0,0];
  constructor() { 
  }





  inc(n){
    this.merch[n]++;
  }
  dec(n){
    this.merch[n]= Math.max(0, this.merch[n]-1);
  }


   
  ngOnInit() {
  }
}
