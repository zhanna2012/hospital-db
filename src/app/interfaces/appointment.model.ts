export interface AppointmentModel {
  AppointmentId: number,
  AppointmentDate: string,
  AppointmentStartTime: string,
  AppointmentEndTime: string,
  DoctorName: string,
  PatientName: string,
  AppointmentRoomNumber: number
}

export interface AppointmentModelUpdate {
  AppointmentId: number,
  AppointmentDate: string,
  AppointmentStartTime: string,
  AppointmentEndTime: string,
  AppointmentDoctorId: number,
  AppointmentPatientId: number,
  AppointmentRoomNumber: number
}

