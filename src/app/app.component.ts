declare var Cesium: any;

import { Component } from '@angular/core';
import { SimManager } from './simmanager';
import { Missile } from './missile';
import { ForwardController } from './forwardController';

import { StartService } from '../traj/start.service';
import { LoadConfig } from '../traj/loadconfig.service';
import { CesiumManager } from  '../traj/cesiummanager';
import {newObject} from './newobject'

@Component({
  selector: 'my-app',
  template: `
     Test Buttons ->
     <button type="button" class="btn btn-success btn-xs" (click)="startSimulation()">Start</button>
     <button type="button" class="btn btn-warning btn-xs" (click)="pauseSimulation()">Pause</button>
     <button type="button" class="btn btn-danger btn-xs" (click)="stopSimulation()">Stop</button>
     <button type="button" class="btn btn-info btn-xs" (click)="addData()">Add Data</button>
     <button type="button" class="btn btn-default btn-xs" (click)="getData()">Get Data</button>
     
     <div id="cesiumContainer"> </div>
     `,

  styles:[`
      html, body, #cesiumContainer {
      width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
     }
    `
  ]
})

export class AppComponent { 
      
      _simManager: SimManager;
      _cesiumManager: CesiumManager

      config;

      constructor(_simManager: SimManager, _cesiumManager: CesiumManager,
                                            private startService: StartService
                                         ,  private loadConfig: LoadConfig ){
          this._simManager = _simManager,
          this._cesiumManager = _cesiumManager,
          this._simManager.setCesiumManager(this._cesiumManager);
      }

      ngOnInit() {

          this.loadConfig.getConfig().subscribe( data =>  {
                                                            this.config = data;
                                                            this.init();
                                                        } );
      }

      init() {
          this.addEntityToManager();
          this.addEntityToManager2();
          this.addEntityToManager33();

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
      addEntityToManager33(){
        var no = new newObject;
        var controller = new ForwardController;
        no._name = "TestMissile";
        controller.setPosition(no._position);
        no.setController(controller);
        this._simManager.addEntity(no);  
      }
       


      startSimulation(){
        this.startService.startSimulation().subscribe( data =>  {
                                                                    console.log(data);
                                                                    this._simManager.start()
                                                                } );
      }
      
      pauseSimulation(){
          this._simManager.pause();
      }

      stopSimulation(){
          this._simManager.stop();
      }

      addData() {

      }

      getData() {

      }

}
