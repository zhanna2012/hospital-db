import {Component, OnInit} from '@angular/core';
import {ApiRequestsService} from "../services/api-requests.service";
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {DialogPatientComponent} from "../dialog-patient/dialog-patient.component";
import {PatientModel} from "../interfaces/patient.model";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit{
  constructor(private apiRequestService: ApiRequestsService, public dialog: MatDialog) {
    this.hasChanges$.next(true);
  }
  displayedColumns: string[] = ['PatientId', 'PatientName', 'PatientEmail', 'Actions'];
  public gridData$!: Observable<PatientModel[]>;

  private hasChanges$ = new BehaviorSubject(true);

  public form!: FormBuilder;


  deletePatient(patientId: number) {
    this.apiRequestService.deletePatient(patientId).subscribe(data => {
      this.hasChanges$.next(true);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPatientComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apiRequestService.addPatient(result).subscribe(data => {
          this.hasChanges$.next(true);
        })
      }
    });
  }


  openDialogUpdate(data: PatientModel): void {
    const dialogRef = this.dialog.open(DialogPatientComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apiRequestService.updatePatient({ PatientId: data.PatientId,
          PatientName: result.PatientName,
          PatientEmail: result.PatientEmail
        }).subscribe(data => {
          this.hasChanges$.next(true);
        })
      }
    });
  }

  ngOnInit(): void {
    this.gridData$ = this.hasChanges$.pipe(
      switchMap(() => this.apiRequestService.getPatients()),
    )
  }
}
