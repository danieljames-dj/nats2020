import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css']
})
export class MerchandiseComponent implements OnInit {
  constructor() { 
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


   
  ngOnInit() {
  }
}
