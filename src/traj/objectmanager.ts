declare var Object: any;
import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service'
import { CesiumManager} from './cesiummanager';

 /**
 * @ngdoc method
 * @name ObjectManager # Injectable calls that manages all the operations of cesium
 */
@Injectable()
export class ObjectManager{ 
      
      private _objectViewer;
      private _config;
      private _cesiumManager;



     /**
       * @ngdoc method
       * @name addEntity#adds an entity
       *
       * @param {entity} entity to be added
       * Adds the new entity
       *
       * @return {retEntity} retEntity cesium generated entity
       */
      addEntity(entity) {
     var rEntity= this._cesiumManager.add(entity);
     return rEntity;
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

