import React from "react";
import CommonButton from "./CommonButton";
import ErrorIcon from "./ErrorIcon";
import styles from "./CommonPopup.module.css";

interface CommonPopupProps {
  isOpen: boolean;
  title?: string;
  messages: string[];
  buttonText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  showIcon?: boolean;
  type?: "error" | "success" | "info";
}

const ErrorPopup: React.FC<CommonPopupProps> = ({
  isOpen,
  title,
  messages,
  buttonText = "OK",
  onClose,
  onConfirm,
  showIcon = true,
  type = "error",
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <div className={styles.errorOverlay}>
      <div className={`${styles.errorBox} ${styles[type]}`}>
        <div className={styles.errorContent}>
          <div className={styles.errorTitle}>
            {showIcon && (
              <div className={styles.errorIconContainer}>
                <ErrorIcon size="medium" />
              </div>
            )}
            {title && <div className={styles.errorTitleContent}>{title}</div>}
          </div>

          <div className={styles.errorMessageContainer}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.errorMessageItem}>
                {msg}
              </div>
            ))}
          </div>
          <div className={styles.errorActions}>
            <CommonButton variant="primary" onClick={handleConfirm}>
              {buttonText}
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
