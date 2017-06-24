import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service'
import {GetEntityBackEnd} from './getEntitybackend.service'



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
      constructor ( private getEntityBackEnd : GetEntityBackEnd)
      {
      
      }  

   /**
     * @ngdoc method
     * @name addData # Adds Data
     * This method adds the data to the database.
     */
     public sendData(x,y) {
         
      var PosEntity =  this.getEntityBackEnd.sendCoordinates(x,y).subscribe( data =>  { console.log(data); } );
      return PosEntity;                                                         
                                                               
      }

};