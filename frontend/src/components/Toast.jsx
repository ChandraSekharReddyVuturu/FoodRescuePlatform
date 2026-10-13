import React, { useEffect } from 'react';
import '../assets/css/common/toast.css';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast && toast.message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast || !toast.message) return null;

  const type = toast.type || 'info';
  const iconMap = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info',
  };

  const titleMap = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
  };

  return (
    <div className="toast-container">
      <div className={`toast ${type}`}>
        <i className={`fa-solid ${iconMap[type] || 'fa-circle-info'}`}></i>
        <div className="toast-message">
          <h4>{toast.title || titleMap[type]}</h4>
          <p>{toast.message}</p>
        </div>
        <span className="toast-close" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
}
