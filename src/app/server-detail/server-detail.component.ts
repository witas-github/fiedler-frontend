import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Server } from '../interfaces/server';
import { ServerService } from '../services/server.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { MessageList } from '../messages/messages.list'

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.scss'],
})
export class ServerDetailComponent implements OnInit {

  constructor(private serverService: ServerService, private route: ActivatedRoute, private messageService: MessageService) {
  }

  get f() {
    return this.form.controls;
  }

  result: any;

  selectedServer: Server;
  form: FormGroup;

  ngOnInit(): void {
    this.setSelectedServer();
  }

  private createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.selectedServer.name, Validators.required),
      url: new FormControl(this.selectedServer.url, Validators.required),
    });
  }

  submit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      this.serverService.create(this.form.value).subscribe(
        data => this.messageService.add(MessageList.saved, 'success'),
        error => this.messageService.add(error.error.message[0], 'danger'),
      );
    } else {
      this.serverService.update(id, this.form.value).subscribe(
        data => this.messageService.add(MessageList.saved, 'success'),
        error => this.messageService.add(error.error.message[0], 'danger'),
      );
    }

  }

  private setSelectedServer() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      this.selectedServer = {id: null, name: 'Nový server', url: null, date: null};
      this.createForm();
    } else {
      this.serverService.getOne(id).subscribe((data: any) => {
        this.selectedServer = data.data[0];
        this.createForm();
      });
    }
  }

}
