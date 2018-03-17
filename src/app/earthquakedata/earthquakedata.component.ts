import { Component, OnInit } from '@angular/core';
import { AppComponent} from './../app.component';

@Component({
  selector: 'app-earthquakedata',
  templateUrl: './earthquakedata.component.html',
  styleUrls: ['./earthquakedata.component.css']
})
export class EarthquakedataComponent implements OnInit {

  // magnitude : number;
  // depth : number;
  // latitude : number;
  // longitude : number;
  // epicenter : number;
  // date : String;
  // tsunami : boolean;
  // near_latitude : number;
  // near_longitude : number;
  // distance : number;
  // speed : String;
  e_data: earthquake_data[];
  constructor(public appComponent : AppComponent) { 
    let a = localStorage.getItem("store_data");
    this.e_data = JSON.parse(a);
    
  }


  ngOnInit() {
  }

 // e_data: earthquake_data[]= this.appComponent.e_data;


}
interface earthquake_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  epic : number;
  date : String;
  tsu : boolean;
  near_lat : number;
  near_lng : number;
  distance : number;
  speed : String;
}