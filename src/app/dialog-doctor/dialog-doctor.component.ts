import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiRequestsService} from "../services/api-requests.service";
import {SpecialityModel} from "../interfaces/speciality.model";
import {DoctorModel} from "../interfaces/doctor.model";

@Component({
  selector: 'app-dialog-doctor',
  templateUrl: './dialog-doctor.component.html',
  styleUrls: ['./dialog-doctor.component.scss']
})
export class DialogDoctorComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogDoctorComponent>,
    private apiRequestService: ApiRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: DoctorModel,
  ) {}

  public form!: FormGroup;

  specialities!: SpecialityModel[];


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      DoctorName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      DoctorSpeciality: new FormControl(1, [Validators.required]),
    });

    this.apiRequestService.getSpecialities().subscribe(data => {
      this.specialities = data;
      if(this.data) {
        this.form.patchValue({
          DoctorName: this.data.DoctorName,
          DoctorSpeciality: this.specialities.find(item => item.DoctorSpecialityName === this.data.DoctorSpecialityName)?.DoctorSpecialityId ?? 1
        })
      }
    })

  }
}
