import { Injectable } from '@angular/core';
import { Protocols } from '../mock/mock-protocols';
import { Protocol } from '../interfaces/protocol';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor() { }

  public getProtocols(): Observable<Protocol[]> {
    return of(Protocols);
  }

  public getProtocol(id): Observable<Protocol> {
    return of(Protocols.find(x => x.id === id));
  }

  public initProtocol(){
    const protocol: Protocol = { id: null, name: 'Nový protokol', activeSrv: null, date: new Date() };
    return protocol;
  }

}
