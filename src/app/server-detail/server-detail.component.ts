import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Server } from '../interfaces/server';
import { ServerService } from '../services/server.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.scss']
})
export class ServerDetailComponent implements OnInit {

  constructor(private serverService: ServerService, private route: ActivatedRoute) {
  }

  get f() {
    return this.form.controls;
  }

  selectedServer: Server;
  form = new FormGroup({
    serverName: new FormControl('', Validators.required),
    serverUrl: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null){
      this.selectedServer = {id: null, name: 'Nový server', url: null, date: null};
    } else {
      this.selectedServer = this.serverService.getServer(Number(id));
    }
  }

  submit() {
    console.log(this.form.value);
  }

}
