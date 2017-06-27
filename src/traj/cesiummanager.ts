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
                var extents = this._cesiumViewer.camera.computeViewRectangle()
                console.log(extents)
                console.log("extents.x");
                // link: https://cesiumjs.org/Cesium/Build/Documentation/Camera.html,https://cesiumjs.org/Cesium/Build/Documentation/Cartesian3.html

                //TODO: iterate over rectangle and get the entities at each points after 0.1 degree change
           };
       /*    function getExtentView() {
    var cl2 = new Cesium.Cartesian2(0, 0);
    var leftTop = viewer.scene.camera.pickEllipsoid(cl2, ellipsoid);

    cr2 = new Cesium.Cartesian2(viewer.scene.canvas.width, viewer.scene.canvas.height);
    var rightDown = viewer.scene.camera.pickEllipsoid(cr2, ellipsoid);

    if (leftTop != null && rightDown != null) {
        leftTop = ellipsoid.cartesianToCartographic(leftTop);
        rightDown = ellipsoid.cartesianToCartographic(rightDown);
        return new Cesium.Rectangle(leftTop.longitude, rightDown.latitude, rightDown.longitude, leftTop.latitude);
    } else {//The sky is visible in 3D
        console.log("Sky is visible");
        return null;
    }
}*/

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
