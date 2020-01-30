import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  displayedColumns = ['event', 'round', 'format', 'timelimit', 'cutoff', 'proceed'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}



export interface PeriodicElement {
  event: string;
  round: string;
  format:string;
  timelimit:string;
  cutoff:string;
  proceed:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {event:"3x3x3 Cube" , round:"First Round" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 120 advance to next round' },
  {event:null , round:"Second Round" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 60 advance to next round' },
  {event:null , round:"Semi Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 16 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"2x2x2 Cube" , round:"First Round" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 75 advance to next round' },
  {event:null , round:"Second Round" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 16 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},


  {event:"4x4x4 Cube" , round:" Combined First Round" , format:'Bo2/Ao5', timelimit:'3:00.00' , cutoff:'2 attempts to get < 1:15.00' , proceed:'Top 24 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},

  
  {event:"5x5x5 Cube" , round:" Combined First Round" , format:'Bo2/Ao5', timelimit:'5:45.00' , cutoff:'2 attempts to get < 2:15.00' , proceed:'Top 12 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"6x6x6 Cube" , round:" Combined First Round" , format:'Bo2/Mo3', timelimit:'10:00.00' , cutoff:'2 attempts to get < 4:30.00' , proceed:'Top 12 advance to next round' },
  {event:null , round:"Final" , format:'Mo3', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"7x7x7 Cube" , round:" Combined First Round" , format:'Bo1/Mo3', timelimit:'10:00.00' , cutoff:'2 attempts to get < 6:15.00' , proceed:'Top 12 advance to next round' },
  {event:null , round:"Final" , format:'Mo3', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"3x3x3 Blindfolded" , round:" Combined First Round" , format:'Bo3', timelimit:'15:00.00 cumulative*' , cutoff:null , proceed:'Top 12 advance to next round' },
  {event:null , round:"Final" , format:'Bo3', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:'3x3x3 Fewest Moves' , round:"Final" , format:'Mo3', timelimit:'1 Hour' , cutoff:null , proceed:null},

  {event:"3x3x3 One-handed" , round:"Combined First Round" , format:'Bo2/Ao5', timelimit:'10:00.00' , cutoff:'2 attempts to get < 1:00.00', proceed:'Top 40 advance to next round' },
  {event:null , round:"Second Round" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 12 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"Clock" , round:"Combined First Round" , format:'Bo2/Ao5', timelimit:'1:15.00' , cutoff:'2 attempts to get < 25.00', proceed:'Top 10 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"Megaminx" , round:"Combined First Round" , format:'Bo2/Ao5', timelimit:'5:30.00' , cutoff:'2 attempts to get < 2:00.00', proceed:'Top 12 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},
  
  {event:"Pyraminx" , round:"First Round" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 75 advance to next round' },
  {event:null , round:"Second Round" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 16 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"Skewb" , round:"First Round" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:'Top 24 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"Square-1" , round:"Combined First Round" , format:'Bo2/Ao5', timelimit:'2:00.00' , cutoff:'2 attempts to get < 45.00', proceed:'Top 16 advance to next round' },
  {event:null , round:"Final" , format:'Ao5', timelimit:'10:00.00' , cutoff:null , proceed:null},

  {event:"4x4x4 Blindfolded" , round:"Final" , format:'Bo3', timelimit:'30:00.00 cumulative*' , cutoff:null, proceed:null},

  {event:"5x5x5 Blindfolded" , round:"Final" , format:'Bo3', timelimit:'45:00.00 cumulative*' , cutoff:null, proceed:null},

  {event:"3x3x3 Multi-Blind" , round:"Final" , format:'Bo2', timelimit:'10:00.00 per cube, up to 60:00.00' , cutoff:null, proceed:null},


 // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];