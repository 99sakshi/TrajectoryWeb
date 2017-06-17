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
            return rEntity;
      }

       addData1(entity) {
            // This manager should also store the object somewhere
            var dbEntity= this._mongoManager.addData1(entity);
            return dbEntity;
      }
       
        getData1() {
            // This manager should also store the object somewhere
            var dbEntity= this._mongoManager.getData1();
            return dbEntity;
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

