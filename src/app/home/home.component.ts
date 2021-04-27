import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

    tiles = [
      {text: 'descriere', cols: 3, rows: 4, color: 'lightblue'},
      {text: 'you can chat', cols: 1, rows: 7, color: 'lightgreen'},
      {text: 'you can take lessons', cols: 1, rows: 3, color: 'lightpink'},
      {text: 'you can take quizes', cols: 2, rows: 3, color: '#DDBDF1'},
    ];

  ngOnInit(): void {
    console.log("ai ajuns in home");
  }

}
