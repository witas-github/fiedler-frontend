import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../interfaces/device';
import { Devices } from '../mock/mock-devices';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  devices: any;


  constructor(private configService: ConfigService, private http: HttpClient
  ) { }

  public getDevices(): Observable<Device[]> {
    return of(Devices);
  }

  public getDevice(id): Device {
    return Devices.find(device => device.id === id);
  }


  public getByProtocol(id): Observable<Device[]> {

    return this.http.get<Device[]>(this.configService.getConfig().backendUrl + 'devices/' + id).pipe(map((response: any) => response));

    //return of(this.http.get(this.configService.getConfig().backendUrl + '/devices'));
    //return of(Devices.filter(device => device.protocolId === id));
  }

  public getBySrn(srn): Device {
    return Devices.find(device => device.srn === srn);
  }

  public initDevice(){
    // const device: Device = { id: null, name: 'Nový protokol', activeSrv: null, date: new Date() };
    // return device;
  }

  public addIntoList(device: Device){
    Devices.push(device);
  }

}
