/**
 * @ngdoc service
 * @name loadconfig.service
 * @module traj.module
 *
 * @description Provides HTTP methods for our firebase connection.
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
/**
 * @ngdoc method
 * @name @Injectable#decorator
 */
@Injectable()
// methods etc. omitted
export class LoadConfig {

  config;
/**
 * @ngdoc method
 * @name  constructor#updateContact
 *
 * @param { http} event Private variable,receives Http
 * Instantiate Service with constructor http: Http in Angular 2
 */
  constructor (private http: Http) {
      
  }
/**
 * @ngdoc method
 * @name getConfig#
 *
 *@return {.catch(this.handleError} It returns the error in the current object
 *
 * @return { Observable.of(this.config)} It returns the Observable method of the current's object configuration
 */
  getConfig() {
    if(this.config == null)
      return this.http.get('config/config.json')
                      .map(this.extractData)
                      .catch(this.handleError);
    else 
      return Observable.of(this.config);
  }
/**
 * @ngdoc method
 * @name extractData#extracts the data
 *
 * @param {res} event Receive the Response
 * It extracts the data
 *
 * @return {body} It returns the body
 */
  private extractData(res: Response) {
    let body = res.json();
    this.config = body;
    return body || { };
  }
  /**
 * @ngdoc method
 * @name  handleError#handles the error
 *
 * @param {error} event Receive the emitted Response
 * It handles the error
 *
 * @return {Observable.throw(errMsg)} It  re-throw an observable from a catch function
 */
  private handleError (error: Response | any) {
 // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    // Normally errors come in as response objects
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();// A generic error fallback
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}