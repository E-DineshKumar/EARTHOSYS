import { Component, OnInit } from '@angular/core';
import { DjangoService } from './django.service';
import { Observable } from 'rxjs/Rx';
import { Howl } from 'howler';


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
  magnitude : number;
  depth : number;
  latitude : number;
  longitude : number;
  tsunami : boolean = false;

 constructor(public djangoService : DjangoService) {

    Observable.interval(2000*60).subscribe(x => {
      this.djangoService.getEarthquake().subscribe(
          (result) => {
            this.p_data = [];
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];

                this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami,near_lat : feed.near_lat, near_lng : feed.near_lng,distance : feed.distance, speed : feed.speed});
            }
            for (var i = 0; i < jsonData.records.length; i++) {
                var record = jsonData.records[i];
                this.p_data.push({mag : record.magnitude, dep : record.depth, lat : record.latitude, lng : record.longitude, tsu : record.tsunami});
            }
          },
          (error) => {
            console.log("Error in AppComponent getEarthquake function ",error);
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
                this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami,near_lat : feed.near_lat, near_lng : feed.near_lng,distance : feed.distance, speed : feed.speed});
            }
            for (var i = 0; i < jsonData.records.length; i++) {
                var record = jsonData.records[i];
                this.p_data.push({mag : record.magnitude, dep : record.depth, lat : record.latitude, lng : record.longitude, tsu : record.tsunami});
            }
            localStorage.setItem("store_data",JSON.stringify(this.e_data));
          },
          (error) => {
            console.log("Error in AppComponent OnInit",error);
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

public e_data : earthquake_data[]  = [];
public p_data : predict_data[] = [];
  messages : messages[] = [{
    message : "How can I help you?",
    self : false
  }];

  onSendMessage(){
    if((this.message.length)!=0){
      var send = new Howl({
      src: ['./../assets/send.mp3']
      });
      send.play();
      this.messages.push({message: this.message, self : true})
        this.djangoService.sendMessage(this.message).subscribe(
          (result) => {
             if(JSON.parse(result["_body"])["status"]=="success"){
                setTimeout(()=>{
                  var receive = new Howl({
                    src: ['./../assets/note.mp3']
                  });
                  receive.play();
                  this.messages.push({message : JSON.parse(result["_body"])["response"], self : false });
                },1500)
             }
          },
          (error) => {
            console.log("Error in AppComponent sendMessage function",error);
          }
        );
        this.message = '';

    }
  }
  onSendPredictor(){

    if((typeof this.magnitude !='undefined' && typeof this.depth !='undefined' && typeof this.latitude !='undefined' && typeof this.longitude !='undefined'))
    {
          this.djangoService.sendPredict(this.magnitude, this.depth, this.latitude, this.longitude).subscribe(
          (result) => {
             if(JSON.parse(result["_body"])["status"]=="success"){
               this.tsunami = JSON.parse(result["_body"])["result"];
              this.p_data.push({mag : this.magnitude, dep : this.depth, lat : this.latitude, lng : this.longitude, tsu : this.tsunami});
             }
          },
          (error) => {  
            console.log("Error in AppComponent onSendPredictor function",error);
          }
        );
    }else{
      alert("Please fill the details");
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
  near_lat : number;
  near_lng : number;
  distance : number;
  speed : String;
}
interface messages{
  message : String;
  self : boolean;
}
