import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from '../services/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Server } from '../interfaces/server';
import { Device } from '../interfaces/device';
import { DeviceService } from '../services/device.service';

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
    private deviceService: DeviceService) {
  }

  get f() {
    return this.form.controls;
  }

  selectedProtocol: Protocol;
  servers: Server[];
  devices: Device[];
  form = new FormGroup({
    protocolName: new FormControl('', Validators.required),
    protocolServer: new FormControl('', Validators.nullValidator),
  });

  ngOnInit(): void {
    this.setSelectedProtocol();
    this.getServers();
    this.getDevices();
  }

  private setSelectedProtocol() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.selectedProtocol = {id: null, name: 'Nový protokol', activeSrv: null, date: null};
    } else {
      this.selectedProtocol = this.protocolService.getProtocol(Number(id));
    }
  }

  private getServers() {
    this.serverService.getServers().subscribe(server => this.servers = server);
  }

  getServer(id): Server {
    return this.serverService.getServer(id);
  }

  private getDevices() {
    this.devices = this.deviceService.getByProtocol(this.selectedProtocol.id);
  }

  submit() {
    console.log(this.form.value);
  }

}
