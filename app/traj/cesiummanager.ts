declare var Cesium: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service';


@Injectable()
export class CesiumManager{ 
      
      _cesiumViewer;
      _config;

      constructor ( private loadConfig: LoadConfig) {
           this.loadConfig.getConfig().subscribe(    config => {
                                                            this._config = config; 
                                                            this.init(); 
                                                  } );  
         
  
      }

    
     private init () {
        var viewer =  new Cesium.Viewer('cesiumContainer');
        var imageryLayers = viewer.imageryLayers;
         

        var myLayer = new Cesium.WebMapServiceImageryProvider({
            url: this._config.Geoserver.Url,
            layers: this._config.Geoserver.Layers[0]
        });
 
        
         this._cesiumViewer=viewer;
          imageryLayers.removeAll();
        imageryLayers.addImageryProvider(myLayer);
       
 
      }

      addEntity() {

      }

      removeEntity() {

      }

}
