import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../interfaces/device';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Server } from '../interfaces/server';
import { Protocol } from '../interfaces/protocol';
import { ServerService } from './server.service';
import { ProtocolService } from './protocol.service';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  postId: any;

  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getAll(): Observable<Device[]> {
    return this.http.get<Device>(this.configService.getConfig().backendUrl + 'devices/').pipe(map((response: any) => response));
  }

  public getOne(id): Observable<Device> {
    return this.http.get<Device>(this.configService.getConfig().backendUrl + 'devices/' + id).pipe(map((response: any) => response));
  }

  public getByProtocol(id): Observable<Device[]> {
    return this.http.get<Device[]>(this.configService.getConfig().backendUrl + 'devices/protocol/' + id).pipe(map((response: any) => response));
  }

  public getBySrn(id): Observable<Device> {
    return this.http.get<Device>(this.configService.getConfig().backendUrl + 'devices/srn' + id).pipe(map((response: any) => response));
  }

  // public addIntoList(device: Device){
  //   const headers = { 'Content-Type': 'application/json' };
  //   console.log(device);
  //   //const body = device;
  //
  //   this.http.post<any>(this.configService.getConfig().backendUrl + 'devices', device, { headers }).subscribe(data => {
  //     this.postId = data.id;
  //   })
  // }

  public update(id, values: any){
    return this.http.patch(this.configService.getConfig().backendUrl + 'devices/' + id, values)
  }

  public create(values: any){
    return this.http.post(this.configService.getConfig().backendUrl + 'devices/', values);
  }

  static empty(){
    return new class implements Device{
      activeServer: Server = ServerService.empty();
      createdAt: Date;
      id: number;
      protocol: Protocol = ProtocolService.empty();
      registeredServer: Server = ServerService.empty();
      srn: string;
      state: number;
    }
  }

}
