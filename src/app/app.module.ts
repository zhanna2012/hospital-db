import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
