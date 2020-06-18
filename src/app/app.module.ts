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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProtocolsComponent,
    ProtocolDetailComponent,
    MessagesComponent,
    TopNavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}


