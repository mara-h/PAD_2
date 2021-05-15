import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizService } from '../shared/service/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  
  rasp: string = "";
  quizDetails:any;
  currentQuestion = '';
  private val = 0;
public questions: any= [];
public answears: any = [];
public answears_all: any = [];

  constructor(private quizService: QuizService ) { }

  ngOnInit(): void {
    this.quizService.getAll().subscribe(res => {
  if(res.hasOwnProperty('count')){
    //@ts-ignore 
    var count = res['count'];
  }
  for (var i = 0; i < count; i++) {
    if(res.hasOwnProperty('quiz')){
      //@ts-ignore 
      this.quizDetails = res['quiz'][i];
      this.questions.push({
        nb: 0,
        id: this.quizDetails['_id'],
        question: this.quizDetails["question"],
        right_answear: this.quizDetails['right_answear'],
        wrong_answear1:this.quizDetails['wrong_answear1'],
        wrong_answear2:this.quizDetails['wrong_answear2'],
        wrong_answear3:this.quizDetails['wrong_answear3'],
      })
    }
  }
  this.val = count<10 ? count : 10;
    this.questions = this.quizService.shuffle(this.questions);
    this.questions = this.questions.slice(0,this.val);
    console.log(this.questions);

    for (var i = 0; i < this.val; i++) {
      this.questions[i]['nb'] = i+1;
      this.answears.push(this.questions[i]['right_answear']);
        this.answears_all[0] = this.questions[i]['right_answear'];
        this.answears_all[1] = this.questions[i]['wrong_answear1'];
        this.answears_all[2] = this.questions[i]['wrong_answear2'];
        this.answears_all[3] = this.questions[i]['wrong_answear3'];
      this.answears_all = this.quizService.shuffle(this.answears_all);
      this.questions[i]['right_answear'] = this.answears_all[0];
      this.questions[i]['wrong_answear1'] = this.answears_all[1];
      this.questions[i]['wrong_answear2'] = this.answears_all[2];
      this.questions[i]['wrong_answear3'] = this.answears_all[3];
    }
    },
    (err) => {
      console.log("eroare lessons:" + err);
    });
  }


  onSubmit(f: NgForm) {
    this.quizService.postQuiz(f.value).subscribe(
      (res) => {
        console.log("s-a intamplat ceva cu add quiz ");
        f.resetForm();
      },
      (err) => {
      }
    );
  }


}

