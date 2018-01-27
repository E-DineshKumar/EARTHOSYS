import { Injectable } from '@angular/core';
import { Http ,Response, Headers} from '@angular/http';
import { RequestOptions, URLSearchParams,RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DjangoService {

  constructor(public http : Http) { }

  predict(magnitude,focal_depth,latitude,longitude){
    var data = {"magnitude" : magnitude, "focal_depth" : focal_depth , "latitude": latitude, "longitude": longitude };
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(data);
    return this.http.post('',body,options);
  }

}
