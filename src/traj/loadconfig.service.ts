/**
 * @ngdoc service
 * @name loadconfig.service
 * @module traj.module
 *
 * @description Injectable class that receives front end config file from backend
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class LoadConfig {

  config;

  /**
   * @ngdoc method
   * @name  constructor#updateContact
   *
   * @param { http} event Private variable,receives Http
   * Instantiate Service with constructor http: Http in Angular 2
   */
  constructor(private http: Http) {

  }

  /**
   * @ngdoc method
   * @name getConfig#
   *
   * @return { Observable.of(this.config)} returns observalbe of config recived,
   *          error if fails
   */
  getConfig() {
    if (this.config == null)
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
   * @param {res} event Receives the Response event
   *
   * @return {body} It returns the content of JSON
   */
  private extractData(res: Response) {
    let body = res.json();
    this.config = body;
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
  private handleError(error: Response | any) {
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