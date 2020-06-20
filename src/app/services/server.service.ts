import { Injectable } from '@angular/core';
import { Servers } from '../mock/mock-servers';
import { Server } from '../interfaces/server';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() { }

  public getServers(): Observable<Server[]> {
    return of(Servers);
  }

  public getServer(id): Server {
    return Servers.find(x => x.id === id);
  }

  public initServer(){
    const server: Server = { id: null, name: 'Nový protokol', url: null, date: new Date() };
    return server;
  }

}
