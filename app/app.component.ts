declare var Cesium: any;

import { Component } from '@angular/core';
import { SimManager } from './simmanager';
import { Missile } from './missile';
import { ForwardController } from './forwardController';
import { StartService } from './start.service';

@Component({
  selector: 'my-app',
  template: `
     <button type="button" class="btn btn-success" (click)="startSimulation()">Start</button>
     <button type="button" class="btn btn-warning" (click)="pauseSimulation()">Pause</button>
     <button type="button" class="btn btn-danger" (click)="stopSimulation()">Stop</button>
     <div id="cesiumContainer"> </div>
     `,
  providers: [ StartService ],
  styles:[`
      html, body, #cesiumContainer {
      width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
     }
    `
  ]
})

export class AppComponent { 
      
      _simManager: SimManager;

      constructor(_simManager: SimManager,  private startService: StartService){
          this._simManager = _simManager;
      }

      ngOnInit(){

        var viewer =  new Cesium.Viewer('cesiumContainer');
        var imageryLayers = viewer.imageryLayers;
        var myLayer = new Cesium.WebMapServiceImageryProvider({
            url: 'http://192.168.1.5:8181/geoserver/oponop/wms',
            layers:'oponop:World'
        });

        imageryLayers.removeAll();
        imageryLayers.addImageryProvider(myLayer);

        this._simManager.setCesiumViewer( viewer );

        this.addEntityToManager();
        this.addEntityToManager2();
        //this.startSimulation();
      }

      addEntityToManager(){
        var missile = new Missile;
        var controller = new ForwardController;
        missile._name = "TestMissile";

        controller.setPosition(missile._position);

        missile.setController(controller);
        this._simManager.addEntity(missile);
      }

      addEntityToManager2(){
        var missile = new Missile;
        missile._name = "TestMissile2";
        this._simManager.addEntity(missile);
        missile.setPosition(Cesium.Cartesian3.fromDegrees(-120.0744619, 48.0503706, 100));
      }

      startSimulation(){
        this.startService.startSimulation().subscribe( data =>  {
                                                                    console.log(data);
                                                                    this._simManager.start()
                                                                });
      }
      
      pauseSimulation(){
          this._simManager.pause();
      }

      stopSimulation(){
          this._simManager.stop();
      }

}
