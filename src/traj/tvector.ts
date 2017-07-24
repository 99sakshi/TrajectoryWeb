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

    private _arrow;

    constructor(private _position,
        private _direction,
        private _cesiummanager: CesiumManager) {
        this.addVector(this._position, this._direction);
    }


    addVector(position, direction) {

        Cesium.Cartesian3.normalize(direction,direction);

        var movedPosition = position.clone();
        Cesium.Cartesian3.multiplyByScalar(direction, -600000, direction);
        Cesium.Cartesian3.add(movedPosition,direction,movedPosition);
        var positionArray = [position, movedPosition];

        this._arrow = {
            name : 'RED Vector line',
            polyline : {
                positions : positionArray,
                width : 10,
                followSurface : false,
                material : new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED)
            }
        };

        var array = this._cesiummanager.addEntity(this._arrow);
    }

}
