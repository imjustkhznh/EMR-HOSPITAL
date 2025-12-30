import { useState } from 'react';
import type { Patient } from '../types/models';
import './PatientForm.css';

interface PatientFormProps {
  onSubmit: (patient: Omit<Patient, 'id' | 'createdAt'>) => void;
}

interface FormErrors {
  name?: string;
  age?: string;
  gender?: string;
  phone?: string;
  address?: string;
}

export default function PatientForm({ onSubmit }: PatientFormProps) {
  // Controlled input states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Validation error state
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Validation logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = 'Age must be a number greater than 0';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(phone)) {
      // Simple regex: optional +, numbers, spaces, hyphens, parentheses, min 10 chars
      newErrors.phone = 'Phone format is invalid (e.g., +84 987 654 321)';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      // Valid form - call onSubmit callback
      const newPatient: Omit<Patient, 'id' | 'createdAt'> = {
        name: name.trim(),
        age: Number(age),
        gender: gender as 'Male' | 'Female' | 'Other',
        phone: phone.trim(),
        address: address.trim(),
      };

      onSubmit(newPatient);

      // Reset form after successful submission
      setName('');
      setAge('');
      setGender('Male');
      setPhone('');
      setAddress('');
      setErrors({});
      setSubmitted(false);
    }
  };

  return (
    <div className="patient-form-container">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        {/* Name field */}
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient name"
            className={errors.name ? 'input-error' : ''}
            disabled={false}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Age field */}
        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age (e.g., 25)"
            className={errors.age ? 'input-error' : ''}
            disabled={false}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        {/* Gender field */}
        <div className="form-group">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={errors.gender ? 'input-error' : ''}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        {/* Phone field */}
        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone (e.g., +84 987 654 321)"
            className={errors.phone ? 'input-error' : ''}
            disabled={false}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        {/* Address field */}
        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            rows={3}
            className={errors.address ? 'input-error' : ''}
            disabled={false}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Add Patient
        </button>

        {submitted && Object.keys(errors).length > 0 && (
          <div className="form-error-summary">
            <p>Please fix the errors above before submitting.</p>
          </div>
        )}
      </form>
    </div>
  );
}
