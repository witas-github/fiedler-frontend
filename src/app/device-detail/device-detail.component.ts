import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Device } from '../interfaces/device';
import { ProtocolService } from '../services/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { MessageService } from '../services/message.service';
import { Server } from '../interfaces/server';
import { BaseComponent } from '../base/base.component';
import { MessageList } from '../messages/messages.list';
import { Protocol } from '../interfaces/protocol';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss'],
})
export class DeviceDetailComponent extends BaseComponent implements OnInit{

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private serverService: ServerService,
    private protocolService: ProtocolService,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  selectedDevice: Device;
  selectedProtocol: Protocol;
  form: FormGroup;
  servers: Server[];

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.setSelectedProtocolAndDevice();
    this.getServers();
  }

  private createFrom() {
    this.form = new FormGroup({
      srn: new FormControl(this.selectedDevice.srn, Validators.required),
      registeredServer: new FormControl(this.selectedDevice.registeredServer.id, Validators.nullValidator),
    });
  }

  private setSelectedProtocolAndDevice() {
    const id = this.route.snapshot.paramMap.get('id');
    const protocolId = this.route.snapshot.paramMap.get('protocolId');

    if (id == null) {
      this.selectedDevice = DeviceService.empty();
      this.protocolService.getOne(protocolId).subscribe((data: any) => {
        this.selectedProtocol = data.data[0];
      });
      this.createFrom();
    } else {
      this.deviceService.getOne(id).subscribe((data: any) => {
        this.selectedDevice = data.data[0];
        if (this.selectedDevice.registeredServer === undefined){
          this.selectedDevice.registeredServer = ServerService.empty();
        }
        this.selectedProtocol = this.selectedDevice.protocol;
        this.createFrom();
      });
    }
  }


  private getServers() {
    this.serverService.getAll().subscribe((data: any) => {
      this.servers = data.data;
    });
  }

  submit() {
    const id = this.route.snapshot.paramMap.get('id');
    const device = this.form.value;
    device.protocol = this.selectedProtocol.id;
    device.state = 0;
    device.activeServer = null;

    this.executeFormSubmit(this.deviceService, id, device);
  }


}
