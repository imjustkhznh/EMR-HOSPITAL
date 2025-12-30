import { Doctor } from '../models/doctor';
import { IRepository } from './repository';
import { validateDoctor } from '../validators/validation';

export class DoctorService implements IRepository<Doctor> {
  constructor(private doctors: Doctor[]) {}

  getAll(): Doctor[] {
    return this.doctors;
  }

  getById(id: string): Doctor | undefined {
    return this.doctors.find(d => String(d.id) === String(id));
  }

  add(doctor: Doctor): Doctor[] {
    const result = validateDoctor(doctor);
    if (!result.success) {
      throw new Error(result.error);
    }
    this.ensureDoctorDoesNotExist(doctor.id);
    return this.appendDoctor(doctor);
  }

  update(id: string, updates: Partial<Doctor>): Doctor[] {
    this.ensureDoctorExists(id);
    return this.mapDoctorUpdates(id, updates);
  }

  delete(id: string): Doctor[] {
    this.ensureDoctorExists(id);
    return this.filterOutDoctor(id);
  }

  findBySpecialty(specialty: string): Doctor[] {
    return this.doctors.filter(d => d.specialty === specialty);
  }

  private ensureDoctorDoesNotExist(id: string): void {
    if (this.doctors.some(d => String(d.id) === String(id))) {
      throw new Error(`Doctor with ID ${id} already exists`);
    }
  }

  private ensureDoctorExists(id: string): void {
    if (!this.doctors.some(d => String(d.id) === String(id))) {
      throw new Error(`Doctor with ID ${id} not found`);
    }
  }

  private appendDoctor(doctor: Doctor): Doctor[] {
    return [...this.doctors, { ...doctor, id: String(doctor.id) }];
  }

  private mapDoctorUpdates(id: string, updates: Partial<Doctor>): Doctor[] {
    const idStr = String(id);
    return this.doctors.map(d =>
      String(d.id) === idStr ? { ...d, ...updates } : d
    );
  }

  private filterOutDoctor(id: string): Doctor[] {
    const idStr = String(id);
    return this.doctors.filter(d => String(d.id) !== idStr);
  }
}
