import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { KlientComponent } from './klient/klient.component';
import { SamochodyComponent } from './samochody/samochody.component';
import { AppRoutingModule } from './app-routing.module';
import { SamochodySzczegolyComponent } from './samochody-szczegoly/samochody-szczegoly.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    KlientComponent,
    SamochodyComponent,
    SamochodySzczegolyComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
