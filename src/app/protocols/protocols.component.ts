import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from '../protocol-detail/protocol.service';
import { ServerService } from '../server-detail/server.service';
import { Server } from '../interfaces/server';


@Component({
  selector: 'app-protocols',
  templateUrl: './protocols.component.html',
  styleUrls: ['./protocols.component.scss'],
})
export class ProtocolsComponent implements OnInit {

  protocols: Protocol[];

  constructor(private protocolService: ProtocolService, private serverService: ServerService) {
  }

  ngOnInit(): void {
    this.getProtocols();
  }

  getProtocols(): void {
    this.protocolService.getProtocols().subscribe(protocol => this.protocols = protocol);
  }

  getServer(id): Server {
    return this.serverService.getServer(id);
  }

}

