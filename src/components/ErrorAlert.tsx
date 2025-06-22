import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="error-alert" role="alert">
      <div className="error-content">
        <AlertCircle size={20} className="error-icon" />
        <span className="error-message">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="error-close"
          aria-label="Close error message"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ErrorAlert; 