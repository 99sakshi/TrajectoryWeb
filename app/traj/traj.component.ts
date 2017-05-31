declare var Cesium: any;

import { Component } from '@angular/core';

@Component({
  selector: 'traj-app',
  template: `
     Trajectory Module works!!!
     `
})

export class TrajComponent {

      trajData; 

      constructor( ){
            this.trajData = "This is trajectory Data";
      }

      ngOnInit() {

        
      }

}
