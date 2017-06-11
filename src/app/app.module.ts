import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { TrajModule }               from '../traj/traj.module';

import { AppComponent }             from './app.component';
import { SimManager }               from './simmanager';


@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule, TrajModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ SimManager ],
})

export class AppModule { }
