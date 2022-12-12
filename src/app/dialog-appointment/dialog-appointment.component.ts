import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiRequestsService} from "../services/api-requests.service";
import {DoctorModel} from "../interfaces/doctor.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointmentModel} from "../interfaces/appointment.model";
import {PatientModel} from "../interfaces/patient.model";
import {forkJoin} from "rxjs";
import {HospitalRoomModel} from "../interfaces/hospital-room.model";

@Component({
  selector: 'app-dialog-appointment',
  templateUrl: './dialog-appointment.component.html',
  styleUrls: ['./dialog-appointment.component.scss']
})
export class DialogAppointmentComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogAppointmentComponent>,
    private apiRequestService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentModel,
  ) {}

  public form!: FormGroup;

  doctors!: DoctorModel[];
  patients!: PatientModel[];
  rooms!: HospitalRoomModel[];



  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      AppointmentDate: new FormControl(null, [Validators.required]),
      AppointmentStartTime: new FormControl(null, [Validators.required]),
      AppointmentEndTime: new FormControl(null, [Validators.required]),
      AppointmentDoctorId: new FormControl(null, [Validators.required]),
      AppointmentPatientId: new FormControl(null, [Validators.required]),
      AppointmentRoomNumber: new FormControl(null, [Validators.required]),
    });

    forkJoin({
      doctors: this.apiRequestService.getDoctors(),
      patients: this.apiRequestService.getPatients(),
      rooms: this.apiRequestService.getRooms()
    }).subscribe(data => {
      this.doctors = data.doctors;
      this.patients = data.patients;
      this.rooms = data.rooms;
      if(this.data) {
        this.form.patchValue({
          AppointmentDate: this.data.AppointmentDate.substring(0,10),
          AppointmentStartTime: this.data.AppointmentStartTime,
          AppointmentEndTime: this.data.AppointmentEndTime,
          AppointmentDoctorId: this.doctors.find(item => item.DoctorName === this.data.DoctorName)?.DoctorId ?? 1,
          AppointmentPatientId: this.patients.find(item => item.PatientName === this.data.PatientName)?.PatientId ?? 1,
          AppointmentRoomNumber: this.rooms.find(item => item.HospitalRoomNumber === this.data.AppointmentRoomNumber)?.HospitalRoomNumber ?? 1
        });
        console.log(this.form.getRawValue())
      }
    })

  }
}
