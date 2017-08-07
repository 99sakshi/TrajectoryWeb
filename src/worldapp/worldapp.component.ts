/**
 * @ngdoc Component
 * @name AppComponent
 * 
 * @requires Component
 * @requires CesiumManager
 * @requires TObject
 * @requires StartService
 * @requires LoadConfig
 * @requires EntityService
 * @requires TObjectInterface 
 * @requires quizService
 *
 * @description
 *
 * This method defines the appearence of the WebPage when the project is executed.
 * It adds questions,timer,answers, button to the WebPage.
 * It also specifies the height,width,margin and padding of cesium container.
 *
 * @usage
 *
 * ### How to use
 *
 **/

declare var Cesium: any;
import { Component } from '@angular/core';
import { CesiumManager } from '../traj/cesiummanager';
import { SimManager } from '../app/simmanager';
//import { TObject } from '../traj/TObject';
import { TLabel } from '../worldapp/tlabel';
import { StartService } from '../traj/start.service';
import { LoadConfig } from '../traj/loadconfig.service';
import { EntityService } from '../traj/entity.service';
import { TObjectInterface } from '../traj/TObjectInterface';
import { quizService } from './quiz.service';
//import {QuizComponent} from './quiz.component';
//import {HTTP_PROVIDERS} from '@angular/http';


@Component({
  selector: 'my-app',
  template: `
 
     <div class="leftContainer">
        <div class="hilight">
            <h2> World Quiz</h2>
            <p>Timer:{{counter}}</p>
            <p>{{quiz1}}</p>
              <button type="button" class="btn btn-success btn-xs" (click)="next()">next</button>
              <p> Answer:{{result}}</p>
            
         </div>
         
 </div>
  
  

     <div id="cesiumContainer">
     </div>
     `,

  //directives: [QuizComponent],
  providers: [quizService]
  , styles: [`
      html, body, #cesiumContainer {
      width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; 
     }
     .clicked{
       cursor:pointer;
     }
     .hilight h2{
    font-family: Helvetica, Verdana;
    color: #FFF;
    z-index: 200;
}

.hilight {
    background-color: #000;
    position: absolute;
    height: 170px;
    width: 50%;
    opacity: 0.65;
    font-family: Verdana, Geneva, sans-serif;
    color: #FFF;
    top: 0px;
    z-index: 1;
}
    `]



})

export class AppComponent {

  north: any;
  east: any;
  west: any;
  south: any;
  counter: number;
  timeleft: number;

  config;
  test;
  EntityNumber;
  Entity;
  ex;
  intervalExtent;

  /**
   * @ngdoc method
   * @name constructor#Initialize Variables
   *
   * @param {LoadConfig} loadConfig Injectable member
   * @param {CesiumManager} _cesiumManager Injectable member
   * @param {quizService} _quizService Injectable member
   * 
   * It initializes the variables of AppComponent. 
   * It displays the answers,timer and label on the Browser.
   *
   */
  private quizI;
  private quiz1;
  private result;
  private lat;
  private long;
  private desc;
  private flag = 1;
  // private label;
  private labelinterval;
  // private countDown;
  private extentcallback;
  constructor(private loadConfig: LoadConfig,
    private _cesiumManager: CesiumManager,
    private _simManager: SimManager,
    private _quizService: quizService,
    private label: TLabel
  ) {
    this.north = 0;
    this.east = 0;
    this.west = 0;
    this.south = 0;
    this.counter = 20;
    this.timeleft = 0;

    // var text
    this._cesiumManager.extentcallback = () => {
      this.north = Cesium.Math.toDegrees(this._cesiumManager.extents.north);
      this.east = Cesium.Math.toDegrees(this._cesiumManager.extents.east);
      this.west = Cesium.Math.toDegrees(this._cesiumManager.extents.west);
      this.south = Cesium.Math.toDegrees(this._cesiumManager.extents.south);
      console.log(this.north, this.east, this.west, this.south);
      var level = this._cesiumManager.level;

      if (this.lat <= this.east && this.lat >= this.west && this.long <= this.north && this.long >= this.south && level > 5) {
        console.log("Welcome");
        this.result = "correct answer,well done!";
        this.flag = 1;
        this.facts();


        // this.labelinterval = setInterval(function () {
        //     this.label.label.text="";
        //     this._cesiumManager.addEntity(this.label);
        //     this.next();

        //   }, 5000);

        //       this.label=  {
        //      position : Cesium.Cartesian3.fromDegrees(this.quizI.lat,this.quizI.long),//displays the desciption of the location
        //     label : {
        //         text : this.desc
        //       //  show:true

        //    }
        //  };
        //this.label.DistanceDisplayCondition= new Cesium.DistanceDisplayCondition(50.0 , 60.0);
        this.label = new TLabel(this._cesiumManager);
        // var position=Cesium.Cartesian3.fromDegrees(this.quizI.lat,this.quizI.long)
        this.label.setPosition(this.quizI.lat, this.quizI.long);
        this.label.setCEntity(this.label);
        this.label.setText(this.desc);
        this.label.setLabel();
        // this._simManager.addEntity(this.label,false);
        //this._cesiumManager.addEntity(this.label);
        //  setTimeout(() => {
        //     this.label.setText("");
        //  this.label.setLabel();
        //    }, 5000);
        // this._cesiumManager.addEntity(this.label);
        // label.text = null;
      }
      else {
        this.result = "wrong answer,try again!";
        this.flag = 0;
      }

    };


    var that = this;
    that.intervalExtent = setInterval(function () {
      that.counter--;
      that._cesiumManager.extentcallback();
      if (that.counter == that.timeleft) {

        //clearInterval(that.intervalExtent);
        //  this.desc=null;
        // this.label.label.text=null;
        //this.cesiummanager.addEntity(this.label);
        //this.label.setText("");
        //this.label.setLabel();
        that.next();

      }

    }, 1000);//sets the interval for counter and extentcallback()
  }
  /**
     * @ngdoc method
     * @name ngOnInit# fetches values from quiz.service 
     *
     * This method fetches values from quiz.service and sets values to the variables
     *
     */

  ngOnInit() {
    this._quizService.getQuiz().subscribe(quiz => {
      this.quiz1 = quiz.Question;
      this.quizI = quiz;
      this.lat = quiz.lat;
      this.long = quiz.long;
      //that.fact();
      // this.desc = quiz.Desc;
      //this.init();
    });

  }

  // init() {
  //   var viewer= this._cesiumManager._cesiumViewer;//viewer is undefined
  //        viewer = new Cesium.Viewer('cesiumContainer', {
  //         imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
  //         url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
  //     }),
  //     baseLayerPicker : false
  // }
  // }


  /**
    * @ngdoc method
    * @name next# pops up the next question on browser
    * This method gets the question and it's associated values from the array
    */

  next() {
    this.desc = "";
    var entity = this.label.removeLabel();
    this._quizService.getQuiz().subscribe(quiz => {
      this.counter = 20;
      this.quiz1 = quiz.Question;
      this.quizI = quiz;
      this.lat = quiz.lat;
      this.long = quiz.long;
    });
  }

  /**
    * @ngdoc method
    * @name facts# it sets the required description of the question
    * This method displays the description of the question when the player gives the correct answer 
    */

  facts() {
    if (this.flag == 1) {
      this.desc = this.quizI.Desc;
      this.flag = 0;


    }
  }

}
