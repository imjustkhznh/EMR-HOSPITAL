import { IIdentifiable, IPersonInfo } from './base';

export interface Patient extends IIdentifiable, IPersonInfo {
  age: number;
  gender: 'male' | 'female' | 'other';
  diagnosis?: string;
  medicalRecordIds?: string[];
}