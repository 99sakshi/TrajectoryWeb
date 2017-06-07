// Simulation State

import { CesiumManager } from  './traj/cesiummanager';

enum State {
    Start,
    Stop,
    Pause
}

export class SimManager { 
    _entityMap;
    _interval;
    _time;
    _deltaTime;
    _State;
    _CesiumManager;
    
    constructor( ) {
        this._time = 0; // in seconds
        this._deltaTime = 0.01; // in seconds
        this._entityMap = [];
        this._State = State.Stop;
    }
    
    addEntity (entity) {
        entity.setCEntity( this._CesiumManager.addEntity(entity) );
        this._entityMap[entity._name] = entity;
    }

    removeEntity () {

    }

    setCesiumManager (cesiummanager) {
        this._CesiumManager = cesiummanager;
    }

    start () {
        if(this._State == State.Start)
            return;

        this._interval = setInterval(() =>  {   this._time += this._deltaTime; 
                                                this.tick();  
                                            },  1000 * this._deltaTime); // to convert in milli seconds
        this._State = State.Start;
    }

    tick () {
        for(var entityName in this._entityMap)
        {
            var timeInfo = {
                time :      parseFloat( this._time.toFixed(2) ),
                deltaTime : parseFloat( this._deltaTime.toFixed(2) )
            }
            
            this._entityMap[entityName].tick( timeInfo );

            // Wait for a while
            setTimeout( () => {} ,0 ); 
        }
    }

    stop () {
        if(this._State == State.Stop)
            return;
        clearInterval(this._interval);
        this._time = 0;
        this.tick();
        this._State = State.Stop;
    }

    pause (){
        if(this._State == State.Pause)
            return;
        clearInterval(this._interval);
        this._State = State.Pause;
    }

}