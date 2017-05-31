import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';
import { TrajComponent }            from './traj.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [ TrajComponent ],
  bootstrap:    [ TrajComponent ],
})

export class TrajModule { }
