import { Injectable } from '@angular/core';
import { Server } from '../interfaces/server';
import { Observable, of } from 'rxjs';
import { Protocol } from '../interfaces/protocol';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private readonly configService: ConfigService, private readonly http: HttpClient) { }

  public  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(this.configService.getConfig().backendUrl + 'servers/').pipe(map((response: any) => response));
  }

  public getServer(id): Observable<Server> {
    return this.http.get<Server>(this.configService.getConfig().backendUrl + 'servers/' + id).pipe(map((response: any) => response));
  }

  public initServer(){
    const server: Server = { id: null, name: 'Nový protokol', url: null, date: new Date() };
    return server;
  }

}
