declare var Cesium: any;

import { Component } from '@angular/core';
import { SimManager } from './simmanager';
import { Missile } from './missile';
import { ForwardController } from './forwardController';

import { StartService } from '../traj/start.service';
import { LoadConfig } from '../traj/loadconfig.service';
import { CesiumManager } from  '../traj/cesiummanager';
/**
 * @ngdoc Component
 * @name Component
 *
 * @description
 *
 * This method defines the appearence of the WebPage when the project is executed.
 * It adds buttons to the WebPage.
 * It also specifies the height,width,margin and padding of the WebPage.
 *
 * @usage
 *
 * ### How to use
 * Add buttons to the screen according to the functionalities offered.
 * Set height,width,margin and padding as per the requirement.
 **/
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
 * @name constructorr#InitializeCurrentObjectVariables
 *
 * @param {_simanager} event Receive the object of SimManager
 * @param {_cesiumManager} event Receive the object of CesiumManager
 * @param {startService} event Private Variable, Receives StartsService
 * @param {loadConfig} event Private Variable, Receives LoadConfig 
 * 
 * It initializes the variables of the current object of AppComponent class. 
 *
 */
      constructor(_simManager: SimManager, _cesiumManager: CesiumManager,
                                            private startService: StartService
                                         ,  private loadConfig: LoadConfig ){
          this._simManager = _simManager,
          this._cesiumManager = _cesiumManager,
          this._simManager.setCesiumManager(this._cesiumManager);
      }
/**
 * @ngdoc method
 * @name ngOnInit#InitializesConfig
 *
 * This method initializes current object's loadConfig
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
 * @name initr#AddsEntityToCurrentObject
 *
 * This method adds an Entity to the current object of the class.
 */
      init() {
          this.addEntityToManager();
          this.addEntityToManager2();
      }

/**
 * @ngdoc method
 * @name addEntityToManager#CreatesANewEntity
 * This method creates object of Missile class and ForwardController class.
 * It sets missile._name, position and controller.
 * It also adds an entity to object of current class.
 */
      addEntityToManager(){
        var missile = new Missile;
        var controller = new ForwardController;
        missile._name = "TestMissile";
        controller.setPosition(missile._position);
        missile.setController(controller);
        this._simManager.addEntity(missile);  
      }
/**
 * @ngdoc method
 * @name addEntityToManager2#CreatesANewEntity
 * This method creates object of Missile class.
 * It sets missile._name and position.
 * It also adds an entity to object of current class.
 */
      addEntityToManager2(){
        var missile = new Missile;
        missile._name = "TestMissile2";
        this._simManager.addEntity(missile);
        missile.setPosition(Cesium.Cartesian3.fromDegrees(-120.0744619, 48.0503706, 100));
      }

/**
 * @ngdoc method
 * @name startSimulation#StartsMovementOf3DObject
 * This method starts the movement of the 3D Object by using start() of SimManager class.
 */
      startSimulation(){
        this.startService.startSimulation().subscribe( data =>  {
                                                                    console.log(data);
                                                                    this._simManager.start()
                                                                } );
      }
      /**
 * @ngdoc method
 * @name pauseSimulation#HaltsMovementOf3DObject
 * This method halts the movement of the 3D Object by using pause() of SimManager class.
 */
      pauseSimulation(){
          this._simManager.pause();
      }
/**
 * @ngdoc method
 * @name stopSimulation#StopsMovementOf3DObject
 * This method stops the movement of the 3D Object by using stop() of SimManager class.
 */
      stopSimulation(){
          this._simManager.stop();
      }
/**
 * @ngdoc method
 * @name addData#AddsData
 * This method adds the data to the database.
 */
      addData() {

      }
/**
 * @ngdoc method
 * @name getData#FetchesData
 * This method retrieves the data from the database.
 */
      getData() {

      }

}
