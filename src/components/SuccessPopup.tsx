import React from "react";
import CommonButton from "./CommonButton";
import SuccessIcon from "./SuccessIcon";
import styles from "./SuccessPopup.module.css";

/**
 * Reusable SuccessPopup component for showing success messages across the application
 *
 * @example
 * ```tsx
 * const [showSuccess, setShowSuccess] = useState(false);
 *
 * <SuccessPopup
 *   isOpen={showSuccess}
 *   title="操作完了"
 *   message="データが正常に保存されました"
 *   buttonText="OK"
 *   onClose={() => setShowSuccess(false)}
 *   onConfirm={() => {
 *     setShowSuccess(false);
 *     navigate("/dashboard");
 *   }}
 * />
 * ```
 */

interface SuccessPopupProps {
  isOpen: boolean;
  title?: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  showIcon?: boolean;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  title = "成功",
  message,
  buttonText = "OK",
  onClose,
  onConfirm,
  showIcon = true,
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
    <div className={styles.successOverlay}>
      <div className={styles.successBox}>
        {showIcon && (
          <div className={styles.successIconContainer}>
            <SuccessIcon size="large" />
          </div>
        )}
        <div className={styles.successContent}>
          {title && <h3 className={styles.successTitle}>{title}</h3>}
          <div className={styles.successMessage}>{message}</div>
        </div>
        <div className={styles.successActions}>
          <CommonButton variant="primary" onClick={handleConfirm}>
            {buttonText}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
