import { Component, OnInit } from '@angular/core';
import { DjangoService } from './django.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  visible = 0;
  message : String;
  time = new Date(2018,1,20);
  messages_receiver = ["How can I help you?"];
  messages_sender = [] ;
  magnitude : number;
  depth : number;
  latitude : number;
  longitude : number;
  tsunami : boolean = false;

 constructor(public djangoService : DjangoService) {
    
    Observable.interval(2000*60).subscribe(x => {
      this.djangoService.getEarthquake().subscribe(
          (result) => {            
            this.e_data = [];
            this.p_data = [];
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];
                //console.log(feed.magnitude);
                this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami});
            }
            for (var i = 0; i < jsonData.records.length; i++) {
                var record = jsonData.records[i];
                //console.log(feed.magnitude);
                this.p_data.push({mag : record.magnitude, dep : record.depth, lat : record.latitude, lng : record.longitude, tsu : record.tsunami});
            }
          },
          (error) => {
            console.log(error);
          }
        );
    });
 }
 
 ngOnInit() {
   this.djangoService.getEarthquake() .subscribe(
      (result) => {            
            this.e_data = [];
            this.p_data = [];
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];
                //console.log(feed.magnitude);
                this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami});
            }
            for (var i = 0; i < jsonData.records.length; i++) {
                var record = jsonData.records[i];
                //console.log(feed.magnitude);
                this.p_data.push({mag : record.magnitude, dep : record.depth, lat : record.latitude, lng : record.longitude, tsu : record.tsunami});
            }
          },
          (error) => {
            console.log(error);
          }
        );
  }
  onClickChatbot(){
    this.visible = 1;
  }
  onClickPrediction(){
    this.visible = 2;
  }
  onClickFab(){
    this.visible = 0;
  }
  
  e_data : earthquake_data[]  = [];
  p_data : predict_data[] = [];
  
  onSendMessage(){
    if((this.message.length)!=0){
      this.messages_sender.push(this.message);
        this.djangoService.sendMessage(this.message).subscribe(
          (result) => {            
             if(JSON.parse(result["_body"])["status"]=="success"){
              this.messages_receiver.push(JSON.parse(result["_body"])["response"]);
             }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  onSendPredictor(){
    
    //if((this.magnitude.toString.length != 0 && this.depth.toString.length != 0 && this.latitude.toString.length != 0 && this.longitude.toString.length != 0))
    {
          this.djangoService.sendPredict(this.magnitude, this.depth, this.latitude, this.longitude).subscribe(
          (result) => {            
            console.log(JSON.parse(result["_body"]));
             if(JSON.parse(result["_body"])["status"]=="success"){
               this.tsunami = JSON.parse(result["_body"])["result"];
              this.p_data.push({mag : this.magnitude, dep : this.depth, lat : this.latitude, lng : this.longitude, tsu : this.tsunami});
             }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
interface predict_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  tsu : boolean;
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