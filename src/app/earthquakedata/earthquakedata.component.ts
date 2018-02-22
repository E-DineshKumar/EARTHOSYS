import { Component, OnInit } from '@angular/core';
import { AppComponent} from './../app.component';

@Component({
  selector: 'app-earthquakedata',
  templateUrl: './earthquakedata.component.html',
  styleUrls: ['./earthquakedata.component.css']
})
export class EarthquakedataComponent implements OnInit {

  magnitude : number;
  depth : number;
  latitude : number;
  longitude : number;
  epicenter : number;
  date : String;
  tsunami : boolean;

  constructor(public appComponent : AppComponent) { 
    this.magnitude = 0;
    this.depth = 0;
    this.latitude = 0;
    this.longitude = 0;
    this.epicenter = 0;
    this.date = "";
    
  }


  ngOnInit() {
  }

  e_data: earthquake_data[]= this.appComponent.e_data;


}
interface earthquake_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  epic : number;
  date : String;
  tsu : boolean;
}