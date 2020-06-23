import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProtocolsComponent } from './protocols/protocols.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProtocolDetailComponent } from './protocol-detail/protocol-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServersComponent } from './servers/servers.component';
import { ServerDetailComponent } from './server-detail/server-detail.component';
import { DevicesComponent } from './devices/devices.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    ProtocolsComponent,
    ProtocolDetailComponent,
    MessagesComponent,
    TopNavigationComponent,
    ServersComponent,
    ServerDetailComponent,
    DevicesComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ZXingScannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}


