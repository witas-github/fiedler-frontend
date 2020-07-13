import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from '../services/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Server } from '../interfaces/server';
import { Device } from '../interfaces/device';
import { DeviceService } from '../services/device.service';
import { Observable, of } from 'rxjs';
import { Req } from '../interfaces/req';


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

  selectedServer: Server;
  servers: Server[];
  devices: Device[];
  form: FormGroup;

  ngOnInit(): void {
    this.getServers();
    this.setSelectedProtocol();
  }

  private createFrom(){
    this.form = new FormGroup({
      protocolName: new FormControl(this.selectedProtocol.name, Validators.required),
      protocolServer: new FormControl('', Validators.nullValidator),
    });
  }

  private  setSelectedProtocol() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.selectedProtocol = {_id: null, name: 'Nový protokol', activeSrv: null, date: null};
    } else {
      this.protocolService.getProtocol(id).subscribe((data: any) => {
        this.selectedProtocol = data.data;
        this.createFrom();
      });
    }
  }

  private getServers() {
    this.serverService.getServers().subscribe((data: any) => {
      this.servers = data.data;
    });
  }

  getServer(id): Server {
    this.serverService.getServer(id).subscribe(s => this.selectedServer = s);
    return this.selectedServer;
  }

  private async getDevices() {
    await this.deviceService.getByProtocol(this.selectedProtocol._id).subscribe((data: any) => {
      this.devices = data.data;
    });
  }

  submit() {
    console.log(this.form.value);
  }

}
