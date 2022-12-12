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
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { DoctorComponent } from './doctor/doctor.component';
import { ApiRequestsService } from "./services/api-requests.service";
import { HttpClientModule } from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import { DialogDoctorComponent } from './dialog-doctor/dialog-doctor.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { PatientComponent } from './patient/patient.component';
import { DialogPatientComponent } from './dialog-patient/dialog-patient.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DialogAppointmentComponent } from './dialog-appointment/dialog-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    DoctorComponent,
    DialogDoctorComponent,
    PatientComponent,
    DialogPatientComponent,
    AppointmentComponent,
    DialogAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [ApiRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
