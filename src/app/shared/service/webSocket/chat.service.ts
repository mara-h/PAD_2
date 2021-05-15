import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable, Subject, from } from 'rxjs';

@Injectable() //Service is of type Injectable

export class ChatService {
    private socket = io('http://localhost:8080'); //emits an connection event 

}