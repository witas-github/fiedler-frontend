import { Component, OnInit } from '@angular/core';
import { ProtocolService } from '../protocol-detail/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { Protocol } from '../interfaces/protocol';
import { Server } from '../interfaces/server';
import { ServerService } from './server.service';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.scss']
})
export class ServerDetailComponent implements OnInit {

  constructor(private serverService: ServerService, private route: ActivatedRoute) {
  }

  selectedServer: Server;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null){
      this.selectedServer = {id: null, name: 'Nový server', url: null, date: null};
    } else {
      this.selectedServer = this.serverService.getServer(Number(id));
    }
  }

}
