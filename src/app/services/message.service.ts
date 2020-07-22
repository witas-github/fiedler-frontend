import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messages: Message[] = [];

  add(text: string, messageType: string) {
    const message: Message = { text, messageType };
    this.messages.push(message);

    setTimeout(() => {
      this.close(message);
    }, 2000);
  }

  clear() {
    this.messages = [];
  }

  close(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }

}
