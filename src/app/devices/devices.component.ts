import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { Protocol } from '../interfaces/protocol';
import { ProtocolService } from '../services/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { BarcodeFormat, Result } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Device } from '../interfaces/device';
import { DeviceService } from '../services/device.service';
import { MessageService } from '../services/message.service';
import { MessageList } from '../messages/messages.list';
import { Server } from '../interfaces/server';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  constructor(
    private protocolService: ProtocolService,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private messageService: MessageService,
  ) {
  }

  scanner: ZXingScannerComponent;
  selectedProtocol: Protocol;
  selectedDevices: Device[] = [];

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  ngOnInit(): void {
    const protocolId = this.route.snapshot.paramMap.get('protocolId');
    this.setSelectedProtocol(protocolId);
    this.setSelectedDevices(protocolId);
  }

  private setSelectedProtocol(protocolId: string) {
    this.protocolService.getOne(protocolId).subscribe((data: any) => {
      this.selectedProtocol = data.data[0];
    });
  }

  private setSelectedDevices(protocolId: any) {
    this.deviceService.getByProtocol(protocolId).subscribe((data: any) => {
      this.selectedDevices = data.data;
    });
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);

    devices.forEach((device) => {
      if (device.label.includes('back') || device.label.includes('1') || device.label.includes('rear')) {
        this.currentDevice = device;
      }
    });

    if (this.currentDevice == null) {
      this.currentDevice = devices[0];
    }

  }

  private createDevice(srn: string){
    return new class implements Device {
      activeServer: Server;
      createdAt: Date = new Date();
      id: number;
      protocol: Protocol;
      registeredServer: Server;
      srn: string = srn;
      state: number = 0;
    };
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;

    const device: Device = this.createDevice(resultString);

    if (!this.selectedDevices.find(x => x.srn === device.srn)) {
      device.protocol = this.selectedProtocol;
      device.registeredServer = this.selectedProtocol.registeredServer;

      this.selectedDevices.push(device);
      this.deviceService.create({
        srn:device.srn,
        registeredServer:device.registeredServer.id,
        state:device.state,
        activeServer:null,
        protocol:device.protocol.id
      }).subscribe(
        data => this.messageService.add(MessageList.saved,'success'),
        error => console.log(error.error),
      );

      console.log(device);
      console.log(this.selectedDevices);

      this.messageService.add(device.srn + ' added into list', 'success');
    }else{
      this.messageService.add(device.srn + ' is already on list', 'danger');
    }

    //console.log(this.selectedDevices);

  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

}
