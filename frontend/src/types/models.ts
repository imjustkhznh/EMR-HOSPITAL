// Shared interfaces giữa backend và frontend

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  address: string;
  diagnosis?: string;
  medicalRecordIds?: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  role: 'doctor' | 'patient';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId?: string;
  date: Date;
  diagnosis: string;
  prescriptionIds?: string[];
  notes?: string;
}

export interface Prescription {
  id: string;
  medicalRecordId: string;
  doctorId?: string;
  medicine: string;
  dosage: string;
  duration?: string;
  frequency?: 'once' | 'twice' | 'thrice' | 'four-times';
  notes?: string;
}
