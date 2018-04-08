import { Component, OnInit } from '@angular/core';
import { DjangoService } from './../django.service';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  magnitude: String;
  focal_depth: String;
  latitude: String;
  longitude: String;
  markers: earthquake_data[];
  lat: number = 0.0;
  lng: number = 0.0;
  constructor(public djangoService: DjangoService) {
    let a = localStorage.getItem("store_data");
    this.markers = JSON.parse(a);
    this.lat = this.markers[0].lat;
    this.lng = this.markers[0].lng;
  }

  ngOnInit() {
  }
}
// just an interface for type safety.

interface earthquake_data {
  mag: number;
  dep: number;
  lat: number;
  lng: number;
  epic: number;
  date: String;
  tsu: boolean;
  near_lat: number;
  near_lng: number;
  distance: number;
  loc: String;
  speed: String;
}