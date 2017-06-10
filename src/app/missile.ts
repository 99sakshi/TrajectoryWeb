declare var Cesium: any;
export class Missile{ 
      _name;
      _position; 
      _orientation;
      _hpr;
      _modelUrl;
      _para;
      _CEntity;  // Cesium Entity
      _Controller;
/**
 * @ngdoc method
 * @name Constructor#initializeVariables
 *
 * It initializes parameters of current object of Missile class.
 * It sets _name, _position, _orientation, _hpr, _modulUrl and _Controller of the current object.
 * It also declares and initializes heading, pitch and roll variables. 
 *
 * @return {method} ContactService returns the updateContact method and a promise
 */
      constructor() {

        this._name = "TestMissile";
        this._position = new Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100);
        var heading = 0;
        var pitch = 0;
        var roll = 0;
        this._hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
        this._modelUrl = "../Models/CesiumBalloon/CesiumBalloon.glb";

        this._para = {    //defining parameters of the current object
            name : name,
            position : this._position,
            orientation : this._orientation,
            model : {
                uri : this._modelUrl,
                minimumPixelSize : 128,
                maximumScale : 20000
            }
        }

        this._Controller = null;
      }
/**
 * @ngdoc method
 * @name setCEntity#setsEntity
 *
 * @param {entity} event Receive the entity
 * Updates the _CEntity field of current object.
 *
 */
      // This is called by sim manager
      setCEntity(entity) {
            this._CEntity = entity;
      }
/**
 * @ngdoc method
 * @name setController#setsController
 *
 * @param {controller} event Receive the controller
 * Updates the _Controller field of current object.
 *
 */
     
      setController(controller) {
            this._Controller = controller;
      }
/**
 * @ngdoc method
 * @name setModeUrl#setsModelUrl
 *
 * @param {url} event Receive the url
 * Updates the _modelUrl field of current object.
 *
 */
     
      setModelUrl(url) {
            this._modelUrl = url;
      }
/**
 * @ngdoc method
 * @name setPosition#setsPosition
 *
 * @param {position} event Receive the position
 * Updates the _position and _CEntity.position fields of current object.
 *
 */
     
      setPosition(position) {
            this._position = position;
            this._CEntity.position = this._position;
      }
/**
 * @ngdoc method
 * @name setHPR#setsHpr
 *
 * @param {hpr} event Receive the hpr
 * Updates the _hpr field of current object.
 *
 */
     
      setHPR(hpr) {
            this._hpr = hpr;
      }
/**
 * @ngdoc method
 * @name setOrientation#setsOrientation
 *
 * @param {orientation} event Receive the orientation
 * Updates the _orientation and _CEntity.orientation fields of current object.
 *
 */
     
      setOrientation(orientation) {
            this._orientation = orientation;
            this._CEntity.orientation = this._orientation;
      }
/**
 * @ngdoc method
 * @name getPara#returnParameter
 *
 * 
 * Returns the _para field of current object.
 *
 */
     
      getPara(){
            return this._para;
      }
/**
 * @ngdoc method
 * @name tick#setsPositionAndOrientation
 *
 * @param {timeInfo} event Receive the timeInfo
 * If _Controller field of current object is null, it Returns.
 * Updates the _Controller field of current object.
 * Invokes setPosition and setOrientation methods for current object.
 *
 */
     
      tick(timeInfo) {
            if(this._Controller == null) 
                  return;

            this._Controller.tick(timeInfo);

            this.setPosition(this._Controller._position); //sets position for every point 
            this.setOrientation(this._Controller._orientation); //sets orientation for every point
          
      }

}
