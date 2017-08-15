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
 * @requires TrajModule
 *
 * @description
 *
 * This is an app module. It includes all the components for the functioning of the app.
 * It contains BrowserModule, HttpModule, JsonModule and TrajModule.
 * It's providers are SimManager, Missile and ForwardController.
 *
 *
 **/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './worldapp.component';


import { TrajModule } from '../traj/traj.module';

@NgModule({
  imports: [BrowserModule, HttpModule, JsonpModule, TrajModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
 
})

export class AppModule { }
