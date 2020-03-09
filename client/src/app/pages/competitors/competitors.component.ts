import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { parse } from 'querystring';
import { MatGridTileHeaderCssMatStyler } from '@angular/material';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.css']
})
export class CompetitorsComponent implements OnInit {

  //public event_flags={"2":false, "3":false, "4":false, "5":false, "6":false, "7":false, "oh":false, "fmc":false, "3b":false, "4b":false, "5b":false, "mb":false, "sk":false, "py":false, "me":false, "cl":false, "sq":false };

  public eventIconUrls = {

    'three': "https://i.ibb.co/WxZD8Xq/1-3x3x3.png",
    'two': "https://i.ibb.co/M8S3fWB/2-2x2x2.png",
    'four': "https://i.ibb.co/pj1wY2Z/3-4x4x4.png",
    'five': "https://i.ibb.co/P6RxKQs/4-5x5x5.png",
    'six': "https://i.ibb.co/k80pHf0/5-6x6x6.png",
    'seven': "https://i.ibb.co/27jmpP0/6-7x7x7.png",
    'bld3': "https://i.ibb.co/WPtpmn6/7-3x3x3-Blindfolded.png",
    'fmc': "https://i.ibb.co/HntJjH7/8-3x3x3-Fewest-Moves.png",
    'oh': "https://i.ibb.co/jTdn0MJ/9-3x3x3-One-Handed.png",
    'clock': "https://i.ibb.co/prmXRVY/11-Clock.png",
    'mega': "https://i.ibb.co/0fkNWmm/12-Megaminx.png",
    'pyra': "https://i.ibb.co/pW5V53T/13-Pyraminx.png",
    'skewb': "https://i.ibb.co/60tqYK8/14-Skewb.png",
    'sq1': "https://i.ibb.co/xznhKX5/15-Square-1.png",
    'bld4': "https://i.ibb.co/6JHQzXX/16-4x4x4-Blindfolded.png",
    'bld5': "https://i.ibb.co/7WZsGCk/17-5x5x5-BLindfolded.png",
    'mbld': "https://i.ibb.co/P5cyF5G/18-3x3x3-Multi-Blind.png",


  }
  displayedFooter = [];
  displayedColumns = ['name', 'citizenOf', 'three', 'two', 'four', 'five', 'six', 'seven', 'bld3', 'fmc', 'oh', 'clock', 'mega', 'pyra', 'skewb', 'sq1', 'bld4', 'bld5', 'mbld', 'total'];
  psychSheetDisplayedColumns = ['back', 'name', 'best']
  public competitorsDataSource: CompetitorRegistrationData[] = [];
  public psychSheetDataSource: [];
  isFirstTime: boolean = true;
  showCompetitors: boolean = false;
  showPsychSheet: boolean = false;
  public aggregate_data = <CompetitorRegistrationData>{};

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get(environment.baseApiUrl + "/api/competitors/getCompetitors").subscribe((res: { competitors }) => {
      this.competitorsDataSource = [];
      res.competitors.forEach(element => {
        this.competitorsDataSource.push(<CompetitorRegistrationData>{

          name: element.name,
          citizenOf: element.country,
          total: element.events.length,

          three: (element.events.includes('3') ? this.eventIconUrls.three : ''),
          two: (element.events.includes('2') ? this.eventIconUrls.two : ''),
          four: (element.events.includes('4') ? this.eventIconUrls.four : ''),
          five: (element.events.includes('5') ? this.eventIconUrls.five : ''),

          six: (element.events.includes('6') ? this.eventIconUrls.six : ''),
          seven: (element.events.includes('7') ? this.eventIconUrls.seven : ''),
          bld3: (element.events.includes('3b') ? this.eventIconUrls.bld3 : ''),
          fmc: (element.events.includes('fmc') ? this.eventIconUrls.fmc : ''),

          oh: (element.events.includes('oh') ? this.eventIconUrls.oh : ''),
          clock: (element.events.includes('cl') ? this.eventIconUrls.clock : ''),
          mega: (element.events.includes('me') ? this.eventIconUrls.mega : ''),
          pyra: (element.events.includes('py') ? this.eventIconUrls.pyra : ''),

          skewb: (element.events.includes('sk') ? this.eventIconUrls.skewb : ''),
          sq1: (element.events.includes('sq') ? this.eventIconUrls.sq1 : ''),
          bld4: (element.events.includes('4b') ? this.eventIconUrls.bld4 : ''),
          bld5: (element.events.includes('5b') ? this.eventIconUrls.bld5 : ''),
          mbld: (element.events.includes('mb') ? this.eventIconUrls.mbld : ''),

        })


      });

      console.log(this.competitorsDataSource);

      if (this.isFirstTime == true) {
        for (let i in this.competitorsDataSource[0]) {
          this.aggregate_data[i] = "0"
        }
  
        this.aggregation();
        //this.competitorsDataSource.forEach(this.aggregate(this.competitorsDataSource));
        console.log(this.aggregate_data);
        this.showCompetitors = true;
        this.showPsychSheet = false;
        this.isFirstTime = false;
      }
    });
  }
  aggregation() {
    for (let item in this.competitorsDataSource) {
      for (let i in this.competitorsDataSource[item]) {
        if (Number.isInteger(this.competitorsDataSource[item][i])) {
          this.aggregate_data[i] = (this.competitorsDataSource[item][i] + parseInt(this.aggregate_data[i])).toString();
        }
        else if (this.competitorsDataSource[item][i] != null && this.competitorsDataSource[item][i].length > 0) {
          this.aggregate_data[i] = (parseInt(this.aggregate_data[i]) + 1).toString();
        }
      }
    }
  }

  doShowCompetitors() {
    this.showCompetitors = true;
    this.showPsychSheet = false;
    this.ngOnInit();
  }

  doShowPsychSheet() {
    this.showCompetitors = false;
    this.showPsychSheet = true;
    this.ngOnInit();
  }
  

  psychSheet(event) {
    console.log(event);
    const params = new HttpParams().set('event', event);
    this.httpClient.get(environment.baseApiUrl + "/api/competitors/psychSheet", { params: params }).subscribe((res:  []) => {
      this.psychSheetDataSource = res;
    })
    this.doShowPsychSheet();
  }

}

export interface CompetitorRegistrationData {

  name: string;
  citizenOf: string;

  //events
  three: string;
  two: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  bld3: string;
  fmc: string;
  oh: string;
  clock: string;
  mega: string;
  pyra: string;
  skewb: string;
  sq1: string;
  bld4: string;
  bld5: string;
  mbld: string;


  total: string;
}
