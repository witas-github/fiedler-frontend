import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from './protocol.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-protocol-detail',
  templateUrl: './protocol-detail.component.html',
  styleUrls: ['./protocol-detail.component.scss'],
})
export class ProtocolDetailComponent implements OnInit {

  constructor(private protocolService: ProtocolService, private route: ActivatedRoute) {
  }

  selectedProtocol: Protocol;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null){
      this.selectedProtocol = {id: null, name: 'Nový protokol', activeSrv: null, date: null};
    } else {
      this.selectedProtocol = this.getProtocol(Number(id));
    }
  }

  getProtocol(protocolId: number): Protocol {
    return this.protocolService.getProtocol(protocolId);
  }

}
