import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle, X } from "lucide-react";

// TODO:
// use my own toast component in PORTAL
// or sonner library

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 4000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icon =
    type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />;
  const bgColor = type === "success" ? "#28a745" : "#dc3545";

  // TODO: switch to module css ?

  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "white",
        border: `3px solid ${bgColor}`,
        borderRadius: "8px",
        padding: "12px 16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 9999,
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        minWidth: "300px",
      }}
    >
      <span style={{ color: bgColor }}>{icon}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px",
        }}
      >
        <X size={14} />
      </button>
    </div>,
    document.body
  );
};

// Singleton toast manager
class ToastManager {
  private listeners: Array<(toasts: ToastItem[]) => void> = [];
  private toasts: ToastItem[] = [];

  subscribe(listener: (toasts: ToastItem[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  showToast(message: string, type: "success" | "error") {
    const id = Math.random().toString(36).substr(2, 9);
    this.toasts.push({ id, message, type });
    this.notify();
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }
}

interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error";
}

const toastManager = new ToastManager();

// Hook to use toast manager
export const useSimpleToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return { toasts, removeToast: toastManager.removeToast.bind(toastManager) };
};

// Global function to show toasts from anywhere
export const showToast = (message: string, type: "success" | "error") => {
  toastManager.showToast(message, type);
};

// Toast container component
export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSimpleToast();

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};
