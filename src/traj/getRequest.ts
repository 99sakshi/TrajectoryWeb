import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service'
import { MongoDBService } from './mongodb.service'



 /**
 * @ngdoc method
 * @name MongoManager # Injectable calls that manages all the operations of mongo
 */
@Injectable()
export class GetRequest{ 
    
      /**
       * @ngdoc method
       * @name Constructor# initializing
       *
       */
      constructor ( private _mongoDBService : MongoDBService)
      {
      
      }  

   /**
     * @ngdoc method
     * @name addData # Adds Data
     * This method adds the data to the database.
     */
     public sendData(x,y) {
      this._mongoDBService.getEntity(x,y).subscribe( data =>  { console.log(data); } );                                                         
     }

};