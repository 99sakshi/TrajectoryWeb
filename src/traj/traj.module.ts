/**
 *
 * @ngdoc module
 * @name @NgModule
 *
 * @requires NgModule                
 * @requires BrowserModule             
 * @requires HttpModule,JsonpModule   
 * @requires LoadConfig              
 * @requires CesiumManager 
 * @requires ObjectManager           
 * @requires StartService 
 * @requires EntityService 
 * @requires TEntity    
 * 
 * @description
 *
 * This is the trajectory module. It includes all of our components for the trajectory feature.
 * It's providers are LoadConfig, StartService, ObjectManager, CesiumManager, EntityService and TEntity
 **/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { LoadConfig } from './loadconfig.service';
import { CesiumManager } from './cesiummanager';
import { ObjectManager } from './objectmanager';
import { StartService } from './start.service';
import { EntityService } from './entity.service';
import { TObject } from './tobject';

@NgModule({
  imports: [BrowserModule, HttpModule, JsonpModule],
  declarations: [],
  bootstrap: [],
  providers: [LoadConfig, StartService,
    ObjectManager, CesiumManager,
    EntityService, TObject],
})

export class TrajModule { }
