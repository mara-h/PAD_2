import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../app/shared/service/webSocket/chat.service';
import {AuthentifService} from '../../app/shared/service/authentif/authentif.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  
    user: String;
    messageText: String;
    messageArray:Array<{user:String,message:String}> = [];

  constructor(private chatService:ChatService, public authentifService:AuthentifService) { 


    this.messageText='';
    this.user=authentifService.getUsername();
    this.join();

    this.chatService.newUserJoined().subscribe((data) => this.messageArray.push(data));
    this.chatService.userLeftRoom().subscribe((data) => this.messageArray.push(data));
    this.chatService.newMessageReceived().subscribe((data) => this.messageArray.push(data));
  }

  join(){
    this.chatService.joinRoom({user:this.user});
  } 

  leave(){
    this.chatService.leaveRoom({user:this.user});
  }

sendMessage()
    {
        this.chatService.sendMessage({user:this.user, message:this.messageText});
        this.messageText='';
    }

  ngOnInit(): void {
  }

}
