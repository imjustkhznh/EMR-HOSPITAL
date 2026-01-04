'use client';

import Image from 'next/image';
import type { Patient } from '../../types/models';
import './PatientCard.css';

interface PatientCardProps {
  patient: Patient;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patientId: string) => void;
}

export function PatientCard({ patient, onEdit, onDelete }: PatientCardProps) {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${patient.name}?`)) {
      onDelete?.(patient.id);
    }
  };

  return (
    <article className="patient-card">
      <header className="card-header">
        <div className="patient-avatar-wrapper">
          <Image
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.id}`}
            alt={`Avatar of ${patient.name}`}
            width={50}
            height={50}
            className="patient-avatar"
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect fill='%23f0f0f0' width='50' height='50'/%3E%3C/svg%3E"
            priority={false}
          />
        </div>
        <div className="patient-info-header">
          <h2 className="patient-name">{patient.name}</h2>
          <span className="patient-id">Patient ID: {patient.id}</span>
        </div>
      </header>
      
      <section className="card-body">
        <div className="info-row">
          <label htmlFor={`age-${patient.id}`}>Age:</label>
          <span id={`age-${patient.id}`}>{patient.age} years</span>
        </div>
        
        <div className="info-row">
          <label htmlFor={`gender-${patient.id}`}>Gender:</label>
          <span id={`gender-${patient.id}`} className="gender-badge">{patient.gender}</span>
        </div>

        <div className="info-row">
          <label htmlFor={`phone-${patient.id}`}>Phone:</label>
          <span id={`phone-${patient.id}`}>{patient.phone}</span>
        </div>

        <div className="info-row">
          <label htmlFor={`address-${patient.id}`}>Address:</label>
          <span id={`address-${patient.id}`}>{patient.address}</span>
        </div>
        
        {patient.diagnosis && (
          <div className="info-row">
            <label htmlFor={`diagnosis-${patient.id}`}>Diagnosis:</label>
            <span id={`diagnosis-${patient.id}`} className="diagnosis">{patient.diagnosis}</span>
          </div>
        )}
        
        {patient.medicalRecordIds && patient.medicalRecordIds.length > 0 && (
          <div className="info-row">
            <label htmlFor={`records-${patient.id}`}>Medical Records:</label>
            <span id={`records-${patient.id}`}>{patient.medicalRecordIds.length} records</span>
          </div>
        )}
      </section>
      
      <footer className="card-footer">
        {onEdit && (
          <button
            onClick={() => onEdit(patient)}
            className="btn-edit"
            aria-label={`Edit patient information for ${patient.name}`}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="btn-delete"
            aria-label={`Delete patient record for ${patient.name}`}
          >
            Delete
          </button>
        )}
      </footer>
    </article>
  );
}