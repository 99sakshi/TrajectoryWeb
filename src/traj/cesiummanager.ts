declare var Cesium: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service';
import { EntityService } from './entity.service';
import { TObject } from './tobject'
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
                                                });  

           this.extentcallback = () => {};
           this.getData=(data:TObject) => {};

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

                this._entityservice.getDataExtents(x1,x2,y1,y2).subscribe( data =>  { 
                    if((data._id)!=null){
                        this.getData(data);
                    }
                });
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

        if(this._config.Showlogo)
        {
            viewer.bottomContainer.innerHTML = "<img src=\"\\src\\traj\\oponop.png\">";
            // HACK: - shouldn't be called after each render
            viewer.scene.postRender.addEventListener(function(scene, time)  { 
                viewer.bottomContainer.style.left = "1px";
                viewer.bottomContainer.style.bottom = "1px";
            });
        }

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
            var scene =viewer.scene;
            scene.moon = new Cesium.Moon();
        }

        if (!this._config.ShowCesiumUi) {
           viewer.homeButton.container.innerHTML = "";
        }

     viewer.camera.moveEnd.addEventListener(this._mouseEndCallback, this);
        this._cesiumViewer =viewer;

        //Predefined Entity
    var entity = this.addEntity({
    name : 'Red box with black outline',
    position: Cesium.Cartesian3.fromDegrees(77.1025, 28.7041, 300000.0),
    box : {
        dimensions : new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
        material : Cesium.Color.RED,
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});     
                this.dragNdrop(entity);
    }


    /**
     * @ngdoc method
     * @name addEntity#adds an entity
     *
     * @param {entityParameters} Parameters of the entity that needs to be added
     * 
     * @return {retEntity} retEntity cesium generated entity
     */
    addEntity(entityParameters:Object) {
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
    removeEntity(entity:TObject) {
       var retEntity= this._cesiumViewer.entities.remove(entity._CEntity);
            return retEntity;
    }

    getEntity(hash:String){

    }

    dragNdrop(entity)
{

    var mousePosition = new Cesium.Cartesian2();
    var mousePositionProperty = new Cesium.CallbackProperty(function(time, result){
    var position = scene.camera.pickEllipsoid(mousePosition, undefined, result);
    var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
    cartographic.height = 300000.0;
    return Cesium.Ellipsoid.WGS84.cartographicToCartesian(cartographic);
}, false);

//viewer=this._cesiumViewer;
var scene = this._cesiumViewer.scene;
var dragging = false;
var handler = new Cesium.ScreenSpaceEventHandler(this._cesiumViewer.canvas);
handler.setInputAction(
    function(click) {
        var pickedObject = scene.pick(click.position);
        if (Cesium.defined(pickedObject) && (pickedObject.id === entity)) {
            dragging = true;
            scene.screenSpaceCameraController.enableRotate = false;
            Cesium.Cartesian2.clone(click.position, mousePosition);
            entity.position = mousePositionProperty;
        }
    },
    Cesium.ScreenSpaceEventType.LEFT_DOWN
);

handler.setInputAction(
    function(movement) {
        if (dragging) {
            Cesium.Cartesian2.clone(movement.endPosition, mousePosition);
        }
    },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE
);


handler.setInputAction(
    function(click) {
        if(dragging) {
          dragging = false;
          scene.screenSpaceCameraController.enableRotate = true;
          entity.position = scene.camera.pickEllipsoid(click.position);
        }
    },
    Cesium.ScreenSpaceEventType.LEFT_UP
);

}


}
