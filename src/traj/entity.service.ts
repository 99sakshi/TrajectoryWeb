import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service'
import {MongoDBService} from './mongodb.service'

 /**
 * @ngdoc method
 * @name EntityService # Injectable calls that manages all the operations of mongo
 */
@Injectable()
export class EntityService{ 
    
      /**
       * @ngdoc method
       * @name Constructor# initializing
       *
       */
      constructor ( private mongoDBService : MongoDBService)
      {
      
      }  

   /**
     * @ngdoc method
     * @name addData # Adds Data
     * This method adds the data to the database.
     */
     public addData(entity) {
         
      var dbEntity =  this.mongoDBService.putData(entity).subscribe( data =>  { console.log(data); } );
      return dbEntity;                                                         
                                                               
      }


    /**
     * @ngdoc method
     * @name getData # Fetches Data
     * This method retrieves the data from the database.
     */
    public getData() {
      return this.mongoDBService.getData();                                                                                                            
    }

};