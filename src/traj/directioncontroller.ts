declare var Cesium: any;
export class DirectionController {
    _position;
    _orientation;
    _hpr;
    _positionLLA;
    _direction;


    /**
     * @ngdoc method
     * @name Constructor # Initialize Variables
     *
     * Initializes parameters of current object of DirectionController class.
     * It sets default position and Orientation of the controller.
     * 
     */
    constructor() {
        //position in terms of Latitude, Longitude and Altitude    
        this._positionLLA = new Cesium.Cartesian3(0, 0, 0);
        //position in terms of x, y and z cartesian planes
        this._position = Cesium.Cartesian3.fromDegrees(this._positionLLA.x, this._positionLLA.y, this._positionLLA.z);
        //sets rotational attributes - heading Pitch and Roll
        this._hpr = new Cesium.HeadingPitchRoll(0, 0, 0);

        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);

        this._direction = Cesium.Cartesian3.fromElements(0,0,0);
    }


    /**
     * @ngdoc method
     * @name setPosition # Sets Position
     *
     * @param {position} position to set
     * It sets position and position in LLA of the controller
     */
    setPosition(position: Object) {
        this._position = position;
        this._positionLLA = new Cesium.Cartographic.fromCartesian(this._position);
    }

    /**
     * @ngdoc method
     * @name setDirection # Sets Direction
     *
     * @param {direction} direction to set
     * It sets direction to move of the controller
     */
    setDirection(direction: Object) {
        this._direction = direction;
    }


    /**
     * @ngdoc method
     * @name setOrientation # Sets Orientation
     *
     * @param {orientation} orientation set the orientation
     * Updates the orientation
     */
    setOrientation(orientation:Object) {
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
        //sets position at each simuatlion step
        this._position = Cesium.Cartesian3.fromDegrees(
            this._positionLLA.longitude * Cesium.Math.DEGREES_PER_RADIAN + (timeInfo.time / 10 * this._direction.x),
            this._positionLLA.latitude * Cesium.Math.DEGREES_PER_RADIAN + (timeInfo.time / 10 * this._direction.y),
            this._positionLLA.height + (timeInfo.time/0.01 * this._direction.z) );

        //sets orientation at each simulation step
        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
    }

}
