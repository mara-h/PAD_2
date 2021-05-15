import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../app/shared/service/webSocket/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[ChatService]
})
export class ChatComponent implements OnInit {

  constructor(private _chatService:ChatService){}

  ngOnInit(): void {
  }

}
