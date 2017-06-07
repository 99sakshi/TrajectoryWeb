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
const simmanager_1 = require("./simmanager");
const missile_1 = require("./missile");
const forwardController_1 = require("./forwardController");
const start_service_1 = require("./start.service");
const loadconfig_service_1 = require("../traj/loadconfig.service");
const cesiummanager_1 = require("../traj/cesiummanager");
let AppComponent = class AppComponent {
    constructor(_simManager, _cesiumManager, startService, loadConfig) {
        this.startService = startService;
        this.loadConfig = loadConfig;
        this._simManager = _simManager,
            this._cesiumManager = _cesiumManager,
            this._simManager.setCesiumManager(this._cesiumManager);
    }
    ngOnInit() {
        this.loadConfig.getConfig().subscribe(data => {
            this.config = data;
            this.init();
        });
    }
    init() {
        this.addEntityToManager();
        this.addEntityToManager2();
    }
    addEntityToManager() {
        var missile = new missile_1.Missile;
        var controller = new forwardController_1.ForwardController;
        missile._name = "TestMissile";
        controller.setPosition(missile._position);
        missile.setController(controller);
        this._simManager.addEntity(missile);
    }
    addEntityToManager2() {
        var missile = new missile_1.Missile;
        missile._name = "TestMissile2";
        this._simManager.addEntity(missile);
        missile.setPosition(Cesium.Cartesian3.fromDegrees(-120.0744619, 48.0503706, 100));
    }
    startSimulation() {
        this.startService.startSimulation().subscribe(data => {
            console.log(data);
            this._simManager.start();
        });
    }
    pauseSimulation() {
        this._simManager.pause();
    }
    stopSimulation() {
        this._simManager.stop();
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: `
     <button type="button" class="btn btn-success" (click)="startSimulation()">Start</button>
     <button type="button" class="btn btn-warning" (click)="pauseSimulation()">Pause</button>
     <button type="button" class="btn btn-danger" (click)="stopSimulation()">Stop</button>
     <div id="cesiumContainer"> </div>
     `,
        styles: [`
      html, body, #cesiumContainer {
      width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
     }
    `
        ]
    }),
    __metadata("design:paramtypes", [simmanager_1.SimManager, cesiummanager_1.CesiumManager,
        start_service_1.StartService,
        loadconfig_service_1.LoadConfig])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map