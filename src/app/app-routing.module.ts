import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtocolDetailComponent } from './protocol-detail/protocol-detail.component';
import { ProtocolsComponent } from './protocols/protocols.component';
import { ServersComponent } from './servers/servers.component';
import { ServerDetailComponent } from './server-detail/server-detail.component';
import { DevicesComponent } from './devices/devices.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';


const routes: Routes = [
  { path: '',   redirectTo: 'protocols', pathMatch: 'full' },
  { path: 'protocol-detail/:id', component: ProtocolDetailComponent },
  { path: 'create-protocol', component: ProtocolDetailComponent },

  { path: 'server-detail/:id', component: ServerDetailComponent },
  { path: 'create-server', component: ServerDetailComponent },

  { path: 'device-detail/:id', component: DeviceDetailComponent },
  { path: 'create-device/:protocolId', component: DeviceDetailComponent },
  { path: 'create-device', component: DeviceDetailComponent },

  { path: 'protocols', component: ProtocolsComponent },
  { path: 'servers', component: ServersComponent },
  { path: 'devices/protocol/:protocolId', component: DevicesComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
