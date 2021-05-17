import { SimpleChanges } from '@angular/core';
import { Component, Input,  OnChanges, OnInit,  Output, EventEmitter } from '@angular/core';
import { Answear } from '../shared/model/answear/answear';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  constructor(){}
  @Input()  item: any;
  afisare:string = ''
  afisare1:string = ''
  correct:string = ''
  alreadyAnswered = false;
  

  ngOnInit(): void {
  }
  setradio( chestie: string): void   
  {  
    this.afisare1 = 'Your answer: '+chestie;
        this.correct = ' - The correct answer is: '+ this.item.actual_answear; 
        this.alreadyAnswered = true;       
  } 
}
