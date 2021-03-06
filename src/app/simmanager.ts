// Simulation State

/**
 * @name SimManager
 * 
 * @requires Injectable
 * @requires ObjectManager
 * 
 *
 * @description
 *
 * This method defines the simulation state of the data.
 *
 * @usage
 *
 * ### How to use
 *
 **/
import { Injectable } from '@angular/core';
import { ObjectManager } from '../traj/objectmanager';
import { TObject } from '../traj/tobject';

enum State {
    Start,
    Stop,
    Pause
}

@Injectable()
export class SimManager {
    _entityMap;
    _interval;
    _time;
    _deltaTime;
    _State;

    /**
      * @ngdoc method
      * @name constructor#Initializes
      * It initializes _time, _deltaTime, _entityMap,  _State to stop
      */
    constructor(private objectmanager: ObjectManager) {
        this._time = 0; // in seconds
        this._deltaTime = 0.01; // in seconds
        this._entityMap = [];
        this._State = State.Stop;
    }


    /**
     * @ngdoc method
     * @name addEntity # It adds the entity and puts it in entity map
     *
     * @param {entity} entity to be added
     */

    addEntity(entity: TObject, shouldSave: Boolean) {
        if (this._entityMap[entity._id] == null) {
            this._entityMap[entity._id] = entity;
            entity.setCEntity(this.objectmanager.addEntity(entity, shouldSave));
        }
    }

    /**
     * @ngdoc method
     * @name removeEntity # It removes the entity
     * from the database.
     */
    removeEntity(entity: TObject) {
        entity.setCEntity(this.objectmanager.removeEntity(entity));
        this._entityMap[entity._id] = entity;
    }

    /**
     * @ngdoc method
     * @name removeAllEntity # It removes all entities 
     * from the database.
     */
    removeAllEntity() {
        for (var _id in this._entityMap) {
            this.removeEntity(this._entityMap[_id]);
        }
    }


    /**
    * @ngdoc method
    * @name showAllEntity # It displays all entities.
    */
    showAllEntity() {
        for (var _id in this._entityMap) {
            this._entityMap[_id].show();
        }
    }


    /**
    * @ngdoc method
    * @name hideAllEntity # It removes all entities locally.
    */
    hideAllEntity() {
        for (var _id in this._entityMap) {
            this._entityMap[_id].hide();
        }
    }

    /**
     * @ngdoc method
     * @name start # Starts the simulation 
     * Calls tick function routine
     */
    start() {
        if (this._State == State.Start)
            return;

        this._interval = setInterval(() => {
            this._time += this._deltaTime;
            this.tick();
        }, 1000 * this._deltaTime); // to convert in milli seconds
        this._State = State.Start;
    }


    /**
     * @ngdoc method
     * @name tick # Calls tick function on every Entity 
     * pushs next tick call at back of the event queue
     */
    tick() {
        for (var entityName in this._entityMap) {
            var timeInfo = {
                time: parseFloat(this._time.toFixed(2)),
                deltaTime: parseFloat(this._deltaTime.toFixed(2))
            }

            this._entityMap[entityName].tick(timeInfo);//setting the position and orientation of the current entitythis._entityMap[entityName].tick( timeInfo )

            // Wait for a while
            setTimeout(() => { }, 0);
        }
    }



    /**
     * @ngdoc method
     * @name stop # Stop the simulation
     * Also, sets time to zero
     */
    stop() {
        if (this._State == State.Stop)
            return;
        clearInterval(this._interval);// When you want to cancel it
        this._time = 0;
        this.tick();
        this._State = State.Stop;
    }

    /**
     * @ngdoc method
     * @name pause # pause the simulation
     * 
     */
    pause() {
        if (this._State == State.Pause)
            return;
        clearInterval(this._interval);
        this._State = State.Pause;
    }

}