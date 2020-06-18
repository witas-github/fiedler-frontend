import { Injectable } from '@angular/core';
import { Protocols } from '../protocols/mock-protocols';
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


}
