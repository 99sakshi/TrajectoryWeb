"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForwardController {
    constructor() {
        this._positionLLA = new Cesium.Cartesian3(0, 0, 0);
        this._position = Cesium.Cartesian3.fromDegrees(this._positionLLA.x, this._positionLLA.y, this._positionLLA.z);
        this._hpr = new Cesium.HeadingPitchRoll(0, 0, 0);
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
        this._position = Cesium.Cartesian3.fromDegrees(this._positionLLA.longitude * Cesium.Math.DEGREES_PER_RADIAN + timeInfo.time / 1, this._positionLLA.latitude * Cesium.Math.DEGREES_PER_RADIAN, this._positionLLA.z);
        this._orientation = Cesium.Transforms.headingPitchRollQuaternion(this._position, this._hpr);
    }
}
exports.ForwardController = ForwardController;
//# sourceMappingURL=forwardController.js.map