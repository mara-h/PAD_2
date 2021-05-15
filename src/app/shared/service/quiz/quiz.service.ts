import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment'
import {Quiz} from '../../model/quiz/quiz'


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  noAuthentifHeader = { headers: new HttpHeaders({ NoAuthentif: 'True' }) };
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(environment.apiBaseUrl+'/quiz/getquiz')
  }

  shuffle(array: any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  postQuiz(quiz: Quiz) {
    return this.http.post(
      environment.apiBaseUrl + '/quiz/add-quiz',
      quiz, this.noAuthentifHeader
    );
  }

  
}
