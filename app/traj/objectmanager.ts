declare var Cesium: any;
import { Injectable }              from '@angular/core';
import { LoadConfig }              from './loadconfig.service';

@Injectable()
export class ObjectManager{ 
      
      _cesiumViewer;
      _config;

      constructor ( private loadConfig: LoadConfig) {
            this.loadConfig.getConfig().subscribe(    config => {
                                                            this._config = config; 
                                                            this.init(); 
                                                  } );   
      }

      ngOnInit() {

      }

      init () {
        var viewer =  new Cesium.Viewer('cesiumContainer');
        var imageryLayers = viewer.imageryLayers;

        var myLayer = new Cesium.WebMapServiceImageryProvider({
            url: this._config.Geoserver.Url,
            layers: this._config.Geoserver.Layers[0]
        });

        imageryLayers.removeAll();
        imageryLayers.addImageryProvider(myLayer);
      }

      addEntity() {

      }

      removeEntity() {

      }

}
