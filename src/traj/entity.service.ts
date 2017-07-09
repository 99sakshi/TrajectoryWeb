/**
 * @ngdoc service
 * @name getdata.service
 * @module traj.module
 * 
 * @requires Injectable
 * @requires Http,Response,Headers,RequestOptions
 * @requires Observable
 * @requires LoadConfig 
 * @requires catch operator
 * @requires map operator
 *
 * @description 
 * It sends request to backend server
 * for sending and receiving data.
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
import { TEntity } from './TEntity';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class EntityService {

  private serverUrl = 'http://localhost:3333';  // URL to web API
  private getDataUrl = '/getdata';
  private getDataExtentsUrl = '/getdataExtents';
  private putDataUrl = '/putdata';
  private deleteEntityUrl = '/deleteEntity';
  
  /**
   * @ngdoc method
   * @name  constructor# Establishes connection
   *
   * @param { http} event Private variable,receives Http
   * @param { loadConfig} event Private variable,receives LoadConfig
   * Instantiate Service with constructor http: Http in Angular 2
   */

  constructor (private http: Http, private loadConfig: LoadConfig) {
    this.loadConfig.getConfig().subscribe( config => this.serverUrl = config.EngineUrl );   
  }


/**
 * @ngdoc method
 * @name deleteEntity# It deletes data in mongoDB
 * 
 * @param {id} Receives the id of entity to be deleted
 * 
 * It sends the request to delete the specified entity from the database.
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
   deleteEntity(id:String){
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     let idJSON = {"id":id};
    return this.http.put(this.serverUrl + this.deleteEntityUrl,JSON.stringify(idJSON),options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

/**
 * @ngdoc method
 * @name getData# It gets data from mongoDB
 * 
 * @param {id} Receives the id of entity to be added
 * 
 * It sends the request to add the specified entity from the database.
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
  getData(id:String) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     let a = { "id": id }
     return this.http.put(this.serverUrl + this.getDataUrl, JSON.stringify(a), options)
       .map(this.extractData)
       .catch(this.handleError);
  }

/**
 * @ngdoc method
 * @name getData# It gets data from mongoDB
 * 
 * @param {id} Receives the id of entity to be added
 * 
 * It sends the request to add the specified entity from the database.
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
 getDataExtents(x1:Number,x2:Number,y1:Number,y2:Number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let a = { "x1": x1,
              "x2": x2,
              "y1": y1,
              "y2": y2 
            }
    return this.http.put(this.serverUrl + this.getDataExtentsUrl, JSON.stringify(a), options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**
 * @ngdoc method
 * @name putData# It puts data in mongoDB
 * 
 * @param {entity} Receives entity to be added to the database.
 *
 * @return {.catch(this.handleError)} OK code or error if fails
 */
  putData(entity:TEntity) {
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
    return body || {};
  }

  /**
  * @ngdoc method
  * @name  handleError#handles the error
  *
  * @param {error} event is error event
  *
  * @return {Observable.throw(errMsg)} throws error message
  */
  private handleError(error: Response | any) {// helper function for Error Handling
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
