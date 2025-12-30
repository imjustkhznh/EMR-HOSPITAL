import type { Patient } from '../types/models';
import InputField from './form/InputField';
import SelectField from './form/SelectField';
import Button from './form/Button';
import { useFormValidation, type FormValues } from '../hooks/useFormValidation';
import './PatientForm.css';

interface PatientFormProps {
  onSubmit: (patient: Omit<Patient, 'id'>) => void;
  onCancel?: () => void;
  initialPatient?: Patient;
  isEditMode?: boolean;
}

// Validation rules
const validationRules = {
  name: [
    (value: string) => (!value?.trim() ? 'Name is required' : null),
    (value: string) => (value?.trim().length < 2 ? 'Name must be at least 2 characters' : null),
  ],
  age: [
    (value: string) => (!value ? 'Age is required' : null),
    (value: string) => (isNaN(Number(value)) || Number(value) <= 0 ? 'Age must be a number greater than 0' : null),
    (value: string) => (Number(value) > 150 ? 'Age must be less than 150' : null),
  ],
  gender: [
    (value: string) => (!value ? 'Gender is required' : null),
  ],
  phone: [
    (value: string) => (!value?.trim() ? 'Phone is required' : null),
    (value: string) => (!/^\+?[0-9\s\-\(\)]{10,}$/.test(value) ? 'Phone format is invalid' : null),
  ],
  address: [
    (value: string) => (!value?.trim() ? 'Address is required' : null),
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

  const { values, errors, handleChange, handleBlur, handleSubmit, reset } = useFormValidation(
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

  return (
    <div className="patient-form-container">
      <h2>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h2>
      <form onSubmit={handleFormSubmit} className="patient-form">
        <InputField
          id="name"
          label="Name"
          type="text"
          value={String(values.name)}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          placeholder="Enter patient name"
          error={errors.name}
          required={true}
        />

        <InputField
          id="age"
          label="Age"
          type="number"
          value={String(values.age)}
          onChange={handleChange('age')}
          onBlur={handleBlur('age')}
          placeholder="Enter age"
          error={errors.age}
          required={true}
        />

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
        />

        <InputField
          id="phone"
          label="Phone"
          type="tel"
          value={String(values.phone)}
          onChange={handleChange('phone')}
          onBlur={handleBlur('phone')}
          placeholder="Enter phone (e.g., +84 987 654 321)"
          error={errors.phone}
          required={true}
        />

        <div className="form-group">
          <label htmlFor="address">
            Address <span className="required">*</span>
          </label>
          <textarea
            id="address"
            value={String(values.address)}
            onChange={(e) => handleChange('address')(e.target.value)}
            onBlur={handleBlur('address')}
            placeholder="Enter address"
            rows={3}
            className={errors.address ? 'textarea-error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary" fullWidth>
            {isEditMode ? '💾 Update Patient' : '✨ Add Patient'}
          </Button>
          {onCancel && (
            <Button type="button" variant="secondary" fullWidth onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
