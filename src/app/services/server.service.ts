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

  public getAll(): Observable<Server[]> {
    return this.http.get<Server[]>(this.configService.getConfig().backendUrl + 'servers/');
  }

  public getOne(id): Observable<Server> {
    return this.http.get<Server>(this.configService.getConfig().backendUrl + 'servers/' + id);
  }

  public update(id, values: any){
    return this.http.patch(this.configService.getConfig().backendUrl + 'servers/' + id, values)
  }

  public create(values: any){
    return this.http.post(this.configService.getConfig().backendUrl + 'servers/', values);
  }

  static empty(){
    return new class implements Server {
      date: any;
      id: string;
      name: string;
      url: string;
    };
  }

}
