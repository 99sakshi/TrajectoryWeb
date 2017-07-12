import { Injectable } from '@angular/core';
import { LoadConfig } from './loadconfig.service';
import { CesiumManager } from './cesiummanager';
import { EntityService } from './entity.service';
import { TObject } from './TObject';


/**
* @ngdoc method
* @name ObjectManager # 
*/
@Injectable()
export class ObjectManager {

      private _objectViewer;
      private _config;

      constructor(private _cesiumManager: CesiumManager,
            private _entityService: EntityService) {

      }

      /**
        * @ngdoc method
        * @name addEntity#adds an entity
        *
        * @param {entity} entity to be added
        * @param {shouldSave} shouldSave the entity to backend
        * Adds the new entity
        *
        * @return {retEntity} retEntity cesium generated entity
        */

      addEntity(entity:TObject, shouldSave:Boolean) {
            // This manager should also store the object somewhere
            var rEntity = this._cesiumManager.addEntity(entity.getPara());

            // Add entity to DB
            if (shouldSave)
                  this._entityService.putData(entity).subscribe( data =>  {
                                                                    console.log(data);
                                                                } );
             


            return rEntity;
      }

      /**
       * @ngdoc method
       * @name removeEntity#removes an entity from the scene
       *
       * @param {entity} entity to be removed
       * Removes an entity
       */
      removeEntity(entity:TObject) {
          var rEntity=  this._cesiumManager.removeEntity(entity);
          return rEntity;
      }

}

