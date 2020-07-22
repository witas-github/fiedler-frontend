import { Injectable } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { Observable, of } from 'rxjs';
import { Device } from '../interfaces/device';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Server } from '../interfaces/server';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getAll(): Observable<Protocol[]> {
    return this.http.get<Protocol[]>(this.configService.getConfig().backendUrl + 'protocols/');
  }

  public getOne(id): Observable<Protocol> {
    return this.http.get<Protocol>(this.configService.getConfig().backendUrl + 'protocols/' + id);
  }

  public update(id, values: any){
    return this.http.patch(this.configService.getConfig().backendUrl + 'protocols/' + id, values)
  }

  public create(values: any){
    return this.http.post(this.configService.getConfig().backendUrl + 'protocols/', values);
  }

  public delete(id){

  }

  static empty(){
    return new class implements Protocol {
      id: string;
      name: string;
      activeServer: Server;
      registeredServer: Server;
      createdAt: Date;
    };
  }

}
