import { Component, OnInit } from '@angular/core';
import { Server } from '../interfaces/server';
import { ServerService } from '../server-detail/server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

  servers: Server[];

  constructor(private serverService: ServerService) {
  }

  ngOnInit(): void {
    this.getServers();
  }

  getServers(): void {
    this.serverService.getServers().subscribe(server => this.servers = server);
  }
}
