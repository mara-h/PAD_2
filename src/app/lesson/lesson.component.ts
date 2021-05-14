import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {LessonService} from '../shared/service/lesson/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  lessonid = 1;
  lesson = 4;
  id=1;
 public lessons: any= [];
  constructor(private lessonService: LessonService ) { }

  ngOnInit(): void {
    this.lessonService.getAll()
      .subscribe(data => {
        for (const d of (data as any)) {
          this.lessons.push({
            id: this.id,
            name: d.name,
            description:d.description,
            content:d.content,
          });
          this.id+=1;
        }
        console.log(this.lessons);
      }, err=>console.log(err)
      );
    console.log(this.lessons);
  }
}
