
import type { Patient } from '../types/models';
import './PatientCard.css';

interface PatientCardProps {
  patient: Patient;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patientId: string) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${patient.name}?`)) {
      onDelete?.(patient.id);
    }
  };

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
        <button className="btn btn-primary" onClick={() => onEdit?.(patient)}>
          ✎ Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          ✕ Delete
        </button>
      </div>
    </div>
  );
};
