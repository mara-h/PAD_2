import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import{LessonService} from '../shared/service/lesson/lesson.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {
  showSuccessMessage!: boolean ;
  serverErrorMessages!: string;

  constructor(private lessonService: LessonService, private router: Router) { }

  ngOnInit(): void {
    this.showSuccessMessage = false;
  }

  onSubmit(f: NgForm) {
    this.lessonService.postLesson(f.value).subscribe(
      (res) => {
        console.log("s-a intamplat ceva cu add lesson ");
        this.serverErrorMessages = '';
        this.showSuccessMessage = true;
        f.resetForm();
      },
      (err) => {
        this.showSuccessMessage = false;
        this.serverErrorMessages = 'Sorry! Something happened, the lesson could not pe added! :(';
      }
    );
  }
}
