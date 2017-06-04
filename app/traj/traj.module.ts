import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { TrajComponent }            from './traj.component';
import { LoadConfig }               from './loadconfig.service';
import { CesiumManager }            from './cesiummanager';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [ TrajComponent ],
  bootstrap:    [ TrajComponent ],
  providers:    [ LoadConfig, CesiumManager ],
})

export class TrajModule { }
