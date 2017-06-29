declare var Cesium: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service';
 /**
     * Math functions.
     *
     * @exports CesiumMath
     */
 //var CesiumMath={};   
    
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
                                                            this.init();  } );  
     
        /* Cesium.CesiumMath.toDegrees = function(radians) {
          var pi = Math.PI;
          return (radians * (180/pi));
    };*/
         
          this._mouseEndCallback = function() {
                var extents = this._cesiumViewer.camera.computeViewRectangle()
                console.log(extents);
                var x1 = ((extents.west)*(180/(Math.PI)));//converting radians into degrees
                var y1 = ((extents.south)*(180/(Math.PI)));
                var x2 = ((extents.east)*(180/(Math.PI)));
                var y2 = ((extents.north)*(180/(Math.PI))); 
                        // var x1 = Cesium.CesiumMath.toDegrees(extents.west);
                        // var y1 = Cesium.CesiumMath.toDegrees(extents.south);
                        //  var x2 = Cesium.CesiumMath.toDegrees(extents.east);
                        //var y2 = Cesium.CesiumMath.toDegrees(extents.north); 
                console.log(x1,y1,x2,y2);
                 for(var i = x1; i <=x2; i++)
                {
                    for(var j = y1;j <= y2; j++)
                    {  
                       // console.log(i,j)  ;
                    }
                }

               
               
                //TODO: iterate over rectangle and get the entities at each points after 0.1 degree change
           };


   /*  canvas : {
            get : function() {
                return this._canvas;
            }
        }
           // Create scene without anisotropic texture filtering
var scene = new Cesium.Scene({
  canvas : canvas,
  contextOptions : {
    allowTextureFilterAnisotropic : false
  }
});

           var camera = new Cesium.Camera(scene);
camera.position = new Cesium.Cartesian3();
camera.direction = Cesium.Cartesian3.negate(Cesium.Cartesian3.UNIT_Z, new Cesium.Cartesian3());
camera.up = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_Y);
camera.frustum.fov = Cesium.Math.PI_OVER_THREE;
camera.frustum.near = 1.0;
camera.frustum.far = 2.0;*/
   /* var positions = Cesium.Cartesian3.fromDegreesArray([
    -104.606667,50.454722,
    15.71666666, 69.1 ]);      
    var surfacePositions = Cesium.PolylinePipeline.generateArc({
    positions: positions
});       
    var scratchCartesian3 = new Cesium.Cartesian3();
    var surfacePositionsLength = surfacePositions.length;
    var totalDistanceInMeters = 0;
    for (var i = 3; i < surfacePositionsLength; i += 3) {
    scratchCartesian3.x = surfacePositions[i] - surfacePositions[i - 3];
    scratchCartesian3.y = surfacePositions[i + 1] - surfacePositions[i - 2];
    scratchCartesian3.z = surfacePositions[i + 2] - surfacePositions[i - 1];
    totalDistanceInMeters += Cesium.Cartesian3.magnitude(scratchCartesian3);
    var totalDistanceInKm = totalDistanceInMeters * 0.001;
    console.log('Distance: ' + totalDistanceInKm + ' km');
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
