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
import { Http, Response, 
         Headers, RequestOptions }          from '@angular/http';


import { Observable } from 'rxjs/Observable';
import { LoadConfig } from '../traj/loadconfig.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

 
@Injectable()
export class EntityService {

  private serverUrl = 'http://localhost:3333';  // URL to web API
  private getDataUrl = '/getdata';
  private getEntityUrl = '/getentity';
  private putDataUrl = '/putdata';
  private getdefault1='/getDefault1';
  private getdefault2='/getDefault2';
  private dltAircraft='/dltAir';
  constructor (private http: Http, private loadConfig: LoadConfig) {
    this.loadConfig.getConfig().subscribe( config => this.serverUrl = config.EngineUrl );   
  }




  dltAir(){
     alert("Delete Aircraft from Kolkata?");
    return this.http.get(this.serverUrl + this.dltAircraft)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

/**
 * @ngdoc method
 * @name getsData#It gets data in mongoDB
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
  getData() {
    return this.http.get(this.serverUrl + this.getDataUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
           }
 getDefault1(){
  return this.http.get(this.serverUrl + this.getdefault1)
                    .map(this.extractData)
                    .catch(this.handleError);
              }
getDefault2(){
  return this.http.get(this.serverUrl + this.getdefault2)
                    .map(this.extractData)
                    .catch(this.handleError);
}
  /**
 * @ngdoc method
 * @name getentity#It gets data in mongoDB based on XY hash
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
  getEntity(x,y) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     let a={
        "Coordinates":[
          {
            X : x,
            Y: y,
          }
        ]
      }
   return this.http.put(this.serverUrl + this.getEntityUrl, JSON.stringify(a), options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /**
 * @ngdoc method
 * @name putData#It puts data in mongoDB
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
  putData(entity) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = { "TEntity": entity };
 
    return this.http.put(this.serverUrl + this.putDataUrl, JSON.stringify(data), options)
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
    return body || { };
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