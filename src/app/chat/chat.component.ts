import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../app/shared/service/webSocket/chat.service';
import { AuthentifService } from '../shared/service/authentif/authentif.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[ChatService]
})
export class ChatComponent implements OnInit {
  user:string | null; 
  room:String | undefined;
  messageArray: Array<{ user: String; message: String }> = [];

  constructor(private _chatService:ChatService, public _authentif:AuthentifService) {
    this.user=_authentif.getUsername();
    this.room='Chat Room';
    this.join();

    this._chatService.newUserJoined().subscribe((data) => this.messageArray.push(data));
    this._chatService.userLeftRoom().subscribe((data) => this.messageArray.push(data));
   }

  join(){
    this._chatService.joinRoom({user:this.user, room:this.room});
  }

  leave(){
    this._chatService.leaveRoom({user:this.user, room:this.room});
  }

  ngOnInit(): void {
  }

}
