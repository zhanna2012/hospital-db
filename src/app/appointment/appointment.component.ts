import {Component, OnInit} from '@angular/core';
import {ApiRequestsService} from "../services/api-requests.service";
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {AppointmentModel} from "../interfaces/appointment.model";
import {DialogAppointmentComponent} from "../dialog-appointment/dialog-appointment.component";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent  implements OnInit {
  constructor(private apiRequestService: ApiRequestsService, public dialog: MatDialog) {
    this.hasChanges$.next(true);
  }
  displayedColumns: string[] = ['AppointmentId',
    'AppointmentDate',
    'AppointmentStartTime',
    'AppointmentEndTime',
    'DoctorName',
    'PatientName',
    'AppointmentRoomNumber',
    'Actions'];
  public gridData$!: Observable<AppointmentModel[]>;

  private hasChanges$ = new BehaviorSubject(true);

  public form!: FormBuilder;


  deleteAppointment(appointmentId: number) {
    this.apiRequestService.deleteAppointment(appointmentId).subscribe(data => {
      this.hasChanges$.next(true);
    })
  }

  formatTime(time: string) {
    return time.substring(0, 5);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAppointmentComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apiRequestService.addAppointment(result).subscribe(data => {
          this.hasChanges$.next(true);
        })
      }
    });
  }


  openDialogUpdate(data: AppointmentModel): void {
    const dialogRef = this.dialog.open(DialogAppointmentComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apiRequestService.updateAppointment({ AppointmentId: data.AppointmentId, ...result
        }).subscribe(data => {
          this.hasChanges$.next(true);
        })
      }
    });
  }

  ngOnInit(): void {
    this.gridData$ = this.hasChanges$.pipe(
      switchMap(() => this.apiRequestService.getAppointments()),
    )
  }
}
