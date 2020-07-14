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
    return this.http.get<Protocol[]>(this.configService.getConfig().backendUrl + 'protocols/');
  }

  public getProtocol(id): Observable<Protocol> {
    return this.http.get<Protocol>(this.configService.getConfig().backendUrl + 'protocols/' + id);
  }

  public initProtocol(){
    const protocol: Protocol = { id: null, name: 'Nový protokol', activeServer: null, date: new Date() };
    return protocol;
  }

}
