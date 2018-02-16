import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DjangoService } from './django.service';

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

  constructor(public djangoService : DjangoService) { }
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
  send(){
    if((this.message.length)!=0)
    this.messages_sender.push(this.message);
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
    this.e_data.push({mag : this.magnitude, dep : this.depth, lat : this.latitude, lng : this.longitude, tsu : this.tsunami});
  }
  onSendMessage(){
    this.djangoService.sendMessage(this.message).subscribe(
      (result) => {
        console.log(result["_body"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

}
interface earthquake_data {
  mag : number;
  dep : number;
	lat : number;
	lng : number;
  tsu : boolean;
}