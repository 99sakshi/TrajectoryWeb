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
          this._simManager.setObjectManager(this._cesiumManager);
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

          var PosCalifornia =  Cesium.Cartesian3.fromDegrees(-120.0744619, 48.0503706, 100);
          var PosOregon =  Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100);
          var PosMumbai =  Cesium.Cartesian3.fromDegrees(72.8777, 19.0760, 100);

          var controller = new ForwardController;
          controller.setPosition( PosCalifornia );

          this.addMissileToManager("TestMissileCali", PosCalifornia, controller);
          this.addMissileToManager("TestMissileOre", PosOregon, null);
          this.addManToManager("TestMan", PosMumbai);

      }


    /**
     * @ngdoc method
     * @name addMissileToManager # add Missile to SimManager
     * This method creates object of Missile class and ForwardController class.
     * It sets missile's name, position and controller.
     * It also adds an entity to sim manager.
     */
      addMissileToManager(name, position, controller ){

        var missile = new Missile;
        missile.setName(name);

        // Entity has to be added to the manager before position set 
        this._simManager.addEntity(missile); 

        missile.setPosition(position);
        missile.setController(controller); 
      }


    /**
     * @ngdoc method
     * @name addManToManager # adds Man to SimManager
     * This method creates object of ToonMan class.
     * It sets man's name, position and forward controller
     * and adds it to the sim manager
     */
      addManToManager(name , position ){
        var man = new ToonMan;
        var controller = new ForwardController;
        man.setName(name);
        controller.setPosition(position);
        man.setController(controller);
        this._simManager.addEntity(man);  
        man.setPosition(position);

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
