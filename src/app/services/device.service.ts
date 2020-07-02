import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../interfaces/device';
import { Devices } from '../mock/mock-devices';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  public getDevices(): Observable<Device[]> {
    return of(Devices);
  }

  public getDevice(id): Device {
    return Devices.find(device => device.id === id);
  }

  public getByProtocol(id): Observable<Device[]> {
    return of(Devices.filter(device => device.protocolId === id));
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
