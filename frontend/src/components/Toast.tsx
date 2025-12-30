import { useEffect, useState } from 'react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  isVisible?: boolean;
}

export default function Toast({
  message,
  type = 'success',
  duration = 3000,
  onClose,
  isVisible = true,
}: ToastProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (!isVisible) {
      setShow(false);
      return;
    }

    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!show) return null;

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
}
