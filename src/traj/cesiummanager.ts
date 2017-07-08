declare var Cesium: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service';
import { EntityService } from './entity.service';
//import { SimManager } from '../app/simmanager';
/**
* @ngdoc method
* @name CesiumManager # Injectable calls that manages all the operations of cesium
*/
@Injectable()
export class CesiumManager{ 
      
      private _cesiumViewer;
      private _config;
      private _mouseEndCallback;
      extents;
      extentcallback;
      getData;
    // _simManager;

      /**
       * @ngdoc method
       * @name Constructor# loads and set config file
       *
       * @param {loadConfig} event Private variable, receives injectable LoadConfig
       * 
       * It computes the view extents.
       * It sends the computed view extents to be displayed on Browser.
       * 
       */
      constructor ( private loadConfig: LoadConfig, private _entityservice:EntityService) {

           this.loadConfig.getConfig().subscribe(    config => {
                                                            this._config = config; 
                                                            this.init();  
                                                        } );  

           this.extentcallback = () => {};
             this.getData=(data) =>{};
            //this._simManager=SimManager;

           this._mouseEndCallback = function() {
                //// get extents
                this.extents = this._cesiumViewer.camera.computeViewRectangle()
                console.log(this.extents);
                // converting radians into degrees
                // and using lat long values to one decimal place
                let x1 = Math.round(Number((Cesium.Math.toDegrees(this.extents.west) * 10)));
                let y1 = Math.round(Number((Cesium.Math.toDegrees(this.extents.south) * 10)));
                let x2 = Math.round(Number((Cesium.Math.toDegrees(this.extents.east) * 10)));
                let y2 = Math.round(Number((Cesium.Math.toDegrees(this.extents.north) * 10)));
                console.log("Degrees :" ,x1,y1,x2,y2);
            
                //// compute level
                var camera = this._cesiumViewer.camera;
                
                var position = camera.position;
                console.log(position);
                var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
                console.log("camera position LLA " + cartographicPosition);

                var distance = Number.MAX_VALUE;
    
                if(this._cesiumViewer.scene.mode == Cesium.SceneMode.SCENE3D)
                {
                    distance = cartographicPosition.height;
                }else {
                    distance = camera.getMagnitude();
                }

                //// level logic
                var levelNumber = Math.round(Number(distance/100000));
                
                // cap value between 0 - 10
                var level = 10 - Math.max(Math.min(levelNumber, 10),0);
                console.log("Level " + level);

                this.extentcallback();

                if(level < 5)
                    return ;
                
                // either move this logic to back end 
                // move it to another thread
                for(var i = x1; i <=x2; ++i)
                {
                    for(var j = y1;j <= y2; ++j)
                    {  
                        var xyhash = "" + j + "@" + i;
                       // console.log(xyhash);
             this._entityservice.getData(xyhash).subscribe( data =>  { 
                if((data._id)!=null){
                    this.getData(data)
                 //this._simManager.addEntity(data, false); 
                                    }
             else
            {
                console.log("Not found")
            } });
                }
            }

        };

    }

    /**
     * @ngdoc method
     * @name init # creates cesium viewer
     * Also sets the imagary and terrain data 
     */
    private init() {

        // show India when app fires up
        var rectangle = Cesium.Rectangle.fromDegrees(68.0, 7.0, 89.0, 35.0);//west,south,east,north
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 1.0;
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

        var viewer = new Cesium.Viewer('cesiumContainer');//Initialize the viewer widget with several custom options and mixins.
        viewer.bottomContainer.innerHTML = "";
        viewer.animation.container.innerHTML = "";
        viewer.timeline.container.innerHTML = "";

        if (this._config.UseLocalGeoserver) {
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
                url: 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles'
            });

            viewer.terrainProvider = terrainProvider;
        }

        if (this._config.ShowMoon) {
            var scene = viewer.scene;
            scene.moon = new Cesium.Moon();
        }

        viewer.camera.moveEnd.addEventListener(this._mouseEndCallback, this);
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
        var retEntity = this._cesiumViewer.entities.add(entityParameters);
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
        this._cesiumViewer.entities.remove(entity._CEntity);

    }

    getEntity(hash){

        //  this._entityservice.getData(hash).subscribe( data =>  { 
        //       console.log(data); 
        //       var appEntity = new TEntity();
        //       appEntity.setParameter(data);
        //       this._simManager.addEntity(appEntity, false); 
        //     } );
    }

}
