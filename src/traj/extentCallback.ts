var Cesium:any;
import{CesiumManager} from './cesiummanager';
var viewer = new Cesium.Viewer('cesiumContainer');
viewer.canvas.addEventListener('click', function(e){
    var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
    if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

        alert(longitudeString + ', ' + latitudeString);
    } else {
        alert('Globe was not picked');
    }
	
}, false);

//Second
//get position from globe and set model
function getPositionFromGlobe() {
    var viewer = Earth.variables.cesiumViewer;
    var scene = Earth.variables.cesiumScene;

    var ellipsoid = scene.globe.ellipsoid;

    var cartographic;
    var longitudeString;
    var latitudeString;
    var heightString;

    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas),
        onEarthClick = function (e) {
            if (e.which == 3) {//right button
                $(this).unbind('mousedown', onEarthClick);

                Earth.variables.currentModel.longitude = parseFloat(longitudeString);
                Earth.variables.currentModel.latitude = parseFloat(latitudeString);
                Earth.variables.currentModel.altitude = parseFloat(heightString);
    
                setModelToCesium(Earth.variables.currentModel);
            }
        };

    handler.setInputAction(function (movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        if (cartesian) {
            cartographic = ellipsoid.cartesianToCartographic(cartesian);
            longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(15);
            latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(15);
            heightString = Cesium.Math.toDegrees(cartographic.height).toFixed(15);
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    $("#map3d").mousedown(onEarthClick);
}
//Third
var ray = viewer.camera.getPickRay(movement.endPosition);
var position = viewer.scene.globe.pick(ray, viewer.scene);
if (Cesium.defined(position)) {
    var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
    var height = cartographic.height
}
//Fourth

 var nombre = 0; 
var viewer = new Cesium.Viewer('cesiumContainer', {
                    timeline: true,
                    animation: false,
                    homeButton: false,
                    screenModePicker: false,
                    navigationHelpButton: false,
                    baseLayerPicker: false,
                    geocoder: false,
                    sceneMode: Cesium.SceneMode.SCENE3D
                }
            );
 viewer.entities.add({
                id: 'init',
                position: Cesium.Cartesian3.fromDegrees(47.49, -18.87, 0.0),

                box: {
                    dimensions: new Cesium.Cartesian3(5, 5, 0),
                    material: Cesium.Color.BLUE
                }
            });
            viewer.flyTo(viewer.entities.getById('init'));
viewer.entities.add({
                id: 'alo',
                label: {
                    show: false
                }
            });
viewer.scene.canvas.addEventListener('mousemove', function (e) {
                var entity = viewer.entities.getById('alo');
                var ellipsoid = viewer.scene.globe.ellipsoid;
                // Mouse over the globe to see the cartographic position
                    var cartesian = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(e.clientX,e.clientY), ellipsoid);

                    if (cartesian) {
                        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
                        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);
                        entity.position = cartesian;
                        entity.label.show = true;
                        entity.label.text = '(' + longitudeString + ', ' + latitudeString + ')';
                    } else {
                        entity.label.show = false;
                    }
            });
//click
viewer.scene.canvas.addEventListener('click', function(e) {

    var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
                    var ellipsoid = viewer.scene.globe.ellipsoid;
                    var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
                    if (cartesian) {
                        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
                        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);

                        viewer.entities.add({
                            id: nombre.toFixed(2),
                            position: cartesian,
                            box: {
                                dimensions: new Cesium.Cartesian3(5, 5, 0),
                                material: Cesium.Color.BLUE
                            }
                        });
                        var ee = viewer.entities.getById(nombre.toFixed(2));

                        nombre++;
                        console.log(longitudeString + ', ' + latitudeString);
                        var date = new Date();
                        var cart = ee.position.getValue(Cesium.JulianDate.fromDate(date));
                        var carto = ellipsoid.cartesianToCartographic(cart);
                        console.log('position: ' + Cesium.Math.toDegrees(carto.longitude).toFixed(10) + ',' + Cesium.Math.toDegrees(carto.latitude).toFixed(10));

                    } else {
                        alert('Globe was not picked');
                    }
     }, false)