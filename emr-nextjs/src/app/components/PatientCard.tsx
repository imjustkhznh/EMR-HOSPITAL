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
    <div className="patient-card">
      <div className="card-header">
        <div className="patient-avatar-wrapper">
          <Image
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.id}`}
            alt={`${patient.name}'s avatar`}
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
          <span className="patient-id">ID: {patient.id}</span>
        </div>
      </div>
      
      <div className="card-body">
        <div className="info-row">
          <label>Age:</label>
          <span>{patient.age} years</span>
        </div>
        
        <div className="info-row">
          <label>Gender:</label>
          <span className="gender-badge">{patient.gender}</span>
        </div>

        <div className="info-row">
          <label>Phone:</label>
          <span>{patient.phone}</span>
        </div>

        <div className="info-row">
          <label>Address:</label>
          <span>{patient.address}</span>
        </div>
        
        {patient.diagnosis && (
          <div className="info-row">
            <label>Diagnosis:</label>
            <span className="diagnosis">{patient.diagnosis}</span>
          </div>
        )}
        
        {patient.medicalRecordIds && patient.medicalRecordIds.length > 0 && (
          <div className="info-row">
            <label>Medical Records:</label>
            <span>{patient.medicalRecordIds.length} records</span>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        {onEdit && (
          <button onClick={() => onEdit(patient)} className="btn-edit">
            Edit
          </button>
        )}
        {onDelete && (
          <button onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}