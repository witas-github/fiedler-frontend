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
    this.setSelectedProtocol();
  }

  private setSelectedProtocol() {
    const protocolId = this.route.snapshot.paramMap.get('protocolId');
    this.protocolService.getProtocol(protocolId).subscribe(protocol => this.selectedProtocol = protocol);
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

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    const device: any = this.deviceService.getBySrn(resultString);

    if (!this.selectedDevices.find(x => x.id === device.id)) {
      device.protocolId = this.selectedProtocol.id;
      this.selectedDevices.push(device);
      this.deviceService.addIntoList(device);
      this.messageService.add(device.srn + ' added into list');
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
