import { Injectable } from '@angular/core'
import { LoadConfig } from './loadconfig.service'
import {TestdbService} from './testdb.service'
import {GetdataService} from './getdata.service';

 /**
 * @ngdoc method
 * @name MongoManager # Injectable calls that manages all the operations of mongo
 */
@Injectable()
export class MongoManager{ 
    
      /**
       * @ngdoc method
       * @name Constructor# initializing
       *
       */
      constructor ( private testdbService : TestdbService ,
                  private getdataService : GetdataService)
                {
      
           
      }  
  /**
     * @ngdoc method
     * @name addData # Adds Data
     * This method adds the data to the database.
     */
     public addData1(entity) {
         
      var dbEntity =  this.testdbService.testDB().subscribe( data =>  { console.log(data); } );
      return dbEntity;                                                         
                                                               
      }


    /**
     * @ngdoc method
     * @name getData # Fetches Data
     * This method retrieves the data from the database.
     */
    public  getData1() {
      var getEntity =   this.getdataService.getsData().subscribe( data =>  {console.log(data);} );
      return getEntity;                                                        
                                                                
      }



};

