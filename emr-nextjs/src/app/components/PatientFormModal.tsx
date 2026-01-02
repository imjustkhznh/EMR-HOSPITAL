'use client';

import { useState } from 'react';
import type { Patient } from '../../types/models';
import PatientForm from './PatientForm';
import Toast, { type ToastType } from './Toast';
import './PatientFormModal.css';

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: Omit<Patient, 'id'>) => Promise<void>;
  initialPatient?: Patient;
  isEditMode?: boolean;
  title?: string;
}

export default function PatientFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialPatient,
  isEditMode = false,
  title,
}: PatientFormModalProps) {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (patient: Omit<Patient, 'id'>) => {
    try {
      setIsSubmitting(true);
      await onSubmit(patient);
      
      const successMessage = isEditMode 
        ? 'Patient updated successfully! ✅' 
        : 'Patient added successfully! ✅';
      
      setToastMessage(successMessage);
      setToastType('success');
      setShowToast(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setShowToast(false);
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setToastMessage(`Error: ${errorMessage}`);
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-content">
          <div className="modal-header">
            <h2 id="modal-title">
              {title || (isEditMode ? 'Edit Patient' : 'Add New Patient')}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="modal-close"
              aria-label="Close modal"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>
          <div className="modal-body">
            <PatientForm
              onSubmit={handleSubmit}
              onCancel={onClose}
              initialPatient={initialPatient}
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