import { useState, useCallback } from 'react';

export interface FormErrors {
  [key: string]: string;
}

export interface FormValues {
  [key: string]: string | number;
}

export interface ValidationRules {
  [key: string]: Array<(value: any) => string | null>;
}

export function useFormValidation(
  initialValues: FormValues,
  validationRules: ValidationRules
) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  // Validate single field
  const validateField = useCallback(
    (fieldName: string, value: any): string => {
      const rules = validationRules[fieldName];
      if (!rules) return '';

      for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
      }
      return '';
    },
    [validationRules]
  );

  // Handle field change
  const handleChange = useCallback(
    (fieldName: string) => (newValue: string | number) => {
      setValues((prev) => ({
        ...prev,
        [fieldName]: newValue,
      }));

      // Validate on change if field was touched
      if (touched[fieldName]) {
        const error = validateField(fieldName, newValue);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
      }
    },
    [touched, validateField]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (fieldName: string) => () => {
      setTouched((prev) => ({
        ...prev,
        [fieldName]: true,
      }));

      const error = validateField(fieldName, values[fieldName]);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    },
    [values, validateField]
  );

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setSubmitted(true);
    return isValid;
  }, [validationRules, validateField, values]);

  // Check if form is valid
  const isFormValid = useCallback((): boolean => {
    let isValid = true;
    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        isValid = false;
      }
    });
    return isValid;
  }, [validationRules, validateField, values]);

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit: (values: FormValues) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      if (validateAll()) {
        onSubmit(values);
      }
    },
    [validateAll, values]
  );

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
    validateAll,
    isFormValid,
    reset,
  };
}