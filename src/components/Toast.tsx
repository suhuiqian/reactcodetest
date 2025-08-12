import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToast, type Toast as ToastType } from "@/contexts/ToastContext";
import styles from "./Toast.module.css";

const Toast: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const { removeToast } = useToast();
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRemoving(true);
      setTimeout(() => {
        removeToast(toast.id);
      }, 300); // Match animation duration
    }, (toast.duration || 4000) - 300);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  const handleClose = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeToast(toast.id);
    }, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className={`${styles.icon} ${styles.success}`} />;
      case "error":
        return <XCircle className={`${styles.icon} ${styles.error}`} />;
      case "info":
        return <Info className={`${styles.icon} ${styles.info}`} />;
      case "warning":
        return <AlertTriangle className={`${styles.icon} ${styles.warning}`} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${
        isRemoving ? styles.removing : ""
      }`}
    >
      {getIcon()}
      <span className={styles.message}>{toast.message}</span>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
      <div className={styles.progressBar} />
    </div>
  );
};

const ToastContainer: React.FC = () => {
  const { state } = useToast();

  return (
    <div className={styles.toastContainer}>
      {state.toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
