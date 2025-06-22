import { FormData, FormErrors } from '../types';

export const validateGMAT = (value: string): string | undefined => {
  if (!value) return 'GMAT score is required';
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return 'GMAT score must be a valid number';
  
  if (numValue < 200 || numValue > 800) {
    return 'GMAT score must be between 200 and 800';
  }
  
  if (!Number.isInteger(numValue)) {
    return 'GMAT score must be a whole number';
  }
  
  return undefined;
};

export const validateGPA = (value: string): string | undefined => {
  if (!value) return 'GPA is required';
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return 'GPA must be a valid number';
  
  if (numValue < 0.0 || numValue > 4.0) {
    return 'GPA must be between 0.0 and 4.0';
  }
  
  // Check for reasonable decimal places (max 2)
  const decimalPlaces = value.split('.')[1]?.length || 0;
  if (decimalPlaces > 2) {
    return 'GPA can have at most 2 decimal places';
  }
  
  return undefined;
};

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  const gmatError = validateGMAT(data.gmatScore);
  if (gmatError) errors.gmatScore = gmatError;
  
  const gpaError = validateGPA(data.gpa);
  if (gpaError) errors.gpa = gpaError;
  
  return errors;
};

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0;
}; 