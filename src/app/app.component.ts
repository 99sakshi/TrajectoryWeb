/**
 * @ngdoc Component
 * @name AppComponent
 * 
 * @requires Component
 * @requires SimManager
 * @requires DirectionController
 * @requires UpController
 * @requires CesiumManager
 * @requires TObject
 * @requires StartService
 * @requires LoadConfig
 * @requires EntityService
 * 
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
import { DirectionController } from '../traj/directioncontroller';
import { CesiumManager } from '../traj/cesiummanager';
import { TObject } from '../traj/tobject';
import { StartService } from '../traj/start.service';
import { LoadConfig } from '../traj/loadconfig.service';
import { EntityService } from '../traj/entity.service';
import { TObjectInterface } from '../traj/tobjectInterface';

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
      <button type="button" class="btn btn-danger btn-xs" (click)="deleteEntity()">Delete Aircraft</button>
      <button type="button" class="btn btn-default btn-xs" [class.clicked]="play" (click)="game()">let's PLAY!</button>
       Extents - north: {{ north  }}  east: {{east}}    west: {{west}}    south: {{south}}  
     </div>

     <div id="cesiumContainer">
     </div>
     `,

  styles: [`
      html, body, #cesiumContainer {
      width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; 
     }
     .clicked{
       cursor:pointer;
     }
    `
  ]
})


export class AppComponent { 

      north:any;
      east:any;
      west:any;
      south:any;

      _simManager: SimManager;
      config;
      test;
      play=true;
      EntityNumber;
      Entity;
      ex;

    /**
     * @ngdoc method
     * @name constructorr#Initialize Variables
     *
     * @param {_simanager} _simanager Injectable member
     * @param {EntityService} _entityservice Injectable member
     * @param {startService} startService Injectable member
     * @param {LoadConfig} loadConfig Injectable member
     * @param {CesiumManager} _cesiumManager Injectable member
     * 
     * It initializes the variables of AppComponent. 
     * It displays the View Extents on the Browser.
     *
     */
     constructor(_simManager: SimManager, private _entityservice: EntityService,
                  private startService: StartService,
                  private loadConfig: LoadConfig, 
                  private _cesiumManager:CesiumManager
                 )
     {
          this._simManager = _simManager,
          this.test=false;
          this.play=true; 

          this.north = 0;
          this.east = 0;
          this.west = 0;
          this.south = 0;

          this._cesiumManager.extentcallback = () => {
            this.north = Cesium.Math.toDegrees(this._cesiumManager.extents.north);
            this.east = Cesium.Math.toDegrees(this._cesiumManager.extents.east);
            this.west = Cesium.Math.toDegrees(this._cesiumManager.extents.west);
            this.south = Cesium.Math.toDegrees(this._cesiumManager.extents.south);
          };

           this._cesiumManager.getData = (data:TObjectInterface) => {
              console.log(data); 
              var appObject = new TObject();
              appObject.setParameter(data);
              this._simManager.addEntity(appObject, false); 
           }
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

          var PosMumbai = Cesium.Cartesian3.fromDegrees(72.8777, 19.0760, 100);
          var PosDelhi = Cesium.Cartesian3.fromDegrees(77.1025, 28.7041, 100);
          var PosKolkatta = Cesium.Cartesian3.fromDegrees(88.3639, 22.5726, 100);

          var modelBalloon = "../Models/CesiumBalloon/CesiumBalloon.glb";
          var modelAircraft = "../Models/CesiumAir/Cesium_Air.glb";
          var modelToonMan = "../Models/CesiumMan/Cesium_Man.glb";

          var fwdcontroller = new DirectionController();
          fwdcontroller.setPosition( PosMumbai );
          fwdcontroller.setDirection( Cesium.Cartesian3.fromElements(1.0, 0.0, 0.0) );

          var upcontroller = new DirectionController();
          upcontroller.setPosition( PosKolkatta );
          upcontroller.setDirection( Cesium.Cartesian3.fromElements(0.0, 0.0, 1.0) );

          //this.addAppEntityToManager({_name:"AircraftKolkata",_position:PosMumbai,_modelUrl:modelAircraft,_Controller:fwdcontroller});
          //this.addAppEntityToManager({_name:"BalloonMumbai",_position:PosKolkatta,_modelUrl:modelBalloon,_Controller:upcontroller});
          //this.addAppEntityToManager({_name:"ToomManDelhi",_position:PosDelhi,_modelUrl:modelToonMan,_Controller:null});
      }

    /**
     * @ngdoc method
     * @name addAppEntityToManager # adds AppEntity to SimManager
     * This method creates object of AppEntity class and Direction Controller class.
     * It sets AppEntity's name, position, model and controller.
     * It also adds an entity to sim manager.
     * 
     */
      addAppEntityToManager(tobject:TObjectInterface){

        var appObject = new TObject();
        appObject.setName(tobject._name);
        appObject.setModelUrl(tobject._modelUrl); 
        appObject.setInitialPosition(tobject._position);
        
        var hpr = new Cesium.HeadingPitchRoll(0, 0, 0);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(tobject._position, hpr);
        appObject.setOrientation(orientation);
        appObject.setController(tobject._Controller); 

        // Entity has to be added to the manager before position set 
        this._simManager.addEntity(appObject, false); // for test, dont add to backend
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
         this._simManager.addEntity(null, false); 
      }

    /**
     * @ngdoc method
     * @name getData # Fetches Data
     * This method retrieves the data from the database according
     * to the specified id of the entity.
     */
     getData() {
          var id = '226@884';
          this._cesiumManager.getEntity(id);

      }


     /**
     * @ngdoc method
     * @name deleteEntity # Deletes data
     * This method deletes the data from the database according
     * to the specified id of the entity.
     */
     deleteEntity(){
        var id = '226@884';
        this._entityservice.deleteEntity(id).subscribe(data =>{
        });
      }


     /**
     * @ngdoc method
     * @name removeEntities # Removes data
     * This method deletes all the data from the database.
     */
     remEntities(){ 
        this._simManager.removeAllEntity();
      }


     /**
     * @ngdoc method
     * @name game # Performs Local Hide and Show of data
     * This method removes and displays the data from the globe alternatively.
     */
     game(){
        this.play=!this.play;
        if(this.play){
          this._simManager.showAllEntity();
        }
        else
        {
          this._simManager.hideAllEntity();
        }
      }

};
