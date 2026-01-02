'use client';

import { useState, useEffect } from 'react';
import type { Patient } from '../../types/models';
import PatientForm from './PatientForm';
import Toast, { type ToastType } from './Toast';
import './PatientFormModal.css';

interface PatientFormModalProps {
  onAddPatient: (patient: Omit<Patient, 'id'>) => void;
  onUpdatePatient?: (patient: Patient) => void;
  onCloseEdit?: () => void;
  editingPatient?: Patient | null;
}

export default function PatientFormModal({ 
  onAddPatient, 
  onUpdatePatient,
  onCloseEdit,
  editingPatient 
}: PatientFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showToast, setShowToast] = useState(false);
  const isEditMode = !!editingPatient;

  // Auto-open modal when editingPatient is set
  useEffect(() => {
    if (editingPatient) {
      setIsOpen(true);
    }
  }, [editingPatient]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    onCloseEdit?.();
  };

  const handleSubmit = (patient: Omit<Patient, 'id'>) => {
    if (isEditMode && editingPatient) {
      // Update existing patient
      const updatedPatient: Patient = {
        ...editingPatient,
        ...patient,
      };
      onUpdatePatient?.(updatedPatient);
      setToastMessage(`Patient "${updatedPatient.name}" updated successfully! ✅`);
      setToastType('success');
    } else {
      // Add new patient
      onAddPatient(patient);
      setToastMessage(`Patient "${patient.name}" added successfully! ✅`);
      setToastType('success');
    }

    setShowToast(true);
    
    // Close modal after 2 seconds
    setTimeout(() => {
      handleClose();
      setShowToast(false);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="btn-add-patient"
        aria-label="Add new patient"
      >
        ➕ Add Patient
      </button>
    );
  }

  return (
    <>
      <div className="modal-overlay" onClick={handleClose} aria-hidden="true" />
      <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-content">
          <div className="modal-header">
            <h2 id="modal-title">
              {isEditMode ? 'Edit Patient' : 'Add New Patient'}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="modal-close"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className="modal-body">
            <PatientForm
              onSubmit={handleSubmit}
              onCancel={handleClose}
              initialPatient={editingPatient || undefined}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}