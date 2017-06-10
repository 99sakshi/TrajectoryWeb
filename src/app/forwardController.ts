declare var Cesium: any;
export class ForwardController{ 
      _position; 
      _orientation;
      _hpr;
      _positionLLA; 
/**
 * @ngdoc method
 * @name Constructorr#InitializeVariables
 *
 * Initializes parameters of current object of ForwardController class.
 * It sets _positionLLA, _position, _hpr and _orientation for current object.
 * 
 */
      constructor() {
        this._positionLLA = new Cesium.Cartesian3(0, 0, 0); //position in terms of Latitude, Longitude and Altitude
        this._position = Cesium.Cartesian3.fromDegrees(this._positionLLA.x, this._positionLLA.y, this._positionLLA.z); //position in terms of x, y and z cartesian planes
        this._hpr = new Cesium.HeadingPitchRoll(0, 0, 0); //sets rotational attributes

        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
      }
/**
 * @ngdoc method
 * @name setPosition#SetsPosition
 *
 * @param {position} event Receives the position
 * Updates the position of the current object.
 * It sets _position and _positionLLA for the current object.
 * 
 */
      setPosition(position){
          this._position = position;
          this._positionLLA = new Cesium.Cartographic.fromCartesian(this._position);
      }
/**
 * @ngdoc method
 * @name setOrientation#SetsOrientation
 *
 * @param {orientation} event Receive the orientation
 * Updates the orientation of current object.
 *
 */
      setOrientation(orientation){
          this._orientation = orientation;
      }
/**
 * @ngdoc method
 * @name tick#updatesTimeInfo
 *
 * @param {timeInfo} event Receive the Time Information
 * Updates the _position and _orientation of the current object.
 *
 */
      tick(timeInfo) {
            this._position = Cesium.Cartesian3.fromDegrees( this._positionLLA.longitude * Cesium.Math.DEGREES_PER_RADIAN + timeInfo.time / 1, 
                                                            this._positionLLA.latitude * Cesium.Math.DEGREES_PER_RADIAN, 
                                                            this._positionLLA.z); //sets position of each point 

            this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr); //sets orientation of each point
      }

}
