/**
 * @ngdoc service
 * @name quiz.service
 * @module traj.module
 *
 * @requires Injectable
 * @requires Http,Response
 * @requires Observable
 * @requires LoadQuiz 
 * @requires catch operator
 * @requires map operator
 * @requires of operator
 * 
 * @description Performs the functions required for fetching questions
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoadQuiz } from './loadquiz.service';
// import * as quiz from './quizques.json';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
//import { Quiz } from './quiz';


@Injectable()
export class quizService {
  private quiz;
  private random;
  config;
  

constructor(private _http: Http,private loadquiz: LoadQuiz) {
   

        // this.loadquiz.getConfig().subscribe(config => {
        //     this.config = config;
        //     this.init();
      //  });
   
   this.quiz = [
   
   
      {
        Question: "This city evokes the royal family? And this city's Jantar Mantar has all the tools in working state.",//Jaipur
        Answer: 'Jaipur',
        lat: 75.7873,//east
        long: 26.9124,//north
        Desc: `
        'This largest city is Rajasthan is also famous as the “Pink City”. 
        It is so because in 1876, the city was painted with terracotta pink colour in grand welcome of the Prince of Wales.
         Since then the name has not only stuck, but has given the city a unique identity.'`

      },

      {
        Question: 'The famous writer who wrote the national anthem for two countries is from which city?',//Kolkata
        Answer: 'Kolkata',
        lat: 88.3639,//east
        long: 22.5726,
        Desc:`'To the British rulers, Kolkata, the then Calcutta, was the most important city in India 
        it was India’s capital too),
        and the second most important city of the whole British Empire, after London.'`,
       
      },

      {
        Question: 'I am the financial capital of India,and bollywood is based here?',//mumbai
        Answer: 'Mumbai',
        lat: 72.8777,//east
        long: 19.0760,
        Desc:`'From Bom Bahia, literally meaning ‘The Good Bay’.
        Bombay was actually named by Portuguese explorer Francis Almeida.
        The present day name ‘Mumbai’ is named after goddess Mumba devi of the Koli community.'`

      },
      {
        Question: 'The most well structured city in india and is capital of two states ?',//Chandigarh
        Answer: 'Chandigarh',
        lat: 76.7794,//east
        long: 30.7333,
        Desc:`'The city is a union territory controlled by the Central Government
         and is the capital of two Indian states Haryana and Punjab.
         It is noticed that the sectors in Chandigarh and Panchkula don’t have a Sector 13,
         a superstitious belief that the no. 13 is not auspicious.'`
      },
      {
        Question: 'The Indian Institute of Science is situated at here,and is famous for its parks and nightlife  ?',//Bangalore
        Answer: 'Bangalore',
        lat: 77.5946,//east
        long: 12.9716,
        Desc:`'Everyone knows that Bangalore is known as the Silicon Valley of India, 
        but you should also know  that the city houses 212 software companies in its heart'`
      },
      {
        Question: ' I am the smallest country in the world,and pope lives here. Who am I  ?',//Vatican City
        Answer: 'Vatican City',
        lat: 12.4534,//east
        long: 41.9029,//north
        Desc:`'The Vatican's radio station is located in a tower inside the 
        Vatican Gardens and broadcasts in 20 languages throughout the world.'`
      },
      {
        Question: 'The city where the famous T.V. show F.R.I.E.N.D.S. is based?',//new york city
        Answer: 'new york city',
        lat:- 74.0059,//west
        long: 40.7128,//north
        Desc:`'The first American chess tournament was held in New York in 1843.'`
      },
      {
        Question: 'An eye is named after this city;and if you want to know the time,u may go to Mr. Ben?',//London
        Answer: 'London',
        lat:-0.1278 ,//west
        long: 51.5074,//north
        Desc:`'Queen Elizabeth 2 may be the head of State,
         but she needs permission from the Lord Mayor to enter the city of London.'`
      },
      {
        Question: ' I am also known as lion city?',//Singapore
        Answer:'Singapore',
        lat:103.8198 ,//east
        long: 1.3521,//north
        Desc:`'We all know the story of how Sang Nila Utama,
          a Srivijayan Prince from Palembang saw a creature he thought
          was a lion and named the island Singapura which means Lion City in Sanskrit. 
          But truth be told, there were no lions ever in Singapore. 
          It's possible that the creature he saw was actually a tiger. '`
      },
      {
        Question: "  Where can one find the Saint Basil's Cathedral?",//Moscow, Russia
        Answer: 'Moscow',
        lat: 37.6173,//east
        long: 55.7558,//north
        Desc:`'Moscow has got its name from the river that runs through it, the Moskva. “Moscow” meant “wet.”'`
      },
      {
        Question: " I am the fashion capital of the world and is known for cafe culture and designer boutique.I am also the most romantic place in the world?",//Paris
        Answer: 'Paris',
        lat: 2.3522,//east
        long:48.8566, //north
        Desc:`'The Eiffel Tower was supposed to be a temporary installation,
         intended to stand for 20 years after being built for the 1889 World Fair.'`
      },
      {
        Question: " I am known for Apartheid Museum and Constitution hill  ?",//Johannesburg
        Answer: 'Johannesburg',
        lat: 28.0473,//east
        long:-26.2041 ,//south
        Desc:`'Even though Johannesburg is well over 120 years old 
        (founded on 4 October 1886 during the gold rush),
         it is still one of the youngest major cities in the world.'`
      }
      
   ];

  }

  // init(){
  //  this.quiz= this.config.quiz;
  //  console.log(this.quiz)
  // }

/**
 * @ngdoc method
 * @name getQuiz# It gets the random question from the provided array
 *
 * @return {Observable} returns the values of the random question
 */
  getQuiz() {

    this.random = this.quiz[Math.floor(Math.random() * this.quiz.length)];
    // this.random = this.quiz[Math.floor(Math.random() * this.quiz.length)];
    return Observable.of(this.random);

  }

/**
 * @ngdoc method
 * @name getLl# It gets the latitude value of the random question picked from the array
 *
 * @return {Observable} returns the value of latitude
 */
  getLl() {
    for (var i = 0; i < 12; i++) {

      var ll = this.random.lat;
      console.log(ll);
      return Observable.of(ll);
    }
  }

  /**
 * @ngdoc method
 * @name getLong# It gets the longitude value of the random question picked from the array
 *
 * @return {Observable} returns the value of longitude
 */
  getLong() {
    for (var i = 0; i < 12; i++) {

      var long = this.random.long;
      console.log(long);
      return Observable.of(long);
    }
  }

   /**
 * @ngdoc method
 * @name getDesc# It gets the description value of the random question picked from the array
 *
 * @return {Observable} returns the value of description
 */
  getDesc() {
    for (var i = 0; i < 12; i++) {

      var desc = this.random.Desc;
      console.log(desc);
      return Observable.of(desc);
    }
  }
 
  
}





