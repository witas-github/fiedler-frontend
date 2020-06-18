import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtocolDetailComponent } from './protocol-detail/protocol-detail.component';
import { ProtocolsComponent } from './protocols/protocols.component';


const routes: Routes = [
  { path: '',   redirectTo: 'protocols', pathMatch: 'full' },
  { path: 'protocol-detail/:id', component: ProtocolDetailComponent },
  { path: 'create-protocol', component: ProtocolDetailComponent },
  { path: 'protocols', component: ProtocolsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
