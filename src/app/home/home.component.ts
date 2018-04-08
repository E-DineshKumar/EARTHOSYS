import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';
import { Observable } from 'rxjs/Rx';
import { DjangoService } from './../django.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  e_data: earthquake_data[];
  constructor(private djangoService: DjangoService) {
    Observable.interval(2000 * 60).subscribe(x => {
      let a = localStorage.getItem("store_data");
      this.e_data = JSON.parse(a);
    })
  }

  ngOnInit() {
    let a = localStorage.getItem("store_data");
    this.e_data = JSON.parse(a);
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