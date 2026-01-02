import '../form/SelectField.css';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Option[];
  error?: string;
  disabled?: boolean;
  required?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export default function SelectField({
  id,
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  disabled = false,
  required = false,
  ariaLabel,
  ariaDescribedBy,
}: SelectFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const descriptionIds = [ariaDescribedBy, errorId].filter(Boolean).join(' ');

  return (
    <div className="select-field">
      <label htmlFor={id}>
        {label}
        {required && <span className="required" aria-label="required">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel || label}
        aria-describedby={descriptionIds}
        aria-invalid={!!error}
        className={error ? 'select-error' : ''}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}