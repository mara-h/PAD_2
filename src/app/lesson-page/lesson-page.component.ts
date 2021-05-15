import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.css']
})
export class LessonPageComponent implements OnInit {
  public name!: string;
  public content!: string;
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.name = params["name"];
      this.content = params["content"];
  });
  }
  ngOnInit(): void {
    console.log(this.name);
    console.log(this.content);
  }

}
