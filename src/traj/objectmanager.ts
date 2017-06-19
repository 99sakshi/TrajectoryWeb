import { Injectable } from '@angular/core';
import { LoadConfig } from './loadconfig.service';
import { CesiumManager} from './cesiummanager';
import { MongoManager} from './mongomanager';


 /**
 * @ngdoc method
 * @name ObjectManager # 
 */
@Injectable()
export class ObjectManager{ 
      
      private _objectViewer;
      private _config;

      constructor (private _cesiumManager: CesiumManager,
                   private _mongoManager: MongoManager) {

      }

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
            // This manager should also store the object somewhere
            var rEntity= this._cesiumManager.addEntity(entity.getPara());

            // Add entity to DB
            this._mongoManager.addData(entity);
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

