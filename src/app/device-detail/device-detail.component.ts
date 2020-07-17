import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Device } from '../interfaces/device';
import { ProtocolService } from '../services/protocol.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss'],
})
export class DeviceDetailComponent implements OnInit {

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private serverService: ServerService,
    private messageService: MessageService) {
  }

  selectedDevice: Device;
  form: FormGroup;

  ngOnInit(): void {
    this.setSelectedProtocol();
  }

  private createFrom() {
    this.form = new FormGroup({
      srn: new FormControl(this.selectedDevice.srn, Validators.required),
      activeServer: new FormControl(this.selectedDevice.activeServer.id, Validators.nullValidator),
      registeredServer: new FormControl(this.selectedDevice.registeredServer.id, Validators.nullValidator),
    });
  }

  private setSelectedProtocol() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.selectedDevice = DeviceService.empty();
      this.createFrom();
    } else {
      this.deviceService.getOne(id).subscribe((data: any) => {
        this.selectedDevice = data.data[0];
        this.createFrom();
      });
    }
  }


}
