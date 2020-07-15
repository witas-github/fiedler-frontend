import { Component, OnInit } from '@angular/core';
import { Server } from '../interfaces/server';
import { ServerService } from '../services/server.service';

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
    this.serverService.getAll().subscribe((data: any) => {
      this.servers = data.data;
    });

  }
}
