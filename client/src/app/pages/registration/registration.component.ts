import { Component, OnInit } from '@angular/core';
//import { MatButtonToggleModule } from '@angular/material';
//import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


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
      this.cost=(c-1)*50 + 350;
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
  constructor() { }
  public event_flags={"2":false, "3":false, "4":false, "5":false, "6":false, "7":false, "oh":false, "fmc":false, "3b":false, "4b":false, "5b":false, "mb":false, "sk":false, "py":false, "me":false, "cl":false, "sq":false };
  //public event_obj={"2":false, "3":false, "4":false, "5":false, "6":false, "7":false, "oh":false, "fmc":false, "3b":false, "4b":false, "5b":false, "mb":false, "sk":false, "py":false, "me":false, "cl":false, "sq":false };




  //public event_array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  ngOnInit() {

  }

}
