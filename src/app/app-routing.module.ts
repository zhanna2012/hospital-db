import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from "./doctor/doctor.component";
import { PatientComponent } from "./patient/patient.component";
import { AppointmentComponent } from "./appointment/appointment.component";

const routes: Routes = [
  { path: '', component: DoctorComponent},
  { path: 'doctors', component: DoctorComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'appointment', component: AppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
