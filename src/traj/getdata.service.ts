/**
 * @ngdoc service
 * @name getdata.service
 * @module traj.module
 *
 * @description sends start request to backend server
 *
 * ## Instead of copying and pasting the same code over and over, you'll create a single reusable data service 
 * and inject it into the components that need it.Using a separate service keeps components lean and focused on 
 * supporting the view, and makes it easy to unit-test components with a mock service.
 */
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { LoadConfig } from '../traj/loadconfig.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class GetdataService {

  private serverUrl = 'http://localhost:3333';  // URL to web API
  private startUrl = '/getdata';

  constructor (private http: Http, private loadConfig: LoadConfig) {
    this.loadConfig.getConfig().subscribe( config => this.serverUrl = config.EngineUrl );   
  }
/**
 * @ngdoc method
 * @name startSimulation#It start simulation
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
  getsData() {
    return this.http.get(this.serverUrl + this.startUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
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