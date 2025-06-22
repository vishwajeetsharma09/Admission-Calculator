import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'tel';
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  min,
  max,
  step,
  required = false,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-field">
      <label className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={`input ${error ? 'error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${label.toLowerCase()}-error` : undefined}
      />
      {error && (
        <div id={`${label.toLowerCase()}-error`} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField; 