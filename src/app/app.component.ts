/**
 * @ngdoc Component
 * @name Component
 *
 * @description
 *
 * This method defines the appearence of the WebPage when the project is executed.
 * It adds test buttons to the WebPage.
 * It also specifies the height,width,margin and padding of cesium container.
 *
 * @usage
 *
 * ### How to use
 *
 **/

declare var Cesium: any;

import { Component } from '@angular/core';
import { SimManager } from './simmanager';
import { AppEntity } from './appentity';
import { ForwardController } from './forwardController';
import { UpController } from './upcontroller';
import { ToonMan } from './toonman'
import { Aircraft } from './aircraft'

import { StartService } from '../traj/start.service';
import { LoadConfig } from '../traj/loadconfig.service';
import { CesiumManager } from  '../traj/cesiummanager';


@Component({
  selector: 'my-app',
  template: `
     <div *ngIf="test">
      Test Buttons ->
      <button type="button" class="btn btn-success btn-xs" (click)="startSimulation()">Start</button>
      <button type="button" class="btn btn-warning btn-xs" (click)="pauseSimulation()">Pause</button>
      <button type="button" class="btn btn-danger btn-xs" (click)="stopSimulation()">Stop</button>
      <button type="button" class="btn btn-info btn-xs" (click)="addData()">Add Data</button>
      <button type="button" class="btn btn-default btn-xs" (click)="getData()">Get Data</button>
     </div>

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
      _cesiumManager: CesiumManager;

      config;
      test;

    /**
     * @ngdoc method
     * @name constructorr#Initialize Variables
     *
     * @param {_simanager} _simanager Injectable member
     * @param {_cesiumManager} _cesiumManager Injectable member
     * @param {startService} startService Injectable member
     * @param {loadConfig} loadConfig Injectable member
     * 
     * It initializes the variables of AppComponent. 
     *
     */
      constructor(_simManager: SimManager, _cesiumManager: CesiumManager,
                                            private startService: StartService
                                         ,  private loadConfig: LoadConfig ){
          this._simManager = _simManager,
          this._cesiumManager = _cesiumManager,
          this._simManager.setCesiumManager(this._cesiumManager);

          this.test = false;
      }


    /**
     * @ngdoc method
     * @name ngOnInit#Initializes Config
     *
     * This method initializes config variable
     *
     */
      ngOnInit() {

          this.loadConfig.getConfig().subscribe( data =>  {
                                                            this.config = data;
                                                            this.init();
                                                          } );
      }


    /**
     * @ngdoc method
     * @name init # Adds entity to scene
     *
     * This method Adds test entities to scene
     */
      init() {

          this.test = this.config.Test;

          var PosOregon = Cesium.Cartesian3.fromDegrees(-120.0744619, 48.0503706, 100);
          var PosCalifornia = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100);
          var PosNavada = Cesium.Cartesian3.fromDegrees(-111.0744619, 44.0503706, 100);

          var modelBalloon = "../Models/CesiumBalloon/CesiumBalloon.glb";
          var modelAircraft = "../Models/CesiumAir/Cesium_Air.glb";
          var modelToonMan = "../Models/CesiumMan/Cesium_Man.glb";

          var fwdcontroller = new ForwardController;
          fwdcontroller.setPosition( PosNavada );

          var upcontroller = new UpController;
          upcontroller.setPosition( PosCalifornia );

          this.addAppEntityToManager("ToomManOre", PosOregon, modelToonMan, null);
          this.addAppEntityToManager("BalloonCali", PosCalifornia, modelBalloon, upcontroller);
          this.addAppEntityToManager("AircraftNavada", PosNavada, modelAircraft, fwdcontroller);

      }


    /**
     * @ngdoc method
     * @name addAppEntityToManager # adds AppEntity to SimManager
     * This method creates object of AppEntity class and ForwardController class.
     * It sets AppEntity's name, position, model and controller.
     * It also adds an entity to sim manager.
     */
      addAppEntityToManager(name, position, modelUrl, controller ){

        var appEntity = new AppEntity;
        appEntity.setName(name);
        appEntity.setModelUrl(modelUrl); 

        // Entity has to be added to the manager before position set 
        this._simManager.addEntity(appEntity); 

        appEntity.setPosition(position);
        appEntity.setController(controller); 

      }




    /**
     * @ngdoc method
     * @name startSimulation # Starts Simulation
     * This method starts the movement of Entities
     */
    startSimulation(){
        this.startService.startSimulation().subscribe( data =>  {
                                                                    console.log(data);
                                                                    this._simManager.start()
                                                                } );
    }


    /**
     * @ngdoc method
     * @name pauseSimulation# Halts Movement Of Entities
     * This method halts the movement of the Entities
     */
      pauseSimulation(){
          this._simManager.pause();
      }


    /**
     * @ngdoc method
     * @name stopSimulation# Stops Movement Of Entities
     * This method halts the movement of the Entities
     */
      stopSimulation(){
          this._simManager.stop();
      }


    /**
     * @ngdoc method
     * @name addData # Adds Data
     * This method adds the data to the database.
     */
      addData() {

      }


    /**
     * @ngdoc method
     * @name getData # Fetches Data
     * This method retrieves the data from the database.
     */
      getData() {

      }

}
