import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  visible = false;
  message : String;
  time = new Date(2018,1,20);
  messages_receiver = ["How can I help you?"];
  messages_sender = [] ;
  
  onVisible(){
    this.visible = !this.visible;
  }
  send(){
    if((this.message.length)!=0)
    this.messages_sender.push(this.message);
  }
}
