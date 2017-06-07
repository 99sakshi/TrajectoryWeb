import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { LoadConfig }               from './loadconfig.service';
import { CesiumManager }            from './cesiummanager';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [  ],
  bootstrap:    [  ],
  providers:    [ LoadConfig, CesiumManager ],
})

export class TrajModule { }
