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

           this._mouseEndCallback = function() {
                var extents = this._cesiumViewer.camera.computeViewRectangle();
                console.log(extents);
                 var x1 = ((extents.west)*(180/(Math.PI)));//converting radians into degrees
                var y1 = ((extents.south)*(180/(Math.PI)));
                var x2 = ((extents.east)*(180/(Math.PI)));
                var y2 = ((extents.north)*(180/(Math.PI))); 
                console.log("Degrees :" ,x1,y1,x2,y2);

                //// compute level
                var camera = this._cesiumViewer.camera;
                var position = camera.position;
                console.log(position);
                var camPosition = new Cesium.Cartesian2(position.x,position.y)
                console.log(camPosition);
                var positionEarth = new Cesium.Cartesian3(0,0,0); 
                var distance = Cesium.Cartesian3.distance(position, positionEarth);
                var lposition = new Cesium.Cartesian3(position.x,position.y, position.z);
                var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(lposition);
                console.log(cartographicPosition);
                cartographicPosition.height=0;
                console.log(cartographicPosition.height);
                var DLong = ((cartographicPosition.longitude)*(180/(Math.PI)));
                var DLat = ((cartographicPosition.latitude)*(180/(Math.PI)));
                console.log("longitude and latitude in degrees :" ,DLong +","+DLat);
                var rposition = new Cesium.Cartographic(Cesium.Math.toRadians(DLong), Cesium.Math.toRadians(DLat));
                var cartesianPosition = Cesium.Ellipsoid.WGS84.cartographicToCartesian(rposition);
                console.log(cartesianPosition);

                 
                //// level logic
                var levelNumber = Math.round(Number(distance/1000000));
                // cap value between 0 - 10
                var level = 10 - Math.max(Math.min(levelNumber, 10),0);
                console.log("Level " + level);
                
/*
                 for(var i = x1; i <=x2; i++)
                {
                    for(var j = y1;j <= y2; j++)
                    {  
                       // console.log(i,j)  ;
                    }
                }
*/
           
         

                //TODO: iterate over rectangle and get the entities at each points after 0.1 degree change
           };
      }


      /**
       * @ngdoc method
       * @name init # creates cesium viewer
       * Also sets the imagary and terrain data 
       */
      private init () {

        // show India when app fires up
        var rectangle = Cesium.Rectangle.fromDegrees(68.0, 7.0, 89.0, 35.0);
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
