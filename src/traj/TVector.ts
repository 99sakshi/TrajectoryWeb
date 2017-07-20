import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

import { CesiumManager } from './cesiummanager';


declare var Cesium: any;
@NgModule({
    imports: [BrowserModule],
    declarations: [],
    bootstrap: [],
    providers: [CesiumManager]
})

export class TVector {

    private _yellowCylinder;
    private _redCone;
    _time;
    _deltaTime;


    constructor(private _position,
        private _direction,
        private _cesiummanager: CesiumManager) {
        this._time = 0; // in seconds
        this._deltaTime = 0.01;   // in seconds
        // setTimeout(() => {this.tickVector()}, 3000);
        this.addVector(this._position, this._direction);

    }

    addVector(position, direction) {
        this.vectorY(position, direction);

        //   this.vectorX(position, direction);
        //  this.vectorZ(position, direction);

    }



    vectorY(position, direction) {

        var rotmatrix = this.computeOrientation(position, direction);

        var orientation = Cesium.Quaternion.fromRotationMatrix(rotmatrix);

        this._yellowCylinder = {
            name: 'Yellow cylinder with black outline',
            position: position,
            orientation: orientation,
            cylinder: {
                length: 400000.0,
                topRadius: 20000.0,
                bottomRadius: 20000.0,
                alpha: 1.0,
                material: this.setColour('YELLOW')

            }
        };

        var dirmove = Cesium.Cartesian3.ZERO.clone(); 

        Cesium.Matrix3.getRow(rotmatrix, 0, dirmove);

        Cesium.Cartesian3.multiplyByScalar(dirmove,300000,dirmove);

        var newPosition = Cesium.Cartesian3.ZERO.clone();

        Cesium.Cartesian3.add(position, dirmove, newPosition);

        this._redCone = {
            name: 'Red cone',
            position: newPosition,
            orientation: orientation,
            cylinder: {
                length: 200000.0,
                topRadius: 0.0,
                bottomRadius: 40000.0,
                material: this.setColour('red')
            }

        };

        this.addToGlobe();
    }



    addToGlobe() {
        this._cesiummanager.addEntity(this._yellowCylinder);
        this._cesiummanager.addEntity(this._redCone);
        // var vectors = [this._yellowCylinder, this._redCone];
        // setInterval(function () {
        //   $scope.tickVector();
        // }, 3000)
        //   this.tickVector();

    }

    setColour(colorName) {
        return Cesium.Color[colorName.toUpperCase()];
    }

    setOrientation(direction) {
        var heading = direction.x;
        var pitch = direction.y;
        var roll = direction.z;
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

        return hpr;
    }

    tickVector() {

        var timeInfo = {
            time: parseFloat(this._time.toFixed(2)),
            deltaTime: parseFloat(this._deltaTime.toFixed(2))
        }

        // name.setOrientation(this._Controller._orientation);
        var direction = {
            x: -0.08636587213546239,
            y: -0.5736984357734006,
            z: -0.8054249527482052,
            w: -0.12125051097618404
        }
        this.setOrientation(direction);
        // Wait for a while
        setTimeout(() => { }, 3000);
    }

    computeOrientation(position, direction) {

        var up = Cesium.Cartesian3.UNIT_Y.clone();
        Cesium.Cartesian3.normalize(direction, direction);

        var right = Cesium.Cartesian3.ZERO.clone();
        Cesium.Cartesian3.cross(direction, up, right);

        var dirup = Cesium.Cartesian3.ZERO.clone();
        Cesium.Cartesian3.cross(right, direction, dirup);

        var rotmatrix = Cesium.Matrix3.ZERO.clone();
        Cesium.Matrix3.setRow(rotmatrix, 0, direction, rotmatrix);
        Cesium.Matrix3.setRow(rotmatrix, 1, right, rotmatrix);
        Cesium.Matrix3.setRow(rotmatrix, 2, dirup, rotmatrix);

        return rotmatrix;
   }



    // vectorX(position, direction) {
    //     // this.Cesium=this._cesiummanager._cesiumViewer;
    //     // var Cesium= this._cesiummanager.Cesium;

