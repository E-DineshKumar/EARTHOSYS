import { Injectable } from '@angular/core';
import { Http ,Response, Headers} from '@angular/http';
import { RequestOptions, URLSearchParams,RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DjangoService {

  constructor(public http : Http) { }

  getEarthquake(){    
    return this.http.get('http://localhost:8000/api/feeds/1/');
  }
  getEarthquakeHome(){    
    return this.http.get('http://localhost:8000/api/feeds/');
  }
  sendPredict(magnitude, depth, latitude, longitude){
    var data = {"magnitude" : magnitude, "depth" : depth , "latitude": latitude, "longitude": longitude };
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(data);
    return this.http.post('http://localhost:8000/api/predictor/',body,options);
  }
  sendMessage(message){
    var data = {"input" : message};
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(data);
    return this.http.post('http://localhost:8000/api/chatbot/',body,options);
  }
  
}
