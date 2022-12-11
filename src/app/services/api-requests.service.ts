import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DoctorModel, DoctorModelUpdate} from "../interfaces/doctor.model";
import {HttpClient} from "@angular/common/http";
import {SpecialityModel} from "../interfaces/speciality.model";

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  baseUrl = 'http://localhost:5103/api'

  constructor(private http: HttpClient) { }

  getDoctors() : Observable<DoctorModel[]> {
    return this.http.get<DoctorModel[]>(`${this.baseUrl}/Doctor`)
  }

  addDoctor(doctor: DoctorModel) : Observable<any> {
    return this.http.post(`${this.baseUrl}/Doctor`, {...doctor})
  }

  deleteDoctor(doctorId: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/Doctor/${doctorId}`)
  }

  updateDoctor(doctor: DoctorModelUpdate) : Observable<any> {
    return this.http.put(`${this.baseUrl}/Doctor`, {...doctor})
  }

  getSpecialities() :Observable<SpecialityModel[]> {
    return this.http.get<SpecialityModel[]>(`${this.baseUrl}/DoctorSpeciality`)
  }

}
