declare var Cesium: any;
export class ToonMan{ 
      _name;
      _position; 
      _orientation;
      _hpr;
      _modelUrl;
      _para;
      _CEntity;  // Cesium Entity
      _Controller;

      constructor() {

        this._name = "ToonMan";
        this._position = new Cesium.Cartesian3.fromDegrees(72.8777, 19.0760, 100);
        var heading = 0;
        var pitch = 0;
        var roll = 0;
        this._hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
        this._modelUrl = "../Models/CesiumMan/Cesium_Man.glb";
        
        
        this._para = {
            name : name,
            position : this._position,
            orientation : this._orientation,
            model : {
                uri : this._modelUrl,
                minimumPixelSize : 128,
                maximumScale : 200000
            }
        }

        this._Controller = null;
      }

      setName (name) {
            this._name = name;
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