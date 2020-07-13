import { Injectable } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { Observable, of } from 'rxjs';
import { Device } from '../interfaces/device';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getProtocols(): Observable<Protocol[]> {
    //return of(Protocols);
    return this.http.get<Protocol[]>(this.configService.getConfig().backendUrl + 'protocols/').pipe(map((response: any) => response));
  }

  public getProtocol(id): Observable<Protocol> {
    //return of(Protocols.find(x => x.id === id));
    return this.http.get<Protocol>(this.configService.getConfig().backendUrl + 'protocols/' + id).pipe(map((response: any) => response));
  }

  public initProtocol(){
    const protocol: Protocol = { _id: null, name: 'Nový protokol', activeSrv: null, date: new Date() };
    return protocol;
  }

}
