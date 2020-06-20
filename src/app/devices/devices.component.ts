import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from '../services/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  constructor(
    private protocolService: ProtocolService,
    private route: ActivatedRoute,
    private serverService: ServerService,
    private deviceService: DeviceService) {
  }

  selectedProtocol: Protocol;

  ngOnInit(): void {
    this.setSelectedProtocol();
  }

  private setSelectedProtocol() {
    const protocolId = this.route.snapshot.paramMap.get('protocolId');
    this.protocolService.getProtocol(Number(protocolId)).subscribe(protocol => this.selectedProtocol = protocol);
  }

}
