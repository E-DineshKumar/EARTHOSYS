import { Component, OnInit } from '@angular/core';
import { DjangoService } from './../django.service';
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

  constructor(public djangoService : DjangoService) { }

  ngOnInit() {
    this.magnitude = "";
    this.focal_depth = "";
    this.latitude = "";
    this.longitude = "";
  }

  onsubmit(){
    console.log("hii");
    this.djangoService.predict(this.magnitude,this.focal_depth,this.latitude,this.longitude).subscribe(
      (result) => {
        console.log(result["_body"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
