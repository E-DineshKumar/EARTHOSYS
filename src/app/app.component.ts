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
  predict_message : String;
 constructor(public djangoService : DjangoService) {
    this.predict_message = "";
    Observable.interval(2000*60).subscribe(x => {
      this.djangoService.getEarthquakeHome().subscribe(
          (result) => {
            this.e_data = [];
            this.p_data = [];
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];
                this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami, near_lat : feed.nearest_lat, near_lng : feed.nearest_lng,distance : feed.distance, loc: feed.location, speed : feed.speed});
                //console.log(feed.nearest_lat);
                localStorage.setItem("store_data",JSON.stringify(this.e_data));
            }
            for (var i = 0; i < jsonData.records.length; i++) {
                var res = jsonData.records[i];
                this.p_data.push({mag : res.magnitude, dep : res.depth, lat : res.latitude, lng : res.longitude, tsu : res.tsunami,near_lat : res.nearest_lat,near_lng : res.nearest_lng,distance : res.distance,loc : res.location,speed : res.speed,date : res.date});
            }
          },
          (error) => {
            console.log("Error in AppComponent getEarthquake function ",error);
          }
        );
  
    });
 }

 ngOnInit() {
       this.djangoService.getEarthquakeHome() .subscribe(
      (result) => {
            this.e_data = [];
            this.p_data = [];
            var jsonData = JSON.parse(result["_body"]);
            for (var i = 0; i < jsonData.feeds.length; i++) {
                var feed = jsonData.feeds[i];
                this.e_data.push({mag : feed.magnitude, dep : feed.depth, lat : feed.latitude, lng : feed.longitude,epic : feed.epicenter,date : feed.date, tsu : feed.tsunami, near_lat : feed.nearest_lat, near_lng : feed.nearest_lng,distance : feed.distance, loc : feed.location, speed : feed.speed});                
            }
            for (var i = 0; i < jsonData.records.length; i++) {
                var res = jsonData.records[i];
                this.p_data.push({mag : res.magnitude, dep : res.depth, lat : res.latitude, lng : res.longitude, tsu : res.tsunami,near_lat : res.nearest_lat,near_lng : res.nearest_lng,distance : res.distance,loc : res.location,speed : res.speed,date : res.date});
            }
            
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
      
      var predict = new Howl({
        src: ['./../assets/predict.mp3']
      });
      predict.play();
          this.djangoService.sendPredict(this.magnitude, this.depth, this.latitude, this.longitude).subscribe(
          (result) => {
             if(JSON.parse(result["_body"])["status"]=="success"){
               var res = JSON.parse(result["_body"]);
               this.tsunami = res["result"];
              //this.p_data.push({mag : res.magnitude, dep : res.depth, lat : res.latitude, lng : res.longitude, tsu : res.tsunami,near_lat : res.nearest_lat,near_lng : res.nearest_lng,distance : res.distance,loc : res.location,speed : res.speed,date : res.date});
               this.predict_message ="Message : "+res["description"];              
              setTimeout(() => {
                this.predict_message = "";
              }, 7000);
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
  date : String;
  tsu : boolean;
  near_lat : number;
  near_lng : number;
  distance : number;
  loc : String;
  speed : String;
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
  loc : String;
  speed : String;
}
interface messages{
  message : String;
  self : boolean;
}
