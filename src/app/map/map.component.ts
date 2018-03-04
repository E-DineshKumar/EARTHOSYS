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
  constructor(public appComponent : AppComponent, public djangoService : DjangoService) { 
   
  }
  
  ngOnInit() {
      this.djangoService.getEarthquake() .subscribe(
      (result) => {            
            this.markers = [];
            
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];
               
                this.markers.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,date : feed.date, tsu : feed.tsunami});
            }
           
          },
          (error) => {
            console.log(error);
          }
        );
  }
  markers: earthquake_data[] = this.appComponent.e_data;
  
  
  
}
// just an interface for type safety.

interface earthquake_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  date : String;
  tsu : boolean;
}