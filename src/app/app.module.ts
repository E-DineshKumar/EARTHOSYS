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
import { AgmCoreModule } from '@agm/core';
import { DjangoService } from './django.service';
import { EarthquakedataComponent } from './earthquakedata/earthquakedata.component';
import { AboutComponent } from './about/about.component';
import { SourcesComponent } from './sources/sources.component';
import { ContactComponent } from './contact/contact.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '' , redirectTo: '/home',  pathMatch: 'full'},
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'map', component: MapComponent },
  { path: 'earthquake', component: EarthquakedataComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'sources', component: SourcesComponent },
  { path: '**', component: HomeComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatbotComponent,
    MapComponent,
    EarthquakedataComponent,
    AboutComponent,
    SourcesComponent,
    ContactComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    DataTablesModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCo-UQRP3Eapowr1mvUSdzxIZSyIPdB_-I'
    })
  ],
  providers: [DjangoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
