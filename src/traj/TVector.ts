import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { HttpModule, JsonpModule } from '@angular/http';

//import { LoadConfig } from './loadconfig.service';
import { CesiumManager } from './cesiummanager';
//import { ObjectManager } from './objectmanager';
//import { StartService } from './start.service';
//import { TObjectInterface } from './tobjectInterface';

declare var Cesium: any;
@NgModule({
    imports: [BrowserModule],
    declarations: [],
    bootstrap: [],
    providers: [CesiumManager]
})


export class TVector {

    // _cesiummanager:CesiumManager;


    constructor(private _position, private _direction, private _cesiummanager: CesiumManager) {
        // this._cesiummanager=CesiumManager;
        this.addVector(this._position, this._direction);
    }

    addVector(position, direction) {
        this.vectorY(position, direction);

        //   this.vectorX(position, direction);
        //  this.vectorZ(position, direction);

    }



    vectorY(position, direction) {
        var heading = direction.x;
        var pitch = direction.y;
        var roll = direction.z;
        // var heading= this.degreesToRadians((heading * -1));
        // var pitch = this.degreesToRadians(pitch);
        // var roll = this.degreesToRadians(roll + 180);
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

        var yellowCylinder = this._cesiummanager.addEntity({
            name: 'Yellow cylinder with black outline',
            position: position,
            orientation: orientation,
            cylinder: {
                length: 400000.0,
                topRadius: 20000.0,
                bottomRadius: 20000.0,
                material: Cesium.Color.YELLOW

            }
        });
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
    //         topRadius : 0.0,
    //         bottomRadius : 40000.0,
    //         material : Cesium.Color.BLUE
    //     }
    // });
    //     }
    // degreesToRadians(degrees){
    //     return (degrees*Math.PI/180);
    // }

}