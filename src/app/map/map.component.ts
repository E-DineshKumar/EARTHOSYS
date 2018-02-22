import { Component, OnInit } from '@angular/core';
import { DjangoService } from './../django.service';
import { AppComponent } from './../app.component';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  magnitude : String;
  focal_depth : String;
  latitude : String;
  longitude : String;
  lat: number = 23.9888;
  lng: number = 94.7021;
  constructor(public appComponent : AppComponent) { 
   
  }
  
  ngOnInit() {
    this.magnitude = "";
    this.focal_depth = "";
    this.latitude = "";
    this.longitude = "";
  }
  
  markers: earthquake_data[] = this.appComponent.e_data;
  
  
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
  tsunami:boolean;
}
interface earthquake_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  date : String;
  tsu : boolean;
}