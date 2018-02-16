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
  lat: number = 51.673858;
  lng: number = 7.815982;
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
   
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: false,
      tsunami:true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false,
      tsunami:false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: false,
      tsunami:true
	  }
    
  ]
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
  tsunami:boolean;
}
