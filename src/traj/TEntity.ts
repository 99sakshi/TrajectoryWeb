/**
 *
 * @ngdoc module
 * @name @NgModule
 *
 * @requires NgModule                
 * @requires BrowserModule             
 * @requires HttpModule, JsonpModule   
 * @requires LoadConfig              
 * @requires CesiumManager            
 * @requires StartService    
 *
 * @description
 *
 * This is the trajectory module. It includes all of our components for the trajectory feature.
 * It's providers are LoadConfig, CesiumManager, StartService
 **/

import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { HttpModule, JsonpModule }  from '@angular/http';

import { LoadConfig }               from './loadconfig.service';
import { CesiumManager }            from './cesiummanager';
import { ObjectManager }            from './objectmanager';
import { StartService }             from './start.service';

declare var Cesium: any;
@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [  ],
  bootstrap:    [  ],
  providers:    [ LoadConfig, StartService, ObjectManager, CesiumManager ]
})

export class TEntity {
       _id;
      _name;
      _position; 
      _orientation;
      _hash
      _hpr;
      _modelUrl;
      _para;
      _CEntity;  // Cesium Entity
      _Controller;
      Ename;

      /**
       * @ngdoc method
       * @name Constructor # initializes Variables
       *
       * It initializes parameters of current object of AppEntity class.
       * It sets _name, _position, _orientation, _hpr, _modulUrl and _Controller of the current object.
       * It also declares and initializes heading, pitch and roll variables. 
       *
       */

      constructor() {
        this._name = "TestTEntity";
        this._position = new Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100);
        var lposition = new Cesium.Cartesian3(this._position.x,this._position.y,this._position.z);
        var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(lposition);
        console.log(cartographicPosition);
        var DLong = ((cartographicPosition.longitude)*(180/(Math.PI)));
        var DLat = ((cartographicPosition.latitude)*(180/(Math.PI)));
        console.log("longitude and latitude in degrees :" ,DLong +","+DLat);
       // var x = -123.0744619;
        //var y = 44.0503706;
        //var z = 100;
         var _hash=""; 
          console.log(this._position);
          _hash=(DLong*1000)+(DLat*1000);
            console.log("HashCode for entiy  "+_hash);
            this._id=_hash;
            console.log("id for entity is :",this._id);
           
        var heading = 0;
        var pitch = 0;
        var roll = 0;
        this._hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
        this._modelUrl = "../Models/CesiumBalloon/CesiumBalloon.glb";
        this._CEntity = null;
        this._Controller = null;    
/*
        if (data != null ) {
            this._name = data.TEntity._name;
            this._position = data.TEntity._position;    
            this._hpr = data.TEntity._hpr;  
            this._modelUrl = data.TEntity._modelUrl;
            this._id = data.TEntity._id;
            this._orientation = data.TEntity._orientation;
            this._Controller = data.TEntity._Controller;
        }    

  */      //defining parameters of the current object
        this._para = {    
            name : name,
            position : this._position,
            orientation : this._orientation,
            model : {
                uri : this._modelUrl,
                minimumPixelSize : 128,
                maximumScale : 20000
            }
        }
      }
      


      /**
       * @ngdoc method
       * @name setName # Sets Name
       *
       * @param {name} name of Entity 
       * sets the TEntity name.
       *
       */
      setName (name) {
            this._name = name;
      }
       /**
       * @ngdoc method
       * @name setId # Sets id
       *
       * @param {id} id of Entity 
       * sets the TEntity id.
       *
       */
       setId () {
            //this._id =this.setHash();
            console.log(this._id);
      }
      

      /**
       * @ngdoc method
       * @name setCEntity # Sets Entity
       *
       * @param {entity} entity of cesium 
       * sets the cesium Entity of TEntity.
       * It's called by sim manager
       *
       */
      setCEntity(entity) {
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
      setController(controller) {
            this._Controller = controller;
      }


      /**
       * @ngdoc method
       * @name setModeUrl # sets Model's Url
       *
       * @param {url} url of model to be added
       * Updates the model's Url of TEntity
       *
       */
      setModelUrl(url) {
            this._modelUrl = url;
            this._para.model.uri = url;
      }


      /**
       * @ngdoc method
       * @name setPosition # sets Position
       *
       * @param {position} position of entity
       * Updates the position and cesium's position of AppEntity
       *
       */
      setPosition(position) {
            this._position = position;
            this._para.position = position;
            if(this._CEntity != null)
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
      setHPR(hpr) {
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
      setOrientation(orientation) {
            this._orientation = orientation;
            this._para.orientation = orientation;
            if(this._CEntity != null)
                  this._CEntity.orientation = this._orientation;
      }


      /**
       * @ngdoc method
       * @name getPara # Returns Parameter
       * @return {parameter} parameter of AppEntity.
       *
       */
      getPara(){
            return this._para;
      }


      /**
       * @ngdoc method
       * @name tick # sets Position and Orientation
       *
       * @param {timeInfo} timeInfo time info of simulation
       * updates position and orientation of TEntity if 
       * contoler is set
       */
      tick(timeInfo) {
            if(this._Controller == null) 
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
       * @name setHash # generates hashcode
       *
       * @param {entity} entity
       * Generates the hash code for entities
       *
       */

       setHash() {
            var _hash=""; 
            console.log(this._position);
           // console.log(this.DLong );
            console.log(this.cartographicPosition.longitude);
            //console.log(this._position.latitude);
            var lat=this._position.x;
            var long=this._position;
         //console.log("Code for "+ entity+" is- "+code);//Displays numeric value for entity
            _hash=(lat*1000)+(long*1000);
            console.log("HashCode for entiy "+entity+" in New York City is-  "+_hash);
             return _hash;
       }
      
      

      show(){
            this._CEntity.show = true;
      }

      hide(){
            this._CEntity.show = false;
      }

}
 
