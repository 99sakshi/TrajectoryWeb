import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service'
import { EntityService } from './entity.service'



 /**
 * @ngdoc method
 * @name GetRequest # Injectable calls that manages all the operations of mongo
 */
@Injectable()
export class GetRequest{ 
    
      /**
       * @ngdoc method
       * @name Constructor# initializing EntityService
       * 
       *  @param {_entityService} event Private variable,receives EntityService
       *
       */
      constructor ( private _entityService : EntityService)
      {
      
      }  

   /**
     * @ngdoc method
     * @name sendData # Sends Data
     * 
     * @param {x} Receives the x coordinate of the data to be sent.
     * @param {y} Receives the y coordinate of the data to be sent. 
     * 
     * This method sends the data based on XY coordinates to the database.
     */
     public sendData(x,y) {
      this._entityService.getEntity(x,y).subscribe( data =>  { console.log(data); } );                                                         
     }

};