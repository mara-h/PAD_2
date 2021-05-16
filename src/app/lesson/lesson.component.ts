import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { from } from 'rxjs';
import {LessonService} from '../shared/service/lesson/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  lessonDetails:any;
  currentUser = '';
  lessonid = 1;
  lesson = 4;
  id=1;
 public lessons: any= [];
  constructor(private lessonService: LessonService ,private router:Router) { }

  ngOnInit(): void {
    this.lessonService.getAll().subscribe(res => {
  if(res.hasOwnProperty('count')){
    //@ts-ignore 
    var count = res['count'];
  }
  for (var i = 0; i < count; i++) {
    if(res.hasOwnProperty('lesson')){
      //@ts-ignore 
      this.lessonDetails = res['lesson'][i];
      //console.log(this.lessonDetails['name']);
      this.lessons.push({
        nb: i,
        id: this.lessonDetails['_id'],
        name: this.lessonDetails['name'],
        description: this.lessonDetails['description'],
        content:this.lessonDetails['content'],
        request:this.lessonDetails['request']
      })
    }
  }
  console.log(this.lessons);

  

    },
    (err) => {
      console.log("eroare lessons:" + err);
    });
  }

  Click(id:string, nb: number) {
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "name": this.lessons[nb]['name'],
          "content": this.lessons[nb]['content']
      }
  };
  this.router.navigate(["lesson/"+nb], navigationExtras);

  }

  Click1(id:string, nb: number){
    this.lessonService.deleteLesson(id);
  }
}
