import { IIdentifiable, ITimestamped } from './base';

export interface Prescription extends IIdentifiable, ITimestamped {
  medicalRecordId: string;
  doctorId?: string;
  medicine: string;
  dosage: string;
  duration?: string;
  frequency?: 'once' | 'twice' | 'thrice' | 'four-times';
  notes?: string;
}
