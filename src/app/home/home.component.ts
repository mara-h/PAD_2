import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

    tiles = [
      {text: 'Learn a language right here with lots of free language-learning lessons, quizzes and opportunities to chat with people from around the globe.', cols: 3, rows: 3, color: 'lightblue', font: 'verdana'},
      {text: 'You can chat with native speakers on any topic you want and expand your vocabulary. Make friends in different parts of the Earth!', cols: 1, rows: 6, color: 'lightgreen',font: 'verdana'},
      {text: 'Take our lessons and you will grow your vocabulary, master the language\'s grammar and broaden your horizons.', cols: 1, rows: 6, color: 'lightpink',font: 'verdana'},
      {text: 'To improve your learning experience and keep you motivated, you can also take quizzes. The quizzes are designed to follow a path that has just the right level of challange so you make progress fast and easy.', cols: 2, rows: 3, color: '#DDBDF1', font:'verdana'},
      {text: 'PAD project - learn a language' , cols: 1, rows: 3, color: '#Cdeaff', font: 'verdana'},
      {text: 'We hope you\'ll enjoy the journey! :) ', cols: 2, rows: 3, color: '#F5d5d4', font: 'verdana'},
      
    ];

  ngOnInit(): void {
    console.log("ai ajuns in home");
  }

}
