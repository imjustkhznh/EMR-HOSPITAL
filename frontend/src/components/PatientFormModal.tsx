import { useState } from 'react';
import type { Patient } from '../types/models';
import PatientForm from './PatientForm';
import Button from './form/Button';
import './PatientFormModal.css';

interface PatientFormModalProps {
  onAddPatient: (patient: Omit<Patient, 'id' | 'createdAt'>) => void;
}

export default function PatientFormModal({ onAddPatient }: PatientFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (patient: Omit<Patient, 'id' | 'createdAt'>) => {
    onAddPatient(patient);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        ➕ Add New Patient
      </Button>

      {isOpen && (
        <div className="form-modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}>
          <div className="form-modal-content">
            <div className="form-modal-header">
              <h2>Add New Patient</h2>
              <button className="form-modal-close" onClick={handleClose}>
                ✕
              </button>
            </div>
            <div className="form-modal-body">
              <PatientForm onSubmit={handleSubmit} onCancel={handleClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
