import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class LoadConfig {

  config;

  constructor (private http: Http) {
      
  }

  getConfig() {
    if(this.config == null)
      return this.http.get('config/config.json')
                      .map(this.extractData)
                      .catch(this.handleError);
    else 
      return Observable.of(this.config);
  }

  private extractData(res: Response) {
    let body = res.json();
    this.config = body;
    return body || { };
  }
  
  private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}