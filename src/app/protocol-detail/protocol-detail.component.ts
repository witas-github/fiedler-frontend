import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from '../services/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Server } from '../interfaces/server';
import { Device } from '../interfaces/device';
import { DeviceService } from '../services/device.service';
import { MessageList } from '../messages/messages.list';
import { MessageService } from '../services/message.service';
import { Message } from '../interfaces/message';
import { MessageType } from '../messages/messages.types';

@Component({
  selector: 'app-protocol-detail',
  templateUrl: './protocol-detail.component.html',
  styleUrls: ['./protocol-detail.component.scss'],
})
export class ProtocolDetailComponent implements OnInit {

  constructor(
    private protocolService: ProtocolService,
    private route: ActivatedRoute,
    private serverService: ServerService,
    private deviceService: DeviceService,
    private messageService: MessageService) {
  }

  get f() {
    return this.form.controls;
  }

  selectedProtocol: Protocol;

  servers: Server[];
  devices: Device[];
  form: FormGroup;

  ngOnInit(): void {
    this.getServers();
    this.setSelectedProtocol();
  }

  private createFrom() {
    this.form = new FormGroup({
      name: new FormControl(this.selectedProtocol.name, Validators.required),
      activeServer: new FormControl(this.selectedProtocol.activeServer.id, Validators.nullValidator),
    });
  }

  private setSelectedProtocol() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.selectedProtocol = {id: null, name: 'Nový protokol', activeServer: ServerService.empty(), createdAt: new Date()};
      this.createFrom();
      this.getDevices();
    } else {
      this.protocolService.getOne(id).subscribe((data: any) => {
        this.selectedProtocol = data.data[0];

        if (this.selectedProtocol.activeServer === undefined){
          this.selectedProtocol.activeServer = ServerService.empty();
        }

        this.createFrom();
        this.getDevices();
      });
    }
  }

  private getServers() {
    this.serverService.getAll().subscribe((data: any) => {
      this.servers = data.data;
    });
  }

  private async getDevices() {
    await this.deviceService.getByProtocol(this.selectedProtocol.id).subscribe((data: any) => {
      this.devices = data.data;
    });
  }

  submit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      this.protocolService.create(this.form.value).subscribe(
        data => this.messageService.add(MessageList.saved,'success'),
        error => this.messageService.add(error.error.message[0],'danger'),
      );
    } else {
      this.protocolService.update(id, this.form.value).subscribe(
        data => this.messageService.add(MessageList.saved,'success'),
        error => this.messageService.add(error.error.message[0],'danger'),
      );
    }
  }

}
