/**
 *
 * @name TObject
 *
 * @requires NgModule                
 * @requires BrowserModule             
 * @requires HttpModule,JsonpModule   
 * @requires LoadConfig              
 * @requires CesiumManager 
 * @requires ObjectManager            
 * @requires StartService    
 *
 * @description
 *
 * It handles all the functionalities of the entities.
 * It's providers are LoadConfig, CesiumManager, ObjectManager and StartService
 **/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { LoadConfig } from './loadconfig.service';
import { CesiumManager } from './cesiummanager';
import { ObjectManager } from './objectmanager';
import { StartService } from './start.service';
import { TObjectInterface } from './tobjectInterface';

declare var Cesium: any;
@NgModule({
      imports: [BrowserModule, HttpModule, JsonpModule],
      declarations: [],
      bootstrap: [],
      providers: [LoadConfig, StartService, ObjectManager, CesiumManager]
})

export class TObject implements TObjectInterface {

      _id;
      _name;
      _position;
      _orientation;
      _hpr;
      _modelUrl;
      _para;
      _CEntity;  // Cesium Entity
      _Controller;
      isPersistent;

      /**
       * @ngdoc method
       * @name Constructor # initializes Variables
       *
       * It initializes parameters of current object of TObject class.
       * It sets _name, _position, _orientation, _hpr, _modulUrl and _Controller of the current object.
       * It also declares and initializes heading, pitch and roll variables. 
       *
       */
      constructor() {
            this._name = "TestTObject";
            this._position = new Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100);
            var heading = 0;
            var pitch = 0;
            var roll = 0;
            this._hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
            this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
            this._modelUrl = "../Models/CesiumBalloon/CesiumBalloon.glb";
            this._CEntity = null;
            this._Controller = null;
            this.isPersistent=true;

            //defining parameters of the current object
            this._para = {
                  name: name,
                  position: this._position,
                  orientation: this._orientation,
                  model: {
                        uri: this._modelUrl,
                        minimumPixelSize: 128,
                        maximumScale: 20000
                  }
            }

            this.setId();
      }

      // this is temporary, Ideally we should use parameterized constructor
      setParameter (asdf) {

            if (asdf != null) {
                  this._name = asdf.TEntity._name;
                  this._position = asdf.TEntity._position;
                  this._hpr = asdf.TEntity._hpr;
                  this._modelUrl = asdf.TEntity._modelUrl;
                  this._id = asdf.TEntity._id;
                  this._orientation = asdf.TEntity._orientation;
                  this._Controller = asdf.TEntity._Controller;
                  this.isPersistent=false;
            }

            //defining parameters of the current object
            this._para = {
                  name: name,
                  position: this._position,
                  orientation: this._orientation,
                  model: {
                        uri: this._modelUrl,
                        minimumPixelSize: 128,
                        maximumScale: 20000
                  }
            }

            this.setId();
      }

      /**
       * @ngdoc method
       * @name setName # Sets Name
       *
       * @param {name} name of Entity 
       * sets the TObject name.
       *
       */
      setName(name:String) {
            this._name = name;
      }

      /**
      * @ngdoc method
      * @name setId # Sets id
      *
      * @param {id} id of Entity 
      * sets the TObject id.
      *
      */
      setId() {
            var xyhash = "";
            console.log(this._position);
            var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(this._position);
            var DLong = Math.round(Number((Cesium.Math.toDegrees(cartographicPosition.longitude) * 10)));
            var DLat = Math.round(Number((Cesium.Math.toDegrees(cartographicPosition.latitude) * 10)));
            console.log("longitude and latitude in degrees :", DLong + "," + DLat);
            xyhash = "" + DLat + "@" + DLong;
            console.log("xyhash of " + this._name + " is " + xyhash);
            this._id = xyhash;
      }


      /**
       * @ngdoc method
       * @name setCEntity # Sets CEntity
       *
       * @param {entity} entity of cesium 
       * sets the cesium Entity of TObject.
       * It is called by sim manager
       *
       */
      setCEntity(entity:TObjectInterface) {
            this._CEntity = entity;
      }


      /**
       * @ngdoc method
       * @name setController # Sets Controller
       *
       * @param {controller} controller of the AppEntity
       * Updates the Controller of the AppEntity
       *
       */
      setController(controller:Object) {
            this._Controller = controller;
      }


      /**
       * @ngdoc method
       * @name setModeUrl # sets Model's Url
       *
       * @param {url} url of model to be added
       * Updates the model's Url of TObject
       *
       */
      setModelUrl(url:String) {
            this._modelUrl = url;
            this._para.model.uri = url;
      }


       /**
       * @ngdoc method
       * @name setInitialPosition # sets Initial Position
       *
       * @param {position} position of entity
       * Sets the initial position and id of TObject
       *
       */
      setInitialPosition (position:Object) {
            this.setPosition(position);
            this.setId();
      }

      /**
       * @ngdoc method
       * @name setPosition # sets Position
       *
       * @param {position} position of entity
       * Updates the position and cesium's position of AppEntity
       *
       */
      setPosition(position:Object) {
            this._position = position;
            this._para.position = position;
            if (this._CEntity != null)
                  this._CEntity.position = this._position;
            // this._pos = this.setId();
            //setid
      }


      /**
       * @ngdoc method
       * @name setHPR # sets Heading Pitch Roll
       *
       * @param {hpr} hpr of entity
       * Updates the Heading Pitch Roll.
       *
       */
      setHPR(hpr:Object) {
            this._hpr = hpr;
      }


      /**
       * @ngdoc method
       * @name setOrientation # Sets Orientation
       *
       * @param {orientation} orientation of the entity
       * Updates the orientation and cesium Entity's orientation 
       *
       */
      setOrientation(orientation:Object) {
            this._orientation = orientation;
            this._para.orientation = orientation;
            if (this._CEntity != null)
                  this._CEntity.orientation = this._orientation;
      }


      /**
       * @ngdoc method
       * @name getPara # Returns Parameter
       * @return {parameter} parameter of AppEntity.
       *
       */
      getPara() {
            return this._para;
      }


      /**
       * @ngdoc method
       * @name tick # sets Position and Orientation
       *
       * @param {timeInfo} timeInfo time info of simulation
       * updates position and orientation of TObject if 
       * contoler is set
       */
      tick(timeInfo) {
            if (this._Controller == null)
                  return;

            // Updates the controller 
            this._Controller.tick(timeInfo);

            //sets position for every point 
            this.setPosition(this._Controller._position);
            //sets orientation for every point
            this.setOrientation(this._Controller._orientation);

      }


       /**
       * @ngdoc method
       * @name show# Displays entities
       *
       * It displays entities on the globe
       * by turning show attribute of CEntity to true.
       */
      show(){
            this._CEntity.show = true;
      }


       /**
       * @ngdoc method
       * @name hide# Removes entities
       *
       * It removes entities from the globe locally
       * by turning show attribute of CEntity to false.
       */
      hide(){
            this._CEntity.show = false;
      }

}

