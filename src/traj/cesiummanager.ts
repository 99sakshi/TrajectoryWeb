declare var Cesium: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service';

 /**
 * @ngdoc method
 * @name CesiumManager # Injectable calls that manages all the operations of cesium
 */
@Injectable()
export class CesiumManager{ 
      
      private _cesiumViewer;
      private _config;

      /**
       * @ngdoc method
       * @name Constructor# loads and set config file
       *
       * @param {loadConfig} event Private variable, receives injectable LoadConfig
       * 
       */
      constructor ( private loadConfig: LoadConfig) {

           this.loadConfig.getConfig().subscribe(    config => {
                                                            this._config = config; 
                                                            this.init(); 
                                                  } );  
      }


      /**
       * @ngdoc method
       * @name init # creates cesium viewer
       * Also sets the imagary and terrain data 
       */
      private init () {
          var viewer =  new Cesium.Viewer('cesiumContainer');//Initialize the viewer widget with several custom options and mixins.
          viewer.bottomContainer.innerHTML = "";
          viewer.animation.container.innerHTML = "";
          viewer.timeline.container.innerHTML = "";

          if(this._config.UseLocalGeoserver)
          {
            var imageryLayers = viewer.imageryLayers;
            
            var myLayer = new Cesium.WebMapServiceImageryProvider({// to include in the WMS URL to obtain images
                url: this._config.Geoserver.Url,
                layers: this._config.Geoserver.Layers[0]//the index to retrieve
            });
            
            imageryLayers.removeAll();
            imageryLayers.addImageryProvider(myLayer);  //the imagery provider to create a new layer 
          } else {  
            //Use standard Cesium terrain
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
       * @param {entity} entity to be added
       * Adds the new entity
       *
       * @return {retEntity} retEntity cesium generated entity
       */
      addEntity(entity) {
        var retEntity = this._cesiumViewer.entities.add( entity.getPara());
        return retEntity;
      }


      /**
       * @ngdoc method
       * @name removeEntity#removes an entity from the scene
       *
       * @param {entity} entity to be removed
       * Removes an entity
       */
      removeEntity(entity) {

      }

}
