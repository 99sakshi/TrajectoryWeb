declare var Cesium: any;
export class UpController{ 
      _position; 
      _orientation;
      _hpr;
      _positionLLA; 


       /**
       * @ngdoc method
       * @name Constructor # Initialize Variables
       *
       * Initializes parameters of current object of ForwardController class.
       * It sets default position and Orientation of the controller.
       * 
       */
      constructor() {
        //position in terms of Latitude, Longitude and Altitude  
        this._positionLLA = new Cesium.Cartesian3(0, 0, 0); 
        //position in terms of x, y and z cartesian planes
        this._position = Cesium.Cartesian3.fromDegrees(this._positionLLA.x, this._positionLLA.y, this._positionLLA.z);
        //sets rotational attributes
        this._hpr = new Cesium.HeadingPitchRoll(0, 0, 0);

        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
      }


       /**
       * @ngdoc method
       * @name setPosition # Sets Position
       *
       * @param {position} position to set
       * It sets position and position in LLA of the controller
       */
      setPosition(position){
          this._position = position;
          this._positionLLA = new Cesium.Cartographic.fromCartesian(this._position);
      }



       /**
       * @ngdoc method
       * @name setOrientation # Sets Orientation
       *
       * @param {orientation} orientation set the orientation
       * Updates the orientation
       */
      setOrientation(orientation){
          this._orientation = orientation;
      }



       /**
       * @ngdoc method
       * @name tick # updates controller
       *
       * @param {timeInfo} timeInfo time information having time elapsed
       * Updates the position and orientation of the controller
       *
       */
      tick(timeInfo) {
            //sets position of each point 
            this._position = Cesium.Cartesian3.fromDegrees( this._positionLLA.longitude * Cesium.Math.DEGREES_PER_RADIAN , 
                                                            this._positionLLA.latitude * Cesium.Math.DEGREES_PER_RADIAN, 
                                                            this._positionLLA.height + timeInfo.time / 0.001); 


            //sets orientation of each point                                                 
            this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr); 
      }

}