    //     var heading = Cesium.Math.toRadians(0.0);
    //     var pitch = Cesium.Math.toRadians(0.0);
    //     var roll = Cesium.Math.toRadians(180.0);
    //     // var heading= this.degreesToRadians((heading * -1));
    //     // var pitch = this.degreesToRadians(pitch);
    //     // var roll = this.degreesToRadians(roll + 180);
    //     var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    //     var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    //     var yellowCylinder = this._cesiummanager.addEntity({
    //         name: 'Yellow cylinder with black outline',
    //         position: position,
    //         orientation: orientation,
    //         cylinder: {
    //             length: 400000.0,
    //             topRadius: 20000.0,
    //             bottomRadius: 20000.0,
    //             material: Cesium.Color.BLUE

    //         }
    //     });
    // }

    // var redCone = this._cesiummanager.addEntity({
    //     name : 'Green cone',
    //     position: {
    //         x:entity._position.x,
    //         y:entity._position.y,
    //         z:entity._position.z
    //               },
    //     cylinder : {
    //         length : 200000.0,
    //         topRadius : 0.0,
    //         bottomRadius : 40000.0,
    //         material : Cesium.Color.GREEN
    //     }
    // });
    //     }

    // vectorY(position, direction) {
    //     // this.Cesium=this._cesiummanager._cesiumViewer;
    //     // var Cesium= this._cesiummanager.Cesium;

    //     var heading = direction.x;
    //     var pitch = direction.y;
    //     var roll = direction.z;
    //     // var heading= this.degreesToRadians((heading * -1));
    //     // var pitch = this.degreesToRadians(pitch);
    //     // var roll = this.degreesToRadians(roll + 180);
    //     var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    //     var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    //     var yellowCylinder = this._cesiummanager.addEntity({
    //         name: 'Yellow cylinder with black outline',
    //         position: position,
    //         orientation: orientation,
    //         cylinder: {
    //             length: 400000.0,
    //             topRadius: 20000.0,
    //             bottomRadius: 20000.0,
    //             material: Cesium.Color.YELLOW

    //         }
    //     });

    // var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
    // cartographicPosition.height += 200000;
    // var position = Cesium.Ellipsoid.WGS84.cartographicToCartesian(cartographicPosition);

    // var redCone = this._cesiummanager.addEntity({
    //     name: 'Red cone',
    //     position: {
    //         x: position.x,
    //         y: position.y,
    //         z: position.z
    //     },
    //     cylinder: {
    //         length: 200000.0,
    //         topRadius: 0.0,
    //         bottomRadius: 40000.0,
    //         material: Cesium.Color.RED
    //     }
    // });
    //   }
    // vectorZ(position, direction) {
    //     // this.Cesium=this._cesiummanager._cesiumViewer;
    //     // var Cesium= this._cesiummanager.Cesium;

    //     var heading = Cesium.Math.toRadians(0.0);
    //     var pitch = Cesium.Math.toRadians(0.0);
    //     var roll = Cesium.Math.toRadians(90.0);
    //     // var heading= this.degreesToRadians((heading * -1));
    //     // var pitch = this.degreesToRadians(pitch);
    //     // var roll = this.degreesToRadians(roll + 180);
    //     var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    //     var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    //     var yellowCylinder = this._cesiummanager.addEntity({
    //         name: 'Yellow cylinder with black outline',
    //         position: position,
    //         orientation: orientation,
    //         cylinder: {
    //             length: 400000.0,
    //             topRadius: 20000.0,
    //             bottomRadius: 20000.0,
    //             material: Cesium.Color.RED

    //         }
    //     });
    // }
    // var redCone = this._cesiummanager.addEntity({
    //     name : 'Blue cone',
    //     position: {
    //         x:entity._position.x,
    //         y:entity._position.y,
    //         z:10*entity._position.z
    //               },
    //     cylinder : {
    //         length : 200000.0,
    //         t opRadius : 0.0,
    //         bottomRadius : 40000.0,
    //         material : Cesium.Color.BLUE
    //     }
    // });
    //     }
    // degreesToRadi ans(degrees){
    //     return (degrees*Math.PI/180);
    // }




}