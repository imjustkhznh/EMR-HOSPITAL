import { Prescription } from '../models/prescription';
import { IRepository } from './repository';
import { validatePrescription } from '../validators/validation';

export class PrescriptionService implements IRepository<Prescription> {
  constructor(private prescriptions: Prescription[]) {}

  getAll(): Prescription[] {
    return this.prescriptions;
  }

  getById(id: string): Prescription | undefined {
    return this.prescriptions.find(p => String(p.id) === String(id));
  }

  add(prescription: Prescription): Prescription[] {
    const result = validatePrescription(prescription);
    if (!result.success) {
      throw new Error(result.error);
    }
    this.ensurePrescriptionDoesNotExist(prescription.id);
    return this.appendPrescription(prescription);
  }

  update(id: string, updates: Partial<Prescription>): Prescription[] {
    this.ensurePrescriptionExists(id);
    return this.mapPrescriptionUpdates(id, updates);
  }

  delete(id: string): Prescription[] {
    this.ensurePrescriptionExists(id);
    return this.filterOutPrescription(id);
  }

  findByMedicalRecordId(medicalRecordId: string): Prescription[] {
    return this.prescriptions.filter(p => p.medicalRecordId === medicalRecordId);
  }

  private ensurePrescriptionDoesNotExist(id: string): void {
    if (this.prescriptions.some(p => String(p.id) === String(id))) {
      throw new Error(`Prescription with ID ${id} already exists`);
    }
  }

  private ensurePrescriptionExists(id: string): void {
    if (!this.prescriptions.some(p => String(p.id) === String(id))) {
      throw new Error(`Prescription with ID ${id} not found`);
    }
  }

  private appendPrescription(prescription: Prescription): Prescription[] {
    return [...this.prescriptions, { ...prescription, id: String(prescription.id) }];
  }

  private mapPrescriptionUpdates(id: string, updates: Partial<Prescription>): Prescription[] {
    const idStr = String(id);
    return this.prescriptions.map(p =>
      String(p.id) === idStr ? { ...p, ...updates } : p
    );
  }

  private filterOutPrescription(id: string): Prescription[] {
    const idStr = String(id);
    return this.prescriptions.filter(p => String(p.id) !== idStr);
  }
}
