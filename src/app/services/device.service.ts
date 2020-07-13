import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../interfaces/device';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  postId: any;

  constructor(private configService: ConfigService, private http: HttpClient) { }

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device>(this.configService.getConfig().backendUrl + 'devices/').pipe(map((response: any) => response));
  }

  public getDevice(id): Observable<Device> {
    return this.http.get<Device>(this.configService.getConfig().backendUrl + 'devices/' + id).pipe(map((response: any) => response));
  }

  public getByProtocol(id): Observable<Device[]> {
    return this.http.get<Device[]>(this.configService.getConfig().backendUrl + 'devices/protocol/' + id).pipe(map((response: any) => response));
  }

  public getBySrn(id): Observable<Device> {
    return this.http.get<Device>(this.configService.getConfig().backendUrl + 'devices/srn' + id).pipe(map((response: any) => response));
  }

  public addIntoList(device: Device){
    const headers = { 'Content-Type': 'application/json' };
    console.log(device);
    //const body = device;

    this.http.post<any>(this.configService.getConfig().backendUrl + 'devices', device, { headers }).subscribe(data => {
      this.postId = data.id;
    })
  }

}
