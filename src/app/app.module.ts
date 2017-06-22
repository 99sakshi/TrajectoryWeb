/**
 *
 * @ngdoc module
 * @name app
 *
 * @requires NgModule
 * @requires BrowserModule
 * @requires HttpModule,JsonModule
 * @requires TrajModule
 * @requires AppComponent
 * @requires SimManager
 * @requires Missile
 * @requires ForwardController
 *
 * @description
 *
 * This is an app module. It includes all the components for the functioning of the app.
 * It contains BrowserModule, HttpModule, JsonModule and TrajModule.
 * It's providers are SimManager, Missile and ForwardController.
 *
 *
 **/

import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { TEntity }               from '../traj/TEntity';

import { AppComponent }             from './app.component';
import { SimManager }               from './simmanager';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule, TEntity ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ SimManager ],
})

export class AppModule { }
