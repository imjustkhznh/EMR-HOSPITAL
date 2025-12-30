import '../form/SelectField.css';

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
}: SelectFieldProps) {
  return (
    <div className="select-field">
      <label htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={error ? 'select-error' : ''}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
