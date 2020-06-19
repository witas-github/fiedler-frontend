import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from './protocol.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../server-detail/server.service';
import { Server } from '../interfaces/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-protocol-detail',
  templateUrl: './protocol-detail.component.html',
  styleUrls: ['./protocol-detail.component.scss'],
})
export class ProtocolDetailComponent implements OnInit {

  constructor(private protocolService: ProtocolService, private route: ActivatedRoute, private serverService: ServerService) {
  }

  get f() {
    return this.form.controls;
  }

  selectedProtocol: Protocol;
  servers: Server[];
  form = new FormGroup({
    protocolName: new FormControl('', Validators.required),
    protocolServer: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getServers();
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.selectedProtocol = {id: null, name: 'Nový protokol', activeSrv: null, date: null};
    } else {
      this.selectedProtocol = this.protocolService.getProtocol(Number(id));
    }
  }

  public getServers(){
    this.serverService.getServers().subscribe(server => this.servers = server);
  }

  submit() {
    console.log(this.form.value);
  }

}
