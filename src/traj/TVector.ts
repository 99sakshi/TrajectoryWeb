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


export class TVector{

private _cesiummanager:CesiumManager;


    constructor(private _position, private _direction){
        this.addVector(this._position,this._direction);
    }

    addVector(position,direction){
      //  var position=entity._position;
      //  var direction=entity._orientation;
        //this.vectorX(entity);
        this.vectorY(position,direction);
        //this.vectorZ(entity);
    }

//     vectorX(entity){
//        // this.Cesium=this._cesiummanager._cesiumViewer;
//       // var Cesium= this._cesiummanager.Cesium;
//     var greenCylinder =this._cesiummanager.addEntity({
//      name : 'Yellow cylinder with black outline',
//      position: {
//         x:entity._position.x,
//         y:entity._position.y,
//         z:entity._position.z
//                },
//      cylinder : {
//         length : 800000.0,
//         topRadius : 20000.0,
//         bottomRadius : 20000.0,
//         material : Cesium.Color.YELLOW
    
//     }
// });

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

    vectorY(position,direction){
       // this.Cesium=this._cesiummanager._cesiumViewer;
      // var Cesium= this._cesiummanager.Cesium;

            var heading = 0;
            var pitch = 0;
            var roll = 0;
            var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
            var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var yellowCylinder =this._cesiummanager.addEntity({
     name : 'Yellow cylinder with black outline',
     position: position,
     orientation:orientation,
     cylinder : {
        length : 400000.0,
        topRadius : 20000.0,
        bottomRadius : 20000.0,
        material : Cesium.Color.YELLOW
    
    }
});

var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
cartographicPosition.height += 200000;
var position = Cesium.Ellipsoid.WGS84.cartographicToCartesian(cartographicPosition);

var redCone = this._cesiummanager.addEntity({
    name : 'Red cone',
    position: {
        x:position.x,
        y:position.y,
        z:position.z
              },
    cylinder : {
        length : 200000.0,
        topRadius : 0.0,
        bottomRadius : 40000.0,
        material : Cesium.Color.RED
    }
});
    }

//     vectorZ(entity){
//        // this.Cesium=this._cesiummanager._cesiumViewer;
//       // var Cesium= this._cesiummanager.Cesium;
//     var greenCylinder =this._cesiummanager.addEntity({
//      name : 'Yellow cylinder with black outline',
//      position: {
//          x:entity._position.x,
//         y:entity._position.y,
//         z:entity._position.z
//                },
//      cylinder : {
//         length : 800000.0,
//         topRadius : 20000.0,
//         bottomRadius : 20000.0,
//         material : Cesium.Color.YELLOW
    
//     }
// });

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

}