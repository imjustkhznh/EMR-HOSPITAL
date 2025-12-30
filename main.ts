import { Patient } from './models/patient';
import { Doctor, Role } from './models/doctor';
import { Prescription } from './models/prescription';
import { MedicalRecord } from './models/medicalrecord';
import patientsData from './patient-data';
import { PatientService } from './services/patient.service';
import { DoctorService } from './services/doctor.service';
import { PrescriptionService } from './services/prescription.service';
import { MedicalRecordService } from './services/medicalrecord.service';
import { IRepository } from './services/repository';

// ===== SOLID Principles Applied =====

// MedicalRecord model definition with proper typing
type MedicalRecordShortView = Pick<MedicalRecord, 'id' | 'date'>;

// ===== Dependency Injection Container (DIP) =====
class EMRSystem {
  private patientService: PatientService;
  private doctorService: DoctorService;
  private prescriptionService: PrescriptionService;
  private medicalRecordService: MedicalRecordService;

  constructor(
    patientService: PatientService,
    doctorService: DoctorService,
    prescriptionService: PrescriptionService,
    medicalRecordService: MedicalRecordService
  ) {
    this.patientService = patientService;
    this.doctorService = doctorService;
    this.prescriptionService = prescriptionService;
    this.medicalRecordService = medicalRecordService;
  }

  getPatientService(): IRepository<Patient> {
    return this.patientService;
  }

  getDoctorService(): IRepository<Doctor> {
    return this.doctorService;
  }

  getPrescriptionService(): IRepository<Prescription> {
    return this.prescriptionService;
  }

  getMedicalRecordService(): IRepository<MedicalRecord> {
    return this.medicalRecordService;
  }

  findDoctorBySpecialty(specialty: string): Doctor[] {
    return this.doctorService.findBySpecialty(specialty);
  }

  findPrescriptionsByMedicalRecord(medicalRecordId: string): Prescription[] {
    return this.prescriptionService.findByMedicalRecordId(medicalRecordId);
  }

  findMedicalRecordsByPatient(patientId: string): MedicalRecord[] {
    return this.medicalRecordService.findByPatientId(patientId);
  }
}

// ===== Initialize Services =====
function initializeServices(): EMRSystem {
  const patientService = new PatientService(patientsData);
  const doctorService = new DoctorService(getInitialDoctors());
  const prescriptionService = new PrescriptionService(getInitialPrescriptions());
  const medicalRecordService = new MedicalRecordService(getInitialMedicalRecords());
  
  return new EMRSystem(patientService, doctorService, prescriptionService, medicalRecordService);
}

function getInitialDoctors(): Doctor[] {
  return [
    { id: 'd1', name: 'Dr. Trần A', specialty: 'Cardiology', role: Role.Doctor },
    { id: 'd2', name: 'Dr. Lê B', specialty: 'Neurology', role: Role.Doctor },
  ];
}

function getInitialPrescriptions(): Prescription[] {
  return [
    {
      id: 'p1',
      medicalRecordId: 'mr1',
      medicine: 'Aspirin',
      dosage: '100mg',
      duration: '7 days',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

function getInitialMedicalRecords(): MedicalRecord[] {
  return [
    {
      id: 'mr1',
      patientId: '1',
      date: new Date(),
      diagnosis: 'Fever',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

const emrSystem = initializeServices();

// ===== Example Usage with Clean Code =====
function displayHeader(): void {
  console.log('=== EMR System - Clean Code Principles ===\n');
}

function displayAllPatients(): void {
  const patients = emrSystem.getPatientService().getAll();
  console.log('Patients:', patients);
}

function tryAddPatient(): void {
  const newPatient: Patient = {
    id: '4',
    name: 'Phạm Văn D',
    age: 35,
    gender: 'male',
    diagnosis: 'High Blood Pressure',
  };

  try {
    const updated = emrSystem.getPatientService().add(newPatient);
    console.log('\nAfter adding patient:', updated);
  } catch (error: any) {
    console.error('Error adding patient:', error.message);
  }
}

function displayDoctorsBySpecialty(): void {
  const cardiology = emrSystem.findDoctorBySpecialty('Cardiology');
  console.log('\nDoctors - Cardiology:', cardiology);
}

function displayPrescriptionsByRecord(): void {
  const prescriptions = emrSystem.findPrescriptionsByMedicalRecord('mr1');
  console.log('\nPrescriptions for mr1:', prescriptions);
}

function displayMedicalRecordsByPatient(): void {
  const records = emrSystem.findMedicalRecordsByPatient('1');
  console.log('\nMedical records for patient 1:', records);
}

function tryUpdatePatient(): void {
  try {
    const updated = emrSystem.getPatientService().update('1', { diagnosis: 'Treated Fever' });
    console.log('\nAfter updating patient:', updated);
  } catch (error: any) {
    console.error('Error updating patient:', error.message);
  }
}

displayHeader();
displayAllPatients();
tryAddPatient();
displayDoctorsBySpecialty();
displayPrescriptionsByRecord();
displayMedicalRecordsByPatient();
tryUpdatePatient();