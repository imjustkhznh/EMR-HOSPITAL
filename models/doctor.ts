export enum Role {
  Doctor = 'doctor',
  Patient = 'patient',
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  role: Role.Doctor;
}