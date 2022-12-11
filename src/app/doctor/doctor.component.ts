import {Component, OnInit} from '@angular/core';
import {ApiRequestsService} from "../services/api-requests.service";
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {DoctorModel} from "../interfaces/doctor.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogDoctorComponent} from "../dialog-doctor/dialog-doctor.component";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit{
  constructor(private apiRequestService: ApiRequestsService, public dialog: MatDialog) {
    this.hasChanges$.next(true);
  }
  displayedColumns: string[] = ['DoctorId', 'DoctorName', 'DoctorSpecialityName', 'Actions'];
  public gridData$!: Observable<DoctorModel[]>;

  private hasChanges$ = new BehaviorSubject(true);

  public form!: FormBuilder;


  deleteDoctor(doctorId: number) {
    this.apiRequestService.deleteDoctor(doctorId).subscribe(data => {
      this.hasChanges$.next(true);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDoctorComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apiRequestService.addDoctor(result).subscribe(data => {
          this.hasChanges$.next(true);
        })
      }
    });
  }


  openDialogUpdate(data: DoctorModel): void {
    const dialogRef = this.dialog.open(DialogDoctorComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apiRequestService.updateDoctor({ DoctorId: data.DoctorId,
          DoctorName: result.DoctorName,
          DoctorSpeciality: result.DoctorSpeciality
        }).subscribe(data => {
          this.hasChanges$.next(true);
        })
      }
    });
  }

  ngOnInit(): void {
    this.gridData$ = this.hasChanges$.pipe(
      switchMap(() => this.apiRequestService.getDoctors()),
    )
  }
}
