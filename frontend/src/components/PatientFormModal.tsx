import { useState } from 'react';
import type { Patient } from '../types/models';
import PatientForm from './PatientForm';
import Button from './form/Button';
import './PatientFormModal.css';

interface PatientFormModalProps {
  onAddPatient: (patient: Omit<Patient, 'id'>) => void;
  onUpdatePatient?: (patient: Patient) => void;
  editingPatient?: Patient | null;
}

export default function PatientFormModal({ 
  onAddPatient, 
  onUpdatePatient,
  editingPatient 
}: PatientFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = !!editingPatient;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (patient: Omit<Patient, 'id'>) => {
    if (isEditMode && editingPatient) {
      // Update existing patient
      const updatedPatient: Patient = {
        ...editingPatient,
        ...patient,
      };
      onUpdatePatient?.(updatedPatient);
    } else {
      // Add new patient
      onAddPatient(patient);
    }
    handleClose();
  };

  return (
    <>
      {!isEditMode && (
        <Button variant="primary" onClick={handleOpen}>
          ➕ Add New Patient
        </Button>
      )}

      {isOpen && (
        <div className="form-modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}>
          <div className="form-modal-content">
            <div className="form-modal-header">
              <h2>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h2>
              <button className="form-modal-close" onClick={handleClose}>
                ✕
              </button>
            </div>
            <div className="form-modal-body">
              <PatientForm 
                onSubmit={handleSubmit} 
                onCancel={handleClose}
                initialPatient={editingPatient || undefined}
                isEditMode={isEditMode}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
