import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import ErrorIcon from "./ErrorIcon";
import CommonButton from "./CommonButton";
import SuccessIcon from "./SuccessIcon";

interface PopupProps {
  id: string;
  title?: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  buttonText?: string;
  showCloseButton?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  // New props for two-button confirmation mode
  isConfirmDialog?: boolean;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  order?: string;
}

const Popup: React.FC<PopupProps> = ({
  id,
  title,
  message,
  type,
  buttonText = "閉じる",
  showCloseButton = true,
  onClose,
  onConfirm,
  // New props with defaults
  isConfirmDialog = false,
  confirmText = "削除",
  cancelText = "キャンセル",
  onCancel,
  order,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200); // Wait for animation
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    handleClose();
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        /*  return <CheckCircle size={48} color="#28a745" />; */
        return <SuccessIcon size="large" />;
      case "error":
        return <XCircle size={48} color="#dc3545" />;
      case "warning":
        /*  return <AlertTriangle size={48} color="#ffc107" />; */
        return <ErrorIcon size="large" />;
      case "info":
        return <Info size={48} color="#17a2b8" />;
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "success":
        return "#28a745";
      case "error":
        return "#dc3545";
      case "warning":
        return "#ffc107";
      case "info":
        return "#17a2b8";
    }
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
        padding: "20px",
      }}
      onClick={!isConfirmDialog ? handleClose : undefined} // Don't close on backdrop click for confirm dialogs
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2rem 1rem",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          position: "relative",
          transform: isVisible ? "scale(1)" : "scale(0.9)",
          transition: "transform 0.2s ease",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && !isConfirmDialog && (
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} color="#666" />
          </button>
        )}

        <div style={{ marginBottom: "0.5rem" }}>{getIcon()}</div>

        {title && (
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "1.25rem",
              fontWeight: "400",
              color: "#000",
            }}
          >
            {title}
          </h3>
        )}

        <p
          style={{
            margin: "0 0 2rem 0",
            fontSize: "1rem",
            color: "#000",
            lineHeight: "1.5",
          }}
        >
          {message}
        </p>

        {isConfirmDialog ? (
          
          // Two-button layout for confirmation dialogs
          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            {order === "desc" ? (
              <>
                <CommonButton
                  onClick={handleConfirm}
                  variant="primary"
                  size="small"
                >
                  {confirmText}
                </CommonButton>
                <CommonButton
                  onClick={handleCancel}
                  variant="primary"
                  size="small"
                >
                  {cancelText}
                </CommonButton>
              </>
            ) : (
              <>
                <CommonButton
                  onClick={handleCancel}
                  variant="secondary"
                  size="small"
                >
                  {cancelText}
                </CommonButton>
                <CommonButton
                  onClick={handleConfirm}
                  variant="primary"
                  size="small"
                >
                  {confirmText}
                </CommonButton>
              </>
            )}
          </div>
        ) : (
          // Single button layout for regular popups
          <CommonButton
            onClick={handleConfirm}
            /* style={{
              backgroundColor: getButtonColor(),
              color: type === "warning" ? "#333" : "white",
              border: "none",
              borderRadius: "25px",
              padding: "12px 32px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              minWidth: "120px",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }} */
          >
            {buttonText}
          </CommonButton>
        )}
      </div>
    </div>,
    document.body
  );
};

// Popup item interface
interface PopupItem {
  id: string;
  title?: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  buttonText?: string;
  showCloseButton?: boolean;
  onConfirm?: () => void;
  // New props for confirmation dialogs
  isConfirmDialog?: boolean;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  order?: string;
}

// Singleton popup manager
class PopupManager {
  private listeners: Array<(popup: PopupItem | null) => void> = [];
  private currentPopup: PopupItem | null = null;

  subscribe(listener: (popup: PopupItem | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.currentPopup));
  }

  showPopup(config: Omit<PopupItem, "id">) {
    const id = Math.random().toString(36).substr(2, 9);
    this.currentPopup = { id, ...config };
    this.notify();
  }

  hidePopup() {
    this.currentPopup = null;
    this.notify();
  }
}

const popupManager = new PopupManager();

// Hook to use popup manager
export const useGeneralPopup = () => {
  const [popup, setPopup] = useState<PopupItem | null>(null);

  useEffect(() => {
    const unsubscribe = popupManager.subscribe(setPopup);
    return unsubscribe;
  }, []);

  return { popup, hidePopup: popupManager.hidePopup.bind(popupManager) };
};

// Global functions to show popups from anywhere
export const showSuccessPopup = (
  message: string,
  options?: {
    title?: string;
    buttonText?: string;
    onConfirm?: () => void;
  }
) => {
  popupManager.showPopup({
    type: "success",
    message,
    ...options,
  });
};

export const showErrorPopup = (
  message: string,
  options?: {
    title?: string;
    buttonText?: string;
    onConfirm?: () => void;
  }
) => {
  popupManager.showPopup({
    type: "error",
    message,
    ...options,
  });
};

export const showWarningPopup = (
  message: string,
  options?: {
    title?: string;
    buttonText?: string;
    onConfirm?: () => void;
  }
) => {
  popupManager.showPopup({
    type: "warning",
    message,
    ...options,
  });
};

export const showInfoPopup = (
  message: string,
  options?: {
    title?: string;
    buttonText?: string;
    onConfirm?: () => void;
  }
) => {
  popupManager.showPopup({
    type: "info",
    message,
    ...options,
  });
};

// New function for confirmation dialogs
export const showConfirmDialog = (
  message: string,
  options: {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    type?: "warning" | "error" | "info";
    onConfirm: () => void;
    onCancel?: () => void;
    order?: string; 
  }
) => {
  popupManager.showPopup({
    type: options.type || "warning",
    message,
    title: options.title,
    isConfirmDialog: true,
    confirmText: options.confirmText,
    cancelText: options.cancelText,
    onConfirm: options.onConfirm,
    onCancel: options.onCancel,
    order: options.order || "asc", 
  });
};

export const hidePopup = () => {
  popupManager.hidePopup();
};

// Popup container component to add to your app root
export const PopupContainer: React.FC = () => {
  const { popup, hidePopup } = useGeneralPopup();

  if (!popup) return null;

  return (
    <Popup
      id={popup.id}
      title={popup.title}
      message={popup.message}
      type={popup.type}
      buttonText={popup.buttonText}
      showCloseButton={popup.showCloseButton}
      onClose={hidePopup}
      onConfirm={popup.onConfirm}
      isConfirmDialog={popup.isConfirmDialog}
      confirmText={popup.confirmText}
      cancelText={popup.cancelText}
      onCancel={popup.onCancel}
      order={popup.order}
    />
  );
};
