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

  postQuiz(quiz: Quiz) {
    return this.http.post(
      environment.apiBaseUrl + '/quiz/add-quiz',
      quiz, this.noAuthentifHeader
    );
  }
}
