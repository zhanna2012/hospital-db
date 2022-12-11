import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientModel} from "../interfaces/patient.model";

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.scss']
})
export class DialogPatientComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientModel,
  ) {}

  public form!: FormGroup;


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      PatientName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      PatientEmail: new FormControl('', [Validators.required, Validators.email]),
    });

    if(this.data) {
      this.form.patchValue({
        PatientName: this.data.PatientName,
        PatientEmail: this.data.PatientEmail
      })
    }
  }
}
