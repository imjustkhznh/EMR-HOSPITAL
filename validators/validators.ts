import { Patient } from '../models/patient';
import { Doctor, Role } from '../models/doctor';
import { Prescription } from '../models/prescription';
import { MedicalRecord } from '../models/medicalrecord';

// Type Guards với validation logic

export function isValidId(id: any): id is string {
  return typeof id === 'string' && id.trim().length > 0;
}

export function isValidName(name: any): name is string {
  return typeof name === 'string' && name.trim().length > 0;
}

export function isValidAge(age: any): age is number {
  return typeof age === 'number' && age > 0 && age <= 150;
}

export function isValidGender(gender: any): gender is 'male' | 'female' | 'other' {
  return ['male', 'female', 'other'].includes(gender);
}

export function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

// ===== Type Guards for Models =====

export function validatePatient(data: any): data is Patient {
  if (!data || typeof data !== 'object') {
    throw new Error('Patient data must be an object');
  }

  if (!isValidId(data.id)) {
    throw new Error('Patient ID must be a non-empty string');
  }

  if (!isValidName(data.name)) {
    throw new Error('Patient name must be a non-empty string');
  }

  if (!isValidAge(data.age)) {
    throw new Error('Patient age must be a number between 1 and 150');
  }

  if (!isValidGender(data.gender)) {
    throw new Error('Patient gender must be male, female, or other');
  }

  if (data.diagnosis !== undefined && typeof data.diagnosis !== 'string') {
    throw new Error('Patient diagnosis must be a string if provided');
  }

  return true;
}

export function validateDoctor(data: any): data is Doctor {
  if (!data || typeof data !== 'object') {
    throw new Error('Doctor data must be an object');
  }

  if (!isValidId(data.id)) {
    throw new Error('Doctor ID must be a non-empty string');
  }

  if (!isValidName(data.name)) {
    throw new Error('Doctor name must be a non-empty string');
  }

  if (!isValidName(data.specialty)) {
    throw new Error('Doctor specialty must be a non-empty string');
  }

  if (data.role !== Role.Doctor) {
    throw new Error('Doctor role must be doctor');
  }

  return true;
}

export function validatePrescription(data: any): data is Prescription {
  if (!data || typeof data !== 'object') {
    throw new Error('Prescription data must be an object');
  }

  if (!isValidId(data.id)) {
    throw new Error('Prescription ID must be a non-empty string');
  }

  if (!isValidId(data.medicalRecordId)) {
    throw new Error('Prescription medicalRecordId must be a non-empty string');
  }

  if (!isValidName(data.medicine)) {
    throw new Error('Prescription medicine must be a non-empty string');
  }

  if (!isValidName(data.dosage)) {
    throw new Error('Prescription dosage must be a non-empty string');
  }

  if (data.duration !== undefined && typeof data.duration !== 'string') {
    throw new Error('Prescription duration must be a string if provided');
  }

  if (data.notes !== undefined && typeof data.notes !== 'string') {
    throw new Error('Prescription notes must be a string if provided');
  }

  if (!isValidDate(data.createdAt)) {
    throw new Error('Prescription createdAt must be a valid Date');
  }

  if (!isValidDate(data.updatedAt)) {
    throw new Error('Prescription updatedAt must be a valid Date');
  }

  return true;
}

export function validateMedicalRecord(data: any): data is MedicalRecord {
  if (!data || typeof data !== 'object') {
    throw new Error('MedicalRecord data must be an object');
  }

  if (!isValidId(data.id)) {
    throw new Error('MedicalRecord ID must be a non-empty string');
  }

  if (!isValidId(data.patientId)) {
    throw new Error('MedicalRecord patientId must be a non-empty string');
  }

  if (!isValidDate(data.date)) {
    throw new Error('MedicalRecord date must be a valid Date');
  }

  if (!isValidName(data.diagnosis)) {
    throw new Error('MedicalRecord diagnosis must be a non-empty string');
  }

  return true;
}

// Utility: Safe validation without throwing
export function isPatientValid(data: any): boolean {
  try {
    return validatePatient(data);
  } catch {
    return false;
  }
}

export function isDoctorValid(data: any): boolean {
  try {
    return validateDoctor(data);
  } catch {
    return false;
  }
}

export function isPrescriptionValid(data: any): boolean {
  try {
    return validatePrescription(data);
  } catch {
    return false;
  }
}

export function isMedicalRecordValid(data: any): boolean {
  try {
    return validateMedicalRecord(data);
  } catch {
    return false;
  }
}
