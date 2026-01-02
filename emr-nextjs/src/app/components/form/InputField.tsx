import '../form/InputField.css';

interface InputFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'password';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled = false,
  required = false,
  ariaLabel,
  ariaDescribedBy,
}: InputFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const descriptionIds = [ariaDescribedBy, errorId].filter(Boolean).join(' ');

  return (
    <div className="input-field">
      <label htmlFor={id}>
        {label}
        {required && <span className="required" aria-label="required">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel || label}
        aria-describedby={descriptionIds}
        aria-invalid={!!error}
        className={error ? 'input-error' : ''}
      />
      {error && (
        <span id={errorId} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}