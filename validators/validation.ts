// Error class for validation failures
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Result type for safe validation
export type ValidationResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// Base validators
export function isValidId(id: any): id is string {
  return typeof id === 'string' && id.trim().length > 0;
}

export function isValidName(name: any): name is string {
  return typeof name === 'string' && name.trim().length > 2;
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

export function isValidArray<T>(arr: any, validator: (item: any) => boolean): arr is T[] {
  return Array.isArray(arr) && arr.every(validator);
}

export function isValidDosage(dosage: any): dosage is string {
  return typeof dosage === 'string' && /^\d+\s*(mg|g|ml|unit|mcg)$/i.test(dosage.trim());
}

export function isValidFrequency(freq: any): freq is 'once' | 'twice' | 'thrice' | 'four-times' {
  return ['once', 'twice', 'thrice', 'four-times'].includes(freq);
}

// Safe validation helpers
export function safeTrim(value: string): string {
  return value?.trim() ?? '';
}

export function validateStringLength(value: string, min: number, max: number): boolean {
  const trimmed = safeTrim(value);
  return trimmed.length >= min && trimmed.length <= max;
}

// Error messages
const ErrorMessages = {
  INVALID_ID: (id: any) => `Invalid ID: "${id}" must be a non-empty string`,
  INVALID_NAME: (name: any) => `Invalid name: "${name}" must be a string with at least 2 characters`,
  INVALID_AGE: (age: any) => `Invalid age: "${age}" must be a number between 1 and 150`,
  INVALID_GENDER: (gender: any) => `Invalid gender: "${gender}" must be "male", "female", or "other"`,
  INVALID_DATE: (date: any) => `Invalid date: "${date}" must be a valid Date object`,
  INVALID_DOSAGE: (dosage: any) => `Invalid dosage: "${dosage}" must match format like "100mg"`,
  INVALID_FREQUENCY: (freq: any) => `Invalid frequency: "${freq}" must be "once", "twice", "thrice", or "four-times"`,
  NOT_OBJECT: (type: string) => `Invalid ${type}: must be an object`,
  MISSING_FIELD: (field: string, type: string) => `Missing required field "${field}" in ${type}`,
};

// Type Guards for Models
export function validatePatient(data: any): ValidationResult<any> {
  try {
    if (!data || typeof data !== 'object') {
      throw new ValidationError(ErrorMessages.NOT_OBJECT('Patient'));
    }

    if (!isValidId(data.id)) {
      throw new ValidationError(ErrorMessages.INVALID_ID(data.id));
    }

    if (!isValidName(data.name)) {
      throw new ValidationError(ErrorMessages.INVALID_NAME(data.name));
    }

    if (!isValidAge(data.age)) {
      throw new ValidationError(ErrorMessages.INVALID_AGE(data.age));
    }

    if (!isValidGender(data.gender)) {
      throw new ValidationError(ErrorMessages.INVALID_GENDER(data.gender));
    }

    if (data.diagnosis !== undefined && typeof data.diagnosis !== 'string') {
      throw new ValidationError('Patient diagnosis must be a string if provided');
    }

    if (data.medicalRecordIds !== undefined && !isValidArray(data.medicalRecordIds, isValidId)) {
      throw new ValidationError('Patient medicalRecordIds must be an array of valid IDs');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function validateDoctor(data: any): ValidationResult<any> {
  try {
    if (!data || typeof data !== 'object') {
      throw new ValidationError(ErrorMessages.NOT_OBJECT('Doctor'));
    }

    if (!isValidId(data.id)) {
      throw new ValidationError(ErrorMessages.INVALID_ID(data.id));
    }

    if (!isValidName(data.name)) {
      throw new ValidationError(ErrorMessages.INVALID_NAME(data.name));
    }

    if (!isValidName(data.specialty)) {
      throw new ValidationError('Doctor specialty must be a string with at least 2 characters');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function validatePrescription(data: any): ValidationResult<any> {
  try {
    if (!data || typeof data !== 'object') {
      throw new ValidationError(ErrorMessages.NOT_OBJECT('Prescription'));
    }

    if (!isValidId(data.id)) {
      throw new ValidationError(ErrorMessages.INVALID_ID(data.id));
    }

    if (!isValidId(data.medicalRecordId)) {
      throw new ValidationError('Prescription medicalRecordId must be a non-empty string');
    }

    if (!isValidName(data.medicine)) {
      throw new ValidationError('Prescription medicine must be a string with at least 2 characters');
    }

    if (!isValidDosage(data.dosage)) {
      throw new ValidationError(ErrorMessages.INVALID_DOSAGE(data.dosage));
    }

    if (data.duration !== undefined && typeof data.duration !== 'string') {
      throw new ValidationError('Prescription duration must be a string if provided');
    }

    if (data.frequency !== undefined && !isValidFrequency(data.frequency)) {
      throw new ValidationError(ErrorMessages.INVALID_FREQUENCY(data.frequency));
    }

    if (data.notes !== undefined && typeof data.notes !== 'string') {
      throw new ValidationError('Prescription notes must be a string if provided');
    }

    if (!isValidDate(data.createdAt)) {
      throw new ValidationError('Prescription createdAt must be a valid Date');
    }

    if (!isValidDate(data.updatedAt)) {
      throw new ValidationError('Prescription updatedAt must be a valid Date');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function validateMedicalRecord(data: any): ValidationResult<any> {
  try {
    if (!data || typeof data !== 'object') {
      throw new ValidationError(ErrorMessages.NOT_OBJECT('MedicalRecord'));
    }

    if (!isValidId(data.id)) {
      throw new ValidationError(ErrorMessages.INVALID_ID(data.id));
    }

    if (!isValidId(data.patientId)) {
      throw new ValidationError('MedicalRecord patientId must be a non-empty string');
    }

    if (!isValidDate(data.date)) {
      throw new ValidationError(ErrorMessages.INVALID_DATE(data.date));
    }

    if (!isValidName(data.diagnosis)) {
      throw new ValidationError('MedicalRecord diagnosis must be a string with at least 2 characters');
    }

    if (data.doctorId !== undefined && !isValidId(data.doctorId)) {
      throw new ValidationError('MedicalRecord doctorId must be a valid ID if provided');
    }

    if (data.prescriptionIds !== undefined && !isValidArray(data.prescriptionIds, isValidId)) {
      throw new ValidationError('MedicalRecord prescriptionIds must be an array of valid IDs');
    }

    if (data.notes !== undefined && typeof data.notes !== 'string') {
      throw new ValidationError('MedicalRecord notes must be a string if provided');
    }

    if (!isValidDate(data.createdAt)) {
      throw new ValidationError('MedicalRecord createdAt must be a valid Date');
    }

    if (!isValidDate(data.updatedAt)) {
      throw new ValidationError('MedicalRecord updatedAt must be a valid Date');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Safe validation (no throw)
export function isPatientValid(data: any): boolean {
  const result = validatePatient(data);
  return result.success;
}

export function isDoctorValid(data: any): boolean {
  const result = validateDoctor(data);
  return result.success;
}

export function isPrescriptionValid(data: any): boolean {
  const result = validatePrescription(data);
  return result.success;
}

export function isMedicalRecordValid(data: any): boolean {
  const result = validateMedicalRecord(data);
  return result.success;
}
