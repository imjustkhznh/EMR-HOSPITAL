import { MedicalRecord } from '../models/medicalrecord';
import { IRepository } from './repository';
import { validateMedicalRecord } from '../validators/validation';

export class MedicalRecordService implements IRepository<MedicalRecord> {
  constructor(private records: MedicalRecord[]) {}

  getAll(): MedicalRecord[] {
    return this.records;
  }

  getById(id: string): MedicalRecord | undefined {
    return this.records.find(r => String(r.id) === String(id));
  }

  add(record: MedicalRecord): MedicalRecord[] {
    const result = validateMedicalRecord(record);
    if (!result.success) {
      throw new Error(result.error);
    }
    this.ensureRecordDoesNotExist(record.id);
    return this.appendRecord(record);
  }

  update(id: string, updates: Partial<MedicalRecord>): MedicalRecord[] {
    this.ensureRecordExists(id);
    return this.mapRecordUpdates(id, updates);
  }

  delete(id: string): MedicalRecord[] {
    this.ensureRecordExists(id);
    return this.filterOutRecord(id);
  }

  findByPatientId(patientId: string): MedicalRecord[] {
    return this.records.filter(r => r.patientId === patientId);
  }

  private ensureRecordDoesNotExist(id: string): void {
    if (this.records.some(r => String(r.id) === String(id))) {
      throw new Error(`Medical record with ID ${id} already exists`);
    }
  }

  private ensureRecordExists(id: string): void {
    if (!this.records.some(r => String(r.id) === String(id))) {
      throw new Error(`Medical record with ID ${id} not found`);
    }
  }

  private appendRecord(record: MedicalRecord): MedicalRecord[] {
    return [...this.records, { ...record, id: String(record.id) }];
  }

  private mapRecordUpdates(id: string, updates: Partial<MedicalRecord>): MedicalRecord[] {
    const idStr = String(id);
    return this.records.map(r =>
      String(r.id) === idStr ? { ...r, ...updates } : r
    );
  }

  private filterOutRecord(id: string): MedicalRecord[] {
    const idStr = String(id);
    return this.records.filter(r => String(r.id) !== idStr);
  }
}
