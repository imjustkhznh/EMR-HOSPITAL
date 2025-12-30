import { IIdentifiable, ITimestamped } from './base';

export interface MedicalRecord extends IIdentifiable, ITimestamped {
  patientId: string;
  doctorId?: string;
  date: Date;
  diagnosis: string;
  prescriptionIds?: string[];
  notes?: string;
}
