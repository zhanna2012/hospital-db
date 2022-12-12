import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DoctorModel, DoctorModelUpdate} from "../interfaces/doctor.model";
import {HttpClient} from "@angular/common/http";
import {SpecialityModel} from "../interfaces/speciality.model";
import {PatientModel} from "../interfaces/patient.model";
import {AppointmentModel, AppointmentModelUpdate} from "../interfaces/appointment.model";
import {HospitalRoomModel} from "../interfaces/hospital-room.model";

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

  getPatients() : Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(`${this.baseUrl}/Patient`)
  }

  addPatient(patient: PatientModel) : Observable<any> {
    return this.http.post(`${this.baseUrl}/Patient`, {...patient})
  }

  deletePatient(patientId: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/Patient/${patientId}`)
  }

  updatePatient(patient: PatientModel) : Observable<any> {
    return this.http.put(`${this.baseUrl}/Patient`, {...patient})
  }

  getAppointments() : Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(`${this.baseUrl}/Appointment`)
  }

  addAppointment(appointment: AppointmentModel) : Observable<any> {
    return this.http.post(`${this.baseUrl}/Appointment`, {...appointment})
  }

  deleteAppointment(appointmentId: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/Appointment/${appointmentId}`)
  }

  updateAppointment(appointment: AppointmentModelUpdate) : Observable<any> {
    return this.http.put(`${this.baseUrl}/Appointment`, {...appointment})
  }

  getRooms() : Observable<HospitalRoomModel[]> {
    return this.http.get<HospitalRoomModel[]>(`${this.baseUrl}/HospitalRoom`)
  }

}
