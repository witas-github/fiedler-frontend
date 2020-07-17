import { Component, OnInit } from '@angular/core';
import { MessageList } from '../messages/messages.list';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(protected messageService: MessageService) { }

  ngOnInit(): void {
  }

  executeFormSubmit(service: any, id: any, value: any){
    if (id === null) {
      service.create(value).subscribe(
        data => this.messageService.add(MessageList.saved,'success'),
        error => this.messageService.add(error.error.message[0],'danger'),
      );
    } else {
      service.update(id, value).subscribe(
        data => this.messageService.add(MessageList.saved,'success'),
        error => this.messageService.add(error.error.message[0],'danger'),
      );
    }
  }

}
