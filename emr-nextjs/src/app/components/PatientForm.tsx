'use client';

import type { Patient } from '../../types/models';
import InputField from './form/InputField';
import SelectField from './form/SelectField';
import { useFormValidation, type FormValues } from '../hooks/useFormValidation';
import './PatientForm.css';

interface PatientFormProps {
  onSubmit: (patient: Omit<Patient, 'id'>) => void;
  onCancel?: () => void;
  initialPatient?: Patient;
  isEditMode?: boolean;
}

// Validation rules with Vietnamese phone format and strict age limits
const validationRules = {
  name: [
    (value: string) => (!value?.trim() ? 'Name is required' : null),
    (value: string) => (value?.trim().length < 2 ? 'Name must be at least 2 characters' : null),
    (value: string) => (value?.trim().length > 100 ? 'Name must be less than 100 characters' : null),
  ],
  age: [
    (value: string) => (!value ? 'Age is required' : null),
    (value: string) => (isNaN(Number(value)) || Number(value) <= 0 ? 'Age must be a positive number' : null),
    (value: string) => (Number(value) > 120 ? 'Age must be between 0 and 120' : null),
  ],
  gender: [
    (value: string) => (!value ? 'Gender is required' : null),
  ],
  phone: [
    (value: string) => (!value?.trim() ? 'Phone is required' : null),
    // Vietnam phone format: +84, 0, or 84 followed by 9-10 digits
    (value: string) => {
      const vietnamPhoneRegex = /^(\+84|0)?[1-9]\d{8,9}$/;
      return !vietnamPhoneRegex.test(value?.replace(/\s|-|\(|\)/g, '')) 
        ? 'Invalid phone format (e.g., +84 987 654 321 or 0987654321)' 
        : null;
    },
  ],
  address: [
    (value: string) => (!value?.trim() ? 'Address is required' : null),
    (value: string) => (value?.trim().length > 200 ? 'Address must be less than 200 characters' : null),
  ],
};

export default function PatientForm({ onSubmit, onCancel, initialPatient, isEditMode }: PatientFormProps) {
  const initialValues: FormValues = initialPatient
    ? {
        name: initialPatient.name,
        age: String(initialPatient.age),
        gender: initialPatient.gender,
        phone: initialPatient.phone,
        address: initialPatient.address,
      }
    : {
        name: '',
        age: '',
        gender: 'male',
        phone: '',
        address: '',
      };

  const { values, errors, handleChange, handleBlur, handleSubmit, reset, isFormValid } = useFormValidation(
    initialValues,
    validationRules
  );

  const handleFormSubmit = handleSubmit((formValues) => {
    const newPatient: Omit<Patient, 'id'> = {
      name: String(formValues.name).trim(),
      age: Number(formValues.age),
      gender: String(formValues.gender).toLowerCase() as 'male' | 'female' | 'other',
      phone: String(formValues.phone).trim(),
      address: String(formValues.address).trim(),
    };

    onSubmit(newPatient);
    reset();
  });

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  const isSubmitDisabled = !isFormValid();

  return (
    <div className="patient-form-container">
      <h2>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h2>
      <form onSubmit={handleFormSubmit} className="patient-form" noValidate>
        <InputField
          id="name"
          label="Patient Name"
          type="text"
          value={String(values.name)}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          placeholder="Enter patient full name"
          error={errors.name}
          required={true}
          ariaLabel="Patient name input"
          ariaDescribedBy="name-hint"
        />
        {!errors.name && <small id="name-hint" className="field-hint">Min 2, max 100 characters</small>}

        <InputField
          id="age"
          label="Age"
          type="number"
          value={String(values.age)}
          onChange={handleChange('age')}
          onBlur={handleBlur('age')}
          placeholder="Enter age (0-120)"
          error={errors.age}
          required={true}
          ariaLabel="Patient age input"
          ariaDescribedBy="age-hint"
        />
        {!errors.age && <small id="age-hint" className="field-hint">Must be between 0 and 120 years</small>}

        <SelectField
          id="gender"
          label="Gender"
          value={String(values.gender)}
          onChange={handleChange('gender')}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          error={errors.gender}
          required={true}
          ariaLabel="Patient gender selection"
        />

        <InputField
          id="phone"
          label="Phone"
          type="tel"
          value={String(values.phone)}
          onChange={handleChange('phone')}
          onBlur={handleBlur('phone')}
          placeholder="e.g., +84 987 654 321 or 0987654321"
          error={errors.phone}
          required={true}
          ariaLabel="Patient phone number input"
          ariaDescribedBy="phone-hint"
        />
        {!errors.phone && <small id="phone-hint" className="field-hint">Vietnam phone format</small>}

        <div className="form-group">
          <label htmlFor="address">
            Address <span className="required" aria-label="required">*</span>
          </label>
          <textarea
            id="address"
            value={String(values.address)}
            onChange={(e) => handleChange('address')(e.target.value)}
            onBlur={handleBlur('address')}
            placeholder="Enter patient address"
            rows={3}
            required
            aria-label="Patient address input"
            aria-describedby={errors.address ? 'address-error' : 'address-hint'}
            aria-invalid={!!errors.address}
            className={errors.address ? 'textarea-error' : ''}
          />
          {!errors.address && <small id="address-hint" className="field-hint">Max 200 characters</small>}
          {errors.address && (
            <span id="address-error" className="error-message" role="alert">
              {errors.address}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="btn-primary"
            aria-label={isEditMode ? 'Save patient changes' : 'Add new patient'}
          >
            {isEditMode ? 'Save Changes' : 'Add Patient'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              aria-label="Cancel form"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}