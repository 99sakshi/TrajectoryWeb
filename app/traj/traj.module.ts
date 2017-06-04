import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { TrajComponent }            from './traj.component';
import { LoadConfig }               from './loadconfig.service';
import { ObjectManager }               from './objectmanager';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [ TrajComponent ],
  bootstrap:    [ TrajComponent ],
  providers:    [ LoadConfig, ObjectManager ],
})

export class TrajModule { }
