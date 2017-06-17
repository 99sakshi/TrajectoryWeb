/**
 *
 * @ngdoc module
 * @name @NgModule
 *
 * @requires NgModule                
 * @requires BrowserModule             
 * @requires HttpModule, JsonpModule   
 * @requires LoadConfig              
 * @requires CesiumManager            
 * @requires StartService    
 * @requires TestdbService
 * @requires GetdataService
 * @requires MongoManager
 * @requires ObjectManager
 * @description
 *
 * This is the trajectory module. It includes all of our components for the trajectory feature.
 * It's providers are LoadConfig, CesiumManager, StartService
 **/

import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';

import { LoadConfig }               from './loadconfig.service';
import { CesiumManager }            from './cesiummanager';
import { ObjectManager }            from './objectmanager';
import { StartService }             from './start.service';
import { TestdbService }            from './testdb.service';
import { GetdataService }            from './getdata.service';
import { MongoManager }            from './mongomanager';


@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [  ],
  bootstrap:    [  ],
  providers:    [ LoadConfig, StartService, TestdbService, GetdataService,
                  ObjectManager, CesiumManager, MongoManager ],
})

export class TrajModule { }
