import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  // Observable.interval(2000 * 60).subscribe(x => {
    
  // });

  onClickChatbot(){
    this.visible = 1;
  }
  onClickPrediction(){
    this.visible = 2;
  }
  onClickFab(){
    this.visible = 0;
  }

  
  e_data: earthquake_data[] = [
	  {
      mag : 7.8,
      dep : 60,
		  lat: 51.673,
		  lng: 7.815,
      tsu : true
	  },
	  {
		  mag : 7.8,
      dep : 60,
		  lat: 51.673,
		  lng: 7.815,
      tsu:true
	  },
	  {
		  mag : 7.8,
      dep : 60,
		  lat: 51.673,
		  lng: 7.815,
      tsu:true
	  }
  ]
  onClickpredict(){
    
  }
<<<<<<< HEAD
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
              this.e_data.push({mag : this.magnitude, dep : this.depth, lat : this.latitude, lng : this.longitude, tsu : this.tsunami});
             }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
=======

>>>>>>> parent of d72c70b... Added messenger service
  

}
interface earthquake_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  tsu : boolean;
}