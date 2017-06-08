declare var Cesium: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service';
 /**
 * @ngdoc method
 * @name @Injectable#decorator
 */

@Injectable()
export class CesiumManager{ 
      
      private _cesiumViewer;
      private _config;
      /**
 * @ngdoc method
 * @name Constructor#initializing the current object to required configurations
 *
 * @param {loadConfig} event Private variable,receives LoadConfig
 * Initializing the current object to required configurations
 */

      constructor ( private loadConfig: LoadConfig) {

           this.loadConfig.getConfig().subscribe(    config => {
                                                            this._config = config; 
                                                            this.init(); 
                                                  } );  
      }
/**
 * @ngdoc method
 * @name init#access DEM data from geoserver
 *
 */
    
     private init () {
        var viewer =  new Cesium.Viewer('cesiumContainer');
        viewer.bottomContainer.innerHTML = "";
        viewer.animation.container.innerHTML = "";
        viewer.timeline.container.innerHTML = "";

        if(this._config.UseLocalGeoserver)
        {
          var imageryLayers = viewer.imageryLayers;
          
          var myLayer = new Cesium.WebMapServiceImageryProvider({
              url: this._config.Geoserver.Url,
              layers: this._config.Geoserver.Layers[0]
          });
          
          imageryLayers.removeAll();
          imageryLayers.addImageryProvider(myLayer);  
        } else {  

          var terrainProvider = new Cesium.CesiumTerrainProvider({
              url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles'
          });

          viewer.terrainProvider = terrainProvider;
      }

        this._cesiumViewer = viewer;
      }
/**
 * @ngdoc method
 * @name addEntity#adds an entity
 *
 * @param {entity} event Receive the emitted entity
 * Adds the new entity
 *
 * @return {retEntity} retEntity returns the retEntity variable and a promise
 */
      addEntity(entity) {
        var retEntity = this._cesiumViewer.entities.add( entity.getPara());
        return retEntity;
      }
/**
 * @ngdoc method
 * @name removeEntity#removes an entity
 *
 * @param {entity} event Receive the emitted entity
 * Removes an entity
 */
      removeEntity(entity) {

      }

}
