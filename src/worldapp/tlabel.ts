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

import { LoadConfig } from '../traj/loadconfig.service';
import { CesiumManager } from '../traj/cesiummanager';
import { ObjectManager } from '../traj/objectmanager';

declare var Cesium: any;
@NgModule({
    imports: [BrowserModule, HttpModule, JsonpModule],
    declarations: [],
    bootstrap: [],
    providers: [LoadConfig, ObjectManager, CesiumManager]
})

export class TLabel {


    _position2;
    _para;
    _CEntity;  // Cesium Entity
    label;
    desc;

    dragable: Boolean;

    /**
     * @ngdoc method
     * @name Constructor # initializes Variables
     *
     * It initializes parameters of current object of TObject class.
     * It sets _name, _position, _orientation, _hpr, _modulUrl and _Controller of the current object.
     * It also declares and initializes heading, pitch and roll variables. 
     *
     */
    constructor(private _cesiumManager: CesiumManager) {
        //   this._position = new Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100);
        // this.label = {
        //     position: this._position2,//displays the desciption of the location
        //     label: {
        //         text: this.desc
        //         //  show:true

        //     }
        // }

        //defining parameters of the current object
        this._para = {
            position: this._position2,
            label: {
                text: this.desc
            }

        }
         this._CEntity = null;


    }

    setText(desc) {
        this.desc = desc;
    }
    // this is temporary, Ideally we should use parameterized constructor
    //   setParameter(asdf) {

    //         if (asdf != null) {

    //               this._position = asdf.TEntity._position;
    //         }

    //         //defining parameters of the current object
    //         this._para = {
    //               name: name,
    //               position: this._position
    //         }
    //   }

    /**
     * @ngdoc method
     * @name setName # Sets Name
     *
     * @param {name} name of Entity 
     * sets the TObject name.
     *
     */


    /**
    * @ngdoc method
    * @name setId # Sets id
    *
    * @param {id} id of Entity 
    * sets the TObject id.
    *
    */
    setLabel() {
        this.label = {
            position: this._position2,//displays the desciption of the location
            label: {
                text: this.desc
                //  show:true

            }
        }
        this._cesiumManager.addEntity(this.label);
    }
    removeLabel(){
       return this._cesiumManager.removeLabel();
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
    setCEntity(label) {
        this._CEntity = label;
        this._CEntity.TLabel = this;
    }


    /**
     * @ngdoc method
     * @name setController # Sets Controller
     *
     * @param {controller} controller of the AppEntity
     * Updates the Controller of the AppEntity
     *
     */


    /**
     * @ngdoc method
     * @name setModeUrl # sets Model's Url
     *
     * @param {url} url of model to be added
     * Updates the model's Url of TObject
     *
     */


    /**
    * @ngdoc method
    * @name setInitialPosition # sets Initial Position
    *
    * @param {position} position of entity
    * Sets the initial position and id of TObject
    *
    // */
    // setInitialPosition(position: Object) {
    //     this.setPosition(position);

    // }

    /**
     * @ngdoc method
     * @name setPosition # sets Position
     *
     * @param {position} position of entity
     * Updates the position and cesium's position of AppEntity
     *
     */
    setPosition(lat,long) {
     this._position2=Cesium.Cartesian3.fromDegrees(lat,long);
        //  this._para.position = position;
        if (this._CEntity != null)
            this._CEntity.position = this._position2;
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



    /**
     * @ngdoc method
     * @name setOrientation # Sets Orientation
     *
     * @param {orientation} orientation of the entity
     * Updates the orientation and cesium Entity's orientation 
     *
     */



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
    /**
    * @ngdoc method
    * @name show# Displays entities
    *
    * It displays entities on the globe
    * by turning show attribute of CEntity to true.
    */
    show() {
        this._CEntity.show = true;
    }


    /**
    * @ngdoc method
    * @name hide# Removes entities
    *
    * It removes entities from the globe locally
    * by turning show attribute of CEntity to false.
    */
    hide() {
        this._CEntity.show = false;
    }

}

