"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const loadconfig_service_1 = require("./loadconfig.service");
let CesiumManager = class CesiumManager {
    constructor(loadConfig) {
        this.loadConfig = loadConfig;
        this.loadConfig.getConfig().subscribe(config => {
            this._config = config;
            this.init();
        });
    }
    init() {
        var viewer = new Cesium.Viewer('cesiumContainer');
        viewer.bottomContainer.innerHTML = "";
        viewer.animation.container.innerHTML = "";
        if (this._config.UseLocalGeoserver) {
            var imageryLayers = viewer.imageryLayers;
            var myLayer = new Cesium.WebMapServiceImageryProvider({
                url: this._config.Geoserver.Url,
                layers: this._config.Geoserver.Layers[0]
            });
            imageryLayers.removeAll();
            imageryLayers.addImageryProvider(myLayer);
        }
        this._cesiumViewer = viewer;
    }
    addEntity(entity) {
        var retEntity = this._cesiumViewer.entities.add(entity.getPara());
        return retEntity;
    }
    removeEntity(entity) {
    }
};
CesiumManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [loadconfig_service_1.LoadConfig])
], CesiumManager);
exports.CesiumManager = CesiumManager;
//# sourceMappingURL=cesiummanager.js.map