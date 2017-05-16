import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { SimManager }    from './simmanager';
import { Missile }    from './missile';
import { ForwardController }    from './forwardController';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ SimManager, Missile, ForwardController ],
})

export class AppModule { }
