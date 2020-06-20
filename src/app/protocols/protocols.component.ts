import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from '../services/protocol.service';
import { ServerService } from '../services/server.service';
import { Server } from '../interfaces/server';


@Component({
  selector: 'app-protocols',
  templateUrl: './protocols.component.html',
  styleUrls: ['./protocols.component.scss'],
})
export class ProtocolsComponent implements OnInit {

  protocols: Protocol[];
  selectedServer: Server;

  constructor(private protocolService: ProtocolService, private serverService: ServerService) {
  }

  ngOnInit(): void {
    this.getProtocols();
  }

  getProtocols(): void {
    this.protocolService.getProtocols().subscribe(protocol => this.protocols = protocol);
  }

  getServer(id): Server {
    this.serverService.getServer(id).subscribe(s => this.selectedServer = s);
    return this.selectedServer;
  }

}

