import { Patient } from '../models/patient';
import { IRepository } from './repository';
import { validatePatient } from '../validators/validation';

export class PatientService implements IRepository<Patient> {
  constructor(private patients: Patient[]) {}

  getAll(): Patient[] {
    return this.patients;
  }

  getById(id: string): Patient | undefined {
    return this.patients.find(p => String(p.id) === String(id));
  }

  add(patient: Patient): Patient[] {
    const result = validatePatient(patient);
    if (!result.success) {
      throw new Error(result.error);
    }
    this.ensurePatientDoesNotExist(patient.id);
    return this.appendPatient(patient);
  }

  update(id: string, updates: Partial<Patient>): Patient[] {
    this.ensurePatientExists(id);
    return this.mapPatientUpdates(id, updates);
  }

  delete(id: string): Patient[] {
    this.ensurePatientExists(id);
    return this.filterOutPatient(id);
  }

  private ensurePatientDoesNotExist(id: string): void {
    if (this.patients.some(p => String(p.id) === String(id))) {
      throw new Error(`Patient with ID ${id} already exists`);
    }
  }

  private ensurePatientExists(id: string): void {
    if (!this.patients.some(p => String(p.id) === String(id))) {
      throw new Error(`Patient with ID ${id} not found`);
    }
  }

  private appendPatient(patient: Patient): Patient[] {
    return [...this.patients, { ...patient, id: String(patient.id) }];
  }

  private mapPatientUpdates(id: string, updates: Partial<Patient>): Patient[] {
    const idStr = String(id);
    return this.patients.map(p =>
      String(p.id) === idStr ? { ...p, ...updates } : p
    );
  }

  private filterOutPatient(id: string): Patient[] {
    const idStr = String(id);
    return this.patients.filter(p => String(p.id) !== idStr);
  }
}
