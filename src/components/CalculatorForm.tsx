import React, { useState, useEffect } from 'react';
import { FormData, FormErrors } from '../types';
import { validateGMAT, validateGPA, validateForm, isFormValid } from '../utils/validation';
import InputField from './InputField';
import { Calculator, RefreshCw } from 'lucide-react';

interface CalculatorFormProps {
  onSubmit: (data: { gmat_score: number; gpa: number }) => void;
  isLoading: boolean;
  onReset: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onSubmit, isLoading, onReset }) => {
  const [formData, setFormData] = useState<FormData>({
    gmatScore: '',
    gpa: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Real-time validation
  useEffect(() => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ gmatScore: true, gpa: true });
    
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    if (isFormValid(validationErrors)) {
      onSubmit({
        gmat_score: parseInt(formData.gmatScore),
        gpa: parseFloat(formData.gpa),
      });
    }
  };

  const handleReset = () => {
    setFormData({ gmatScore: '', gpa: '' });
    setErrors({});
    setTouched({});
    onReset();
  };

  const getFieldError = (field: keyof FormData): string | undefined => {
    return touched[field] ? errors[field] : undefined;
  };

  return (
    <div className="calculator-form card">
      <div className="form-header">
        <div className="header-icon">
          <Calculator size={24} />
        </div>
        <div className="header-content">
          <h1 className="form-title">MBA Admissions Calculator</h1>
          <p className="form-subtitle">
            Enter your GMAT score and GPA to see your admission chances across top MBA programs
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-group">
          <InputField
            label="GMAT Score"
            value={formData.gmatScore}
            onChange={(value) => handleInputChange('gmatScore', value)}
            error={getFieldError('gmatScore')}
            placeholder="e.g., 720"
            type="number"
            min={200}
            max={800}
            required
            disabled={isLoading}
          />
          
          <InputField
            label="GPA"
            value={formData.gpa}
            onChange={(value) => handleInputChange('gpa', value)}
            error={getFieldError('gpa')}
            placeholder="e.g., 3.5"
            type="number"
            min={0.0}
            max={4.0}
            step={0.01}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !isFormValid(errors)}
          >
            {isLoading ? (
              <>
                <div className="loading"></div>
                Calculating...
              </>
            ) : (
              <>
                <Calculator size={18} />
                Calculate Chances
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            <RefreshCw size={18} />
            Reset
          </button>
        </div>

        <div className="form-info">
          <div className="info-item">
            <strong>GMAT Score:</strong> Must be between 200-800 (whole numbers only)
          </div>
          <div className="info-item">
            <strong>GPA:</strong> Must be between 0.0-4.0 (up to 2 decimal places)
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm; 