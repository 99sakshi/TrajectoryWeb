declare var Cesium: any;

import { Component } from '@angular/core';
import { SimManager } from './simmanager';
import { Missile } from './missile';
import { ForwardController } from './forwardController';
import { ToonMan } from './toonman'

import { StartService } from '../traj/start.service';
import { LoadConfig } from '../traj/loadconfig.service';
import { CesiumManager } from  '../traj/cesiummanager';


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

          var PosCalifornia =  Cesium.Cartesian3.fromDegrees(-120.0744619, 48.0503706, 100);
          var PosOregon =  Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100);
          var PosMumbai =  Cesium.Cartesian3.fromDegrees(72.8777, 19.0760, 100);

          var controller = new ForwardController;
          controller.setPosition( PosCalifornia );

          this.addMissileToManager("TestMissileCali", PosCalifornia, controller);
          this.addMissileToManager("TestMissileOre", PosOregon, null);
          this.addManToManager("TestMan", PosMumbai);

      }


      addMissileToManager(name, position, controller ){
        var missile = new Missile;
        missile.setName(name);

        // Entity has to be added to the manager before position set 
        this._simManager.addEntity(missile); 

        missile.setPosition(position);
        missile.setController(controller); 
      }

      addManToManager(name , position ){
        var man = new ToonMan;
        var controller = new ForwardController;
        man.setName(name);
        controller.setPosition(position);
        man.setController(controller);
        this._simManager.addEntity(man);  
        man.setPosition(position);
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
