import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '' , redirectTo: '/home',  pathMatch: 'full'},
  { path: 'chatbot', component: ChatbotComponent },
  // { path: '**', component: NotfoundComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatbotComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
