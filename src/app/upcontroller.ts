declare var Cesium: any;
export class UpController {
    _position;
    _orientation;
    _hpr;
    _positionLLA;

    constructor() {
        this._positionLLA = new Cesium.Cartesian3(0, 0, 0); //position in terms of Latitude, Longitude and Altitude
        this._position = Cesium.Cartesian3.fromDegrees(this._positionLLA.x, this._positionLLA.y, this._positionLLA.z); //position in terms of x, y and z cartesian planes
        this._hpr = new Cesium.HeadingPitchRoll(0, 0, 0); //sets rotational attributes

        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
    }

    setPosition(position) {
        this._position = position;
        this._positionLLA = new Cesium.Cartographic.fromCartesian(this._position);
    }

    setOrientation(orientation) {
        this._orientation = orientation;
    }


    tick(timeInfo) {
        //sets position of each point 
        this._position = Cesium.Cartesian3.fromDegrees(this._positionLLA.longitude * Cesium.Math.DEGREES_PER_RADIAN,
            this._positionLLA.latitude * Cesium.Math.DEGREES_PER_RADIAN,
            this._positionLLA.height + timeInfo.time / 0.001);


        //sets orientation of each point                                                 
        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
    }

}
