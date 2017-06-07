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

      constructor() {

        this._name = "TestMissile";
        this._position = new Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 100);
        var heading = 0;
        var pitch = 0;
        var roll = 0;
        this._hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
        this._modelUrl = "../Models/CesiumBalloon/CesiumBalloon.glb";

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

        this._Controller = null;
      }

      // This is called by sim manager
      setCEntity(entity) {
            this._CEntity = entity;
      }

      setController(controller) {
            this._Controller = controller;
      }

      setModelUrl(url) {
            this._modelUrl = url;
      }

      setPosition(position) {
            this._position = position;
            this._CEntity.position = this._position;
      }

      setHPR(hpr) {
            this._hpr = hpr;
      }

      setOrientation(orientation) {
            this._orientation = orientation;
            this._CEntity.orientation = this._orientation;
      }

      getPara(){
            return this._para;
      }

      tick(timeInfo) {
            if(this._Controller == null) 
                  return;

            this._Controller.tick(timeInfo);

            this.setPosition(this._Controller._position);
            this.setOrientation(this._Controller._orientation);
          //  console.log(time);
      }

}
