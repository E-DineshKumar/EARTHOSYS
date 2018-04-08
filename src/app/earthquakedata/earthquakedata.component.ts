import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';

import 'rxjs/add/operator/toPromise';

var object;

@Component({
  selector: 'app-earthquakedata',
  templateUrl: './earthquakedata.component.html',
  styleUrls: ['./earthquakedata.component.css']
})
export class EarthquakedataComponent implements OnInit {

  e_data: earthquake_data[] = [];
  lat: number = 0.0;
  lng: number = 0.0;
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost:8000/api/feeds/',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.e_data = resp.data
            this.lat = this.e_data[0]["latitude"];
            this.lng = this.e_data[0]["longitude"];
            callback({
              draw: resp.draw,
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          });
      },

      columns: [{
        "title": 'Magnitude',
        "data": 'magnitude'
      }, {
        "title": 'Depth',
        "data": 'depth'
      }, {
        "title": 'Latitude',
        "data": 'latitude'
      }, {
        "title": 'Longitude',
        "data": 'longitude'
      }, {
        "title": 'Epicenter',
        "data": 'epicenter'
      }, {
        "title": 'Tsunami',
        "data": 'tsunami'
      }, {
        "title": 'Nearest Latitude',
        "data": 'nearest_lat'
      }, {
        "title": 'Nearest Longitude',
        "data": 'nearest_lng'
      }, {
        "title": 'Distance',
        "data": 'distance'
      }, {
        "title": 'Location',
        "data": 'location'
      }, {
        "title": 'Speed',
        "data": 'speed'
      }]
    };
  }
}
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
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}