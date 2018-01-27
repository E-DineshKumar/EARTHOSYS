import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MapComponent } from './map/map.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DjangoService } from './django.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '' , redirectTo: '/home',  pathMatch: 'full'},
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'map', component: MapComponent }
  // { path: '**', component: NotfoundComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatbotComponent,
    MapComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [DjangoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
