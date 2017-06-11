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
       * @name Constructor # initializes Variables
       *
       * It initializes parameters of current object of Missile class.
       * It sets _name, _position, _orientation, _hpr, _modulUrl and _Controller of the current object.
       * It also declares and initializes heading, pitch and roll variables. 
       *
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
       * @name setCEntity # Sets Entity
       *
       * @param {entity} entity of cesium 
       * sets the cesium Entity of missile.
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
       * @param {controller} controller of the missile
       * Updates the Controller of the missile
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
       * Updates the model's Url of missile
       *
       */
      setModelUrl(url) {
            this._modelUrl = url;
      }


      /**
       * @ngdoc method
       * @name setPosition # sets Position
       *
       * @param {position} position of entity
       * Updates the position and cesium's position of missile
       *
       */
      setPosition(position) {
            this._position = position;
            this._CEntity.position = this._position;
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
            this._CEntity.orientation = this._orientation;
      }


      /**
       * @ngdoc method
       * @name getPara # Returns Parameter
       * @return {parameter} parameter of missile.
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
       * updates position and orientation of missile if 
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

}
