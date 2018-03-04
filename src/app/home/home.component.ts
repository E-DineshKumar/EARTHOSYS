import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';
import { DjangoService } from './../django.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(public appComponent : AppComponent,private djangoService : DjangoService) { }

  ngOnInit() {
    this.djangoService.getEarthquake() .subscribe(
      (result) => {            
            this.e_data = [];
            
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];
                //console.log(feed.magnitude);
                this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami});
            }
            // for (var i = 0; i < jsonData.records.length; i++) {
            //     var record = jsonData.records[i];
            //     //console.log(feed.magnitude);
            //     //this.p_data.push({mag : record.magnitude, dep : record.depth, lat : record.latitude, lng : record.longitude, tsu : record.tsunami});
            // }
          },
          (error) => {
            console.log(error);
          }
        );
  }
  e_data : earthquake_data[] = this.appComponent.e_data;

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