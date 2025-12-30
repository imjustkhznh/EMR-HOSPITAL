import { IIdentifiable, IPersonInfo } from './base';

export enum Role {
  Doctor = 'doctor',
  Patient = 'patient',
}

export interface Doctor extends IIdentifiable, IPersonInfo {
  specialty: string;
  role: Role.Doctor;
}