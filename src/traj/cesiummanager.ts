declare var Cesium: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service';


@Injectable()
export class CesiumManager{ 
      
      private _cesiumViewer;
      private _config;

      constructor ( private loadConfig: LoadConfig) {

           this.loadConfig.getConfig().subscribe(    config => {
                                                            this._config = config; 
                                                            this.init(); 
                                                  } );  
      }

    
     private init () {
        var viewer =  new Cesium.Viewer('cesiumContainer');

        if(this._config.UseLocalGeoserver)
        {
          var imageryLayers = viewer.imageryLayers;
          
          var myLayer = new Cesium.WebMapServiceImageryProvider({
              url: this._config.Geoserver.Url,
              layers: this._config.Geoserver.Layers[0]
          });
          
          imageryLayers.removeAll();
          imageryLayers.addImageryProvider(myLayer);  
        }
        
        this._cesiumViewer = viewer;
      }

      addEntity(entity) {
        var retEntity = this._cesiumViewer.entities.add( entity.getPara());
        return retEntity;
      }

      removeEntity(entity) {

      }

}
