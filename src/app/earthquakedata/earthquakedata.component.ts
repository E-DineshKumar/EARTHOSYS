import { Component, OnInit } from '@angular/core';
import { AppComponent} from './../app.component';
import { DjangoService } from './../django.service';
import { Observable } from 'rxjs/Rx';


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
  //e_data: earthquake_data[];
  e_data: earthquake_data[]
  constructor(public appComponent : AppComponent,private djangoService : DjangoService) { 
   
    this.djangoService.getEarthquake() .subscribe(
      (result) => {            
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];
                this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami,near_lat : feed.near_lat, near_lng : feed.near_lng,distance : feed.distance, speed : feed.speed});
            }                  
          },
          (error) => {
            console.log("Error in AppComponent OnInit",error);
          }
        );
  }


  ngOnInit() {
    
  }

 
//  var a = localStorage.getItem("store_data");
//  this.e_data = JSON.parse(a);


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