import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { QuizService } from '../../shared/service/quiz/quiz.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  showSuccessMessage!: boolean ;
  serverErrorMessages!: string;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.showSuccessMessage = false;
  }

  onSubmit(f: NgForm) {
    this.quizService.postQuiz(f.value).subscribe(
      (res) => {
        console.log("s-a intamplat ceva cu add quiz ");
        this.serverErrorMessages = '';
        this.showSuccessMessage = true;
        f.resetForm();
      },
      (err) => {
        this.showSuccessMessage = false;
        this.serverErrorMessages = 'Sorry! Something happened, the quiz could not pe added! :(';
      }
    );
  }
}
