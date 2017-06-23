import { Injectable }              from '@angular/core';
import { Http, Response, 
  Headers, RequestOptions }          from '@angular/http';


import { Observable } from 'rxjs/Observable';
import { LoadConfig } from '../traj/loadconfig.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GetEntityBackEnd {

  private serverUrl = "http://localhost:3333";  // URL to web API
  private entityUrl = "/getentity";

  constructor (private http: Http, private loadConfig: LoadConfig) {
    this.loadConfig.getConfig().subscribe( config => this.serverUrl = config.EngineUrl );   
  }
/**
 * @ngdoc method
 * @name sendCoordinates#ItSendsCoordinatesToBackEnd
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
  public sendCoordinates(x,y) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    /*let a={
      "classifications":[
        {
          "type1" :x,y
        },{"type2" : y,x}
      ]
    }*/
    var number=1;
   // return
    this.http.put(this.serverUrl + this.entityUrl, {number}, options)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

/**
 * @ngdoc method
 * @name extractData#extracts the data
 *
 * @param {res} event Receives the Response event
 *
 * @return {body} It returns the content of JSON
 */
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  
 /**
 * @ngdoc method
 * @name  handleError#handles the error
 *
 * @param {error} event is error event
 *
 * @return {Observable.throw(errMsg)} throws error message
 */
  private handleError (error: Response | any) {// helper function for Error Handling
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    // Normally errors come in as response objects
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);// Wrong Error Object 
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();// A generic error fallback
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}