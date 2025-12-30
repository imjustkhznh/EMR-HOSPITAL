
import type { Patient } from '../types/models';
import './PatientCard.css';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="patient-card">
      <div className="card-header">
        <h2 className="patient-name">{patient.name}</h2>
        <span className="patient-id">ID: {patient.id}</span>
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
        <button className="btn btn-primary">View Details</button>
        <button className="btn btn-secondary">Edit</button>
      </div>
    </div>
  );
};
