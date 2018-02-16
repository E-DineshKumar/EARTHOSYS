import { Component, OnInit } from '@angular/core';

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

  constructor() { 
    this.magnitude = 0;
    this.depth = 0;
    this.latitude = 0;
    this.longitude = 0;
    this.epicenter = 0;
    this.date = "";
    this.tsunami = false;
  }


  ngOnInit() {
  }

  e_data: earthquake_data[]= [
	  {
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  },
	  {
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  },
	  {
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  },
    {
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  },
	  {
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  },{
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  },
	  {
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  },
    {
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  },
	  {
      mag : 6.3,
      dep : 23,
		  lat : 51.673,
		  lng : 7.815982,
		  epic : 1,
      date : "2018-01-21T14:33:58.792Z",
      tsu:true
	  }
  ]

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