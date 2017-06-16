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
    private mongoViewer; 
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
      addData1() {
         this.testdbService.startSimulation().subscribe( data =>  {
                                                                    console.log(data);
                                                                } );

      }


    /**
     * @ngdoc method
     * @name getData # Fetches Data
     * This method retrieves the data from the database.
     */
      getData1() {
          this.getdataService.getsData().subscribe( data =>  {
                                                                    console.log(data);
                                                                } );
      }



};

