// Simulation State

import { CesiumManager } from  '../traj/cesiummanager';

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
   /**
 * @ngdoc method
 * @name constructor#Initializes
 *It initializes _time,_deltaTime,_entityMap,_State of the current object
 */
    constructor( ) {
        this._time = 0; // in seconds
        this._deltaTime = 0.01; // in seconds
        this._entityMap = [];
        this._State = State.Stop;
    }
    /**
 * @ngdoc method
 * @name addEntity#It adds the entity
 *
 * @param {entity} event Receive the emitted entity
 * It adds the entity
 */
    addEntity (entity) {
        entity.setCEntity( this._CesiumManager.addEntity(entity) );
        this._entityMap[entity._name] = entity;
    }
/**
 * @ngdoc method
 * @name removeEntity#It removes the entity
 */
    removeEntity () {

    }
 /**
 * @ngdoc method
 * @name setCesiumManager#sets the CesiumManager
 *It initializes _CesiumManager of the current object
 */

    setCesiumManager (cesiummanager) {
        this._CesiumManager = cesiummanager;
    }
/**
 * @ngdoc method
 * @name start#sets the interval and state
 *It initializes _interval,_State of the current object
 */
    start () {
        if(this._State == State.Start)
            return;

        this._interval = setInterval(() =>  {   this._time += this._deltaTime; 
                                                this.tick();  
                                            },  1000 * this._deltaTime); // to convert in milli seconds
        this._State = State.Start;
    }
/**
 * @ngdoc method
 * @name tick#sets the time and deltaTime
 *It sets setTimeout to zero 
 */
    tick () {
        for(var entityName in this._entityMap)
        {
            var timeInfo = {
                time :      parseFloat( this._time.toFixed(2) ),
                deltaTime : parseFloat( this._deltaTime.toFixed(2) )
            }
            
            this._entityMap[entityName].tick( timeInfo );//setting the position and orientation of the current entitythis._entityMap[entityName].tick( timeInfo )

            // Wait for a while
            setTimeout( () => {} ,0 ); 
        }
    }
/**
 * @ngdoc method
 * @name stop#sets current state to stop
 *It initializes _time,_State of the current object
 */
    stop () {
        if(this._State == State.Stop)
            return;
        clearInterval(this._interval);// When you want to cancel it
        this._time = 0;
        this.tick();
        this._State = State.Stop;
    }
/**
 * @ngdoc method
 * @name pause#sets the current state to pause
 *It sets _State of the current object
 */
    pause (){
        if(this._State == State.Pause)
            return;
        clearInterval(this._interval);
        this._State = State.Pause;
    }

}