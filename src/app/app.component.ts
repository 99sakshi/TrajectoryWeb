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
import { ForwardController } from './forwardController';
import { UpController } from './upcontroller';

import { TEntity } from '../traj/tentity';
import { StartService } from '../traj/start.service';
import { LoadConfig } from '../traj/loadconfig.service';
import { MongoManager } from  '../traj/mongomanager';

import { GetRequest} from '../traj/getRequest';

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
      <h3> (X,Y) ----  Radius  ----  Area</h3>
      <h4>({{x}},{{y}}) ---- {{r}} ---- {{area}}</h4>
     </div>

     <div id="cesiumContainer" (mousemove)="onHover($event)" >
       
     </div>
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

      config;
      test;
       
      x=0;
      y=0;
      r=0;
      area=0;
      EntityNumber;

    /**
     * @ngdoc method
     * @name constructorr#Initialize Variables
     *
     * @param {_simanager} _simanager Injectable member
     * @param {startService} startService Injectable member
     * @param {loadConfig} loadConfig Injectable member
     * 
     * It initializes the variables of AppComponent. 
     *
     */
      constructor(_simManager: SimManager, private _mongoman: MongoManager,
                  private startService: StartService,
                  private loadConfig: LoadConfig, private _getRequest: GetRequest
              
                 )
      {
          this._simManager = _simManager,
          this.test=false;
        
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

          this.EntityNumber = 0;

          var PosMumbai = Cesium.Cartesian3.fromDegrees(72.8777, 19.0760, 100);
          var PosDelhi = Cesium.Cartesian3.fromDegrees(88.3639, 22.5726, 100);
          var PosKolkatta = Cesium.Cartesian3.fromDegrees(77.1025, 28.7041, 100);

          var modelBalloon = "../Models/CesiumBalloon/CesiumBalloon.glb";
          var modelAircraft = "../Models/CesiumAir/Cesium_Air.glb";
          var modelToonMan = "../Models/CesiumMan/Cesium_Man.glb";

          var fwdcontroller = new ForwardController;
          fwdcontroller.setPosition( PosKolkatta );

          var upcontroller = new UpController;
          upcontroller.setPosition( PosMumbai );

          this.addAppEntityToManager(++this.EntityNumber ,"ToomManDelhi", PosDelhi, modelToonMan, null);
          this.addAppEntityToManager(++this.EntityNumber ,"BalloonMumbai", PosMumbai, modelBalloon, upcontroller);
          this.addAppEntityToManager(++this.EntityNumber ,"AircraftKolkatta", PosKolkatta, modelAircraft, fwdcontroller);

      }


    /**
     * @ngdoc method
     * @name addAppEntityToManager # adds AppEntity to SimManager
     * This method creates object of AppEntity class and ForwardController class.
     * It sets AppEntity's name, position, model and controller.
     * It also adds an entity to sim manager.
     */
      addAppEntityToManager(id,name, position, modelUrl, controller ){

        var appEntity = new TEntity;
        appEntity.setId(id);
        appEntity.setName(name);
        appEntity.setModelUrl(modelUrl); 
        appEntity.setPosition(position);
        var hpr = new Cesium.HeadingPitchRoll(0, 0, 0);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        appEntity.setOrientation(orientation);

        // Entity has to be added to the manager before position set 
        this._simManager.addEntity(appEntity); 

        appEntity.setController(controller); 

      }


    /**
     * @ngdoc method
     * @name startSimulation # Starts Simulation
     * This method starts the movement of Entities
     */
    startSimulation(){
       // alert('Start Button Clicked!');
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
          this._mongoman.addData(null);
      }


    /**
     * @ngdoc method
     * @name getData # Fetches Data
     * This method retrieves the data from the database.
     */
      getData() {
          this._mongoman.getData();
      }

      onHover($event)
      {
          this.x=$event.screenX;
          this.y=$event.screenY; 
          this.r=Math.sqrt((this.x*this.x)+(this.y*this.y));
          this.area=(Math.PI*this.r*this.r);
          this._getRequest.sendData(this.x,this.y);
      }

};
