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
      private extents;
      north;
      east;
      west;
      south;
      x1;
      y1;
      x2;
      y2;

     

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
                //// get extents
              this.extents = this._cesiumViewer.camera.computeViewRectangle()
                console.log(this.extents);
                this.x1 = ((this.extents.west)*(180/(Math.PI)));//converting radians into degrees
                this.y1 = ((this.extents.south)*(180/(Math.PI)));
                this.x2 = ((this.extents.east)*(180/(Math.PI)));
                this.y2 = ((this.extents.north)*(180/(Math.PI))); 
                //console.log("Degrees :" ,x1,y1,x2,y2);
            
                //// compute level
                var camera = this._cesiumViewer.camera;
                var position = camera.position;
                console.log(position);
    
                var positionEarth = new Cesium.Cartesian3(303157.7006790363,5635474.981998206,2978294.6067709294); // Mount Everest coordinates
                var distance = Cesium.Cartesian3.distance(position, positionEarth);

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
           };
          }
          fetchExtents(){
            // var e= this._mouseEndCallback.function();
            //var x1=
            var ex=[x1,546,78.98,1233];
             return ex;
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
            this._cesiumViewer.entities.remove( entity._CEntity );
       
      }

}
