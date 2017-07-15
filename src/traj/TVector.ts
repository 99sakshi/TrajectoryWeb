import { CesiumManager } from './cesiummanager';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { LoadConfig } from './loadconfig.service';
import { ObjectManager } from './objectmanager';
import { StartService } from './start.service';
import { TObjectInterface } from './tobjectInterface';

declare var Cesium: any;

@NgModule({
      imports: [BrowserModule, HttpModule, JsonpModule],
      declarations: [],
      bootstrap: [],
      providers: [LoadConfig, StartService, ObjectManager, CesiumManager]
})
export class TVector{

//Cesium;
//_cesiummanager;


    constructor(private _cesiummanager:CesiumManager){
       // this.Cesium=this._cesiummanager._cesiumViewer;
    }

    addVector(entity){
        var position=entity._position;
        var direction=entity._orientation;
        //this.vectorX(entity);
        this.vectorY(entity);
        //this.vectorZ(entity);
    }

    vectorX(entity){
       // this.Cesium=this._cesiummanager._cesiumViewer;
      // var Cesium= this._cesiummanager.Cesium;
    var greenCylinder =this._cesiummanager.addEntity({
     name : 'Yellow cylinder with black outline',
     position: {
         x:entity._position.x,
        y:entity._position.y,
        z:entity._position.z
               },
     cylinder : {
        length : 800000.0,
        topRadius : 20000.0,
        bottomRadius : 20000.0,
        material : Cesium.Color.YELLOW
    
    }
});

var redCone = this._cesiummanager.addEntity({
    name : 'Green cone',
    position: {
        x:entity._position.x,
        y:entity._position.y,
        z:entity._position.z
              },
    cylinder : {
        length : 200000.0,
        topRadius : 0.0,
        bottomRadius : 40000.0,
        material : Cesium.Color.GREEN
    }
});
    }

    vectorY(entity){
       // this.Cesium=this._cesiummanager._cesiumViewer;
      // var Cesium= this._cesiummanager.Cesium;
    var greenCylinder =this._cesiummanager.addEntity({
     name : 'Yellow cylinder with black outline',
     position: {
        x:entity._position.x,
        y:entity._position.y,
        z:entity._position.z
               },
     cylinder : {
        length : 400000.0,
        topRadius : 20000.0,
        bottomRadius : 20000.0,
        material : Cesium.Color.YELLOW
    
    }
});

var redCone = this._cesiummanager.addEntity({
    name : 'Red cone',
    position: {
        x:entity._position.x+105000,
        y:entity._position.y+300000,
        z:entity._position.z+130000
              },
    cylinder : {
        length : 200000.0,
        topRadius : 0.0,
        bottomRadius : 40000.0,
        material : Cesium.Color.RED
    }
});
    }

    vectorZ(entity){
       // this.Cesium=this._cesiummanager._cesiumViewer;
      // var Cesium= this._cesiummanager.Cesium;
    var greenCylinder =this._cesiummanager.addEntity({
     name : 'Yellow cylinder with black outline',
     position: {
         x:entity._position.x,
        y:entity._position.y,
        z:entity._position.z
               },
     cylinder : {
        length : 800000.0,
        topRadius : 20000.0,
        bottomRadius : 20000.0,
        material : Cesium.Color.YELLOW
    
    }
});

var redCone = this._cesiummanager.addEntity({
    name : 'Blue cone',
    position: {
        x:entity._position.x,
        y:entity._position.y,
        z:10*entity._position.z
              },
    cylinder : {
        length : 200000.0,
        topRadius : 0.0,
        bottomRadius : 40000.0,
        material : Cesium.Color.BLUE
    }
});
    }

}