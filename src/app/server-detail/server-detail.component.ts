import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Server } from '../interfaces/server';
import { ServerService } from '../services/server.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.scss'],
})
export class ServerDetailComponent extends BaseComponent implements OnInit {

  constructor(
    private serverService: ServerService,
    private route: ActivatedRoute,
    messageService: MessageService) {
    super(messageService);
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
    this.executeFormSubmit(this.serverService,id,this.form.value);
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
