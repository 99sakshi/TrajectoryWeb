declare var Cesium: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service';
/*var viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider : new Cesium.createOpenStreetMapImageryProvider({
          url : 'http://tile.stamen.com/watercolor/'
      }),
      baseLayerPicker : false
    });*/
 /**
 * @ngdoc method
 * @name CesiumManager # Injectable calls that manages all the operations of cesium
 */
@Injectable()
export class CesiumManager{ 
      
      private _cesiumViewer;
      private _config;

      private _mouseEndCallback;

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
          function toDegrees(radians) {
                    var pi = Math.PI;
                    return (radians * (180/pi));
                    }
          this._mouseEndCallback = function() {
                var extents = this._cesiumViewer.camera.computeViewRectangle()
                console.log(extents);
                console.log(  [toDegrees(extents)]);
                   
               
                // link: https://cesiumjs.org/Cesium/Build/Documentation/Camera.html,https://cesiumjs.org/Cesium/Build/Documentation/Cartesian3.html

                //TODO: iterate over rectangle and get the entities at each points after 0.1 degree change
           };
   
      
      

 /*  var dataSource = Cesium.GeoJsonDataSource.load('../data/mDataSource.json').then(function(data)  {

      viewer.dataSources.add(data);
      viewer.zoomTo(data);

      var entities = data.entities.values;
      var colorHash = {};

      for (var i = 0; i < entities.length; i++) {

      var entity = entities[i];
      var name = entity.name;
      var color = colorHash[name];

      if (!color) {
          color = Cesium.Color.fromRandom({
              alpha : 1.0
          });

          colorHash[name] = color;
      }

      entity.polygon.material = '../data/img/myMaterial.png';
      entity.polygon.extrudedHeight = 10;
  }

    var mEntity = viewer.dataSources.get(0).entities.getById("mId");
    mEntity.polygon.extrudedHeight = 0;
    mEntity.polygon.height = 10;
    mEntity.polygon.material = '../data/img/myMaterial.png';
  });*/
      }

      /**
       * @ngdoc method
       * @name init # creates cesium viewer
       * Also sets the imagary and terrain data 
       */
      private init () {

        // show India when app fires up
        var rectangle = Cesium.Rectangle.fromDegrees(68.0, 7.0, 89.0, 35.0);//west,south,east,north
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 1.0;
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

        var viewer =  new Cesium.Viewer('cesiumContainer');//Initialize the viewer widget with several custom options and mixins.
        viewer.bottomContainer.innerHTML = "";
        viewer.animation.container.innerHTML = "";
        viewer.timeline.container.innerHTML = "";

        if(this._config.UseLocalGeoserver)
        {
            var imageryLayers = viewer.imageryLayers;
            // to include in the WMS URL to obtain images
            var myLayer = new Cesium.WebMapServiceImageryProvider({
                url: this._config.Geoserver.Url,
                layers: this._config.Geoserver.Layers[0]//the index to retrieve
            });

            imageryLayers.removeAll();
            //the imagery provider to create a new layer 
            imageryLayers.addImageryProvider(myLayer);  
        } else {  

            //Use standard Cesium terrain
            var terrainProvider = new Cesium.CesiumTerrainProvider({
                url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles'
            });

            viewer.terrainProvider = terrainProvider;
        }

        if(this._config.ShowMoon)
        {
            var scene = viewer.scene;
            scene.moon = new Cesium.Moon();
        }

        viewer.camera.moveEnd.addEventListener( this._mouseEndCallback , this);
        this._cesiumViewer = viewer;
      }


      /**
       * @ngdoc method
       * @name addEntity#adds an entity
       *
       * @param {entityParameters} Parameters of the entity that needs to be added
       * 
       * @return {retEntity} retEntity cesium generated entity
       */
      addEntity(entityParameters) {
        var retEntity = this._cesiumViewer.entities.add( entityParameters );
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
