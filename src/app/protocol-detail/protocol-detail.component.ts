import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from '../services/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Server } from '../interfaces/server';
import { Device } from '../interfaces/device';
import { DeviceService } from '../services/device.service';
import { Observable } from 'rxjs';
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
    this.setSelectedProtocol();
    this.getServers();
    this.getDevices();

    this.form = new FormGroup({
      protocolName: new FormControl(this.selectedProtocol.name, Validators.required),
      protocolServer: new FormControl('', Validators.nullValidator),
    });
  }

  private setSelectedProtocol() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.selectedProtocol = {id: null, name: 'Nový protokol', activeSrv: null, date: null};
    } else {
      this.protocolService.getProtocol(Number(id)).subscribe(protocol => this.selectedProtocol = protocol);
    }
  }

  private getServers() {
    this.serverService.getServers().subscribe(server => this.servers = server);
  }

  getServer(id): Server {
    this.serverService.getServer(id).subscribe(s => this.selectedServer = s);
    return this.selectedServer;
  }

  private getDevices() {
    this.deviceService.getByProtocol(this.selectedProtocol.id).subscribe((data: any)=>{
      this.devices = data.data;
    });
  }

  submit() {
    console.log(this.form.value);
  }

}
