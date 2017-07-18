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
        // var heading = direction.x;
        // var pitch = direction.y;
        // var roll = direction.z;
        // var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        //  var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        //  var hpr = this.setOrientation(direction);
        var orientation = this.computeHpr(position, direction);
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

        // var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
        //cartographicPosition.latitude -=200000;
        //cartographicPosition.height += 200000;
        //orientation.y += 200000;
        //var position = Cesium.Ellipsoid.WGS84.fromDegrees(cartographicPosition);

        // var heading = 0;
        // var pitch = 0;
        // var roll = 0;
        // var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        // var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

        // position.z += 210000;
        //  position.z *=3 ;
        // position.x /= 1.009;
        //  position.y /=1.002;
        //position.x -=70000;
        //  position.y -=12000;
        //var position=(Math.sqrt(direction.x*direction.x)+(direction.y*direction.y)+(direction.z*direction.z))+200000+(Math.sqrt((position.x*position.x)+(position.y*position.y)+(position.z*position.z)));
        // var position2={
        //     x:direction.x+200000+position.x,
        //     y:direction.y+200000+position.y,
        //     z:direction.z+200000+position.z
        // }
        this._redCone = {
            name: 'Red cone',
            position: position,
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

    computeHpr(position, direction) {
        var h = 0 - position.x;
        var p = (Math.atan2(direction.z, direction.x)) - position.y;
        var r = (Math.atan2(direction.y, Math.sqrt((direction.x * direction.x) + (direction.z * direction.z)))) - position.z;
        var phi = (position.x * Math.PI / 180);
        var lambda = (position.y * Math.PI / 180);
        var R00 = -(Math.sin(phi) * Math.cos(lambda)),
            R01 = -(Math.sin(lambda)),
            R02 = -(Math.cos(phi) * Math.cos(lambda)),
            R10 = -(Math.sin(phi) * Math.sin(lambda)),
            R11 = Math.cos(lambda),
            R12 = -(Math.cos(phi) * Math.sin(lambda)),
            R20 = Math.cos(phi),
            R21 = 0,
            R22 = -(Math.sin(phi));
        var x = (R00 * h) + (R01 * p) + (R02 * r),
            y = (R10 * h) + (R11 * p) + (R12 * r),
            z = (R20 * h) + (R21 * p) + (R22 * r);
        // var orientation = {
        //     x: x,
        //     y: y,
        //     z: z
        // };
	var q;
 var t0 = Math.cos(x * 0.5);
var t1 = Math.sin(x* 0.5);
var t2 = Math.cos(y * 0.5);
	var t3 = Math.sin(y * 0.5);
	var t4 = Math.cos(z * 0.5);
	var t5 = Math.sin(z * 0.5);

	var wq = t0 * t2 * t4 + t1 * t3 * t5;
	var xq = t0 * t3 * t4 - t1 * t2 * t5;
	var yq = t0 * t2 * t5 + t1 * t3 * t4;
	var zq = t1 * t2 * t4 - t0 * t3 * t5;
    q={
        x:xq,
        y:yq,
        z:zq,
        w:wq
    }
	return q
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