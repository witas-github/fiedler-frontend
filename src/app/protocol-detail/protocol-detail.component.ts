import { Component, OnInit } from '@angular/core';
import { Protocol } from '../interfaces/protocol';


@Component({
  selector: 'app-protocol-detail',
  templateUrl: './protocol-detail.component.html',
  styleUrls: ['./protocol-detail.component.scss']
})
export class ProtocolDetailComponent implements OnInit {

  constructor() { }

  selectedProtocol: Protocol;

  ngOnInit(): void {
  }
  //
  onSelect(protocolId: number): void {
    // this.selectedProtocol = protocolId;
  }

}
