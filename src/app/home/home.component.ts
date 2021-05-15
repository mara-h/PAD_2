import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

    tiles = [
      {text: 'Why our app?', 
      text2:'Learn a language right here with lots of free language-learning lessons, quizzes and opportunities to chat with people from around the globe.',
      cols: 3, rows: 3, color: 'lightblue', font: 'verdana',size: '40'},
      {text: 'Tired of memorizing?', 
      text2:'You can chat with native speakers on any topic you want and expand your vocabulary. Make friends in different parts of the Earth and learn with a \'hands on\' aproach!',cols: 1, rows: 6, color: 'lightgreen',font: 'verdana',size: '40'},
      {text: 'Get started now!',
      text2:'Take our lessons and you will grow your vocabulary, master the language\'s grammar and broaden your horizons.', cols: 1, rows: 6, color: 'lightpink',font: 'verdana', size: '40'},
      {text: 'Change the routine and take a quiz!',
      text2:'To improve your learning experience and keep you motivated, you can also take quizzes. The quizzes are designed to follow a path that has just the right level of challenge so you make progress fast and easy.', cols: 2, rows: 3, color: '#DDBDF1', font:'verdana',size: '40'},
      {text: 'We hope you\'ll enjoy the journey! :) ', 
      text2:'', cols: 1, rows: 3, color: '#Cdeaff', font: 'verdana',size: '10'},
      {text: 'This Project is made by Glentoaica, Husar, Vancia and Vasilescu for our Distributed Programming lab.' ,
      text2:' Coordinator professor and supervisor:      Dan Cosma',cols: 2, rows: 3, color: '#F5d5d4', font: 'verdana', size: '40'}   
    ];

  ngOnInit(): void {
    console.log("ai ajuns in home");
  }

}
