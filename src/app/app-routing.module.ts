import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtocolDetailComponent } from './protocol-detail/protocol-detail.component';
import { ProtocolsComponent } from './protocols/protocols.component';
import { ServersComponent } from './servers/servers.component';
import { ServerDetailComponent } from './server-detail/server-detail.component';


const routes: Routes = [
  { path: '',   redirectTo: 'protocols', pathMatch: 'full' },
  { path: 'protocol-detail/:id', component: ProtocolDetailComponent },
  { path: 'protocol-detail', component: ProtocolDetailComponent },
  { path: 'create-protocol', component: ProtocolDetailComponent },

  { path: 'server-detail/:id', component: ServerDetailComponent },
  { path: 'server-detail', component: ServerDetailComponent },
  { path: 'create-server', component: ServerDetailComponent },

  { path: 'protocols', component: ProtocolsComponent },
  { path: 'servers', component: ServersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
