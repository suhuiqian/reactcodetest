import React, { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import DynamicRelationshipSelector from "./DynamicRelationshipSelector";
import styles from "./RelationshipField.module.css";

interface RelationshipFieldProps {
  name: string; // Form field name (e.g., "insured.relationship")
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  helpText?: string;
  className?: string;
}

const RelationshipField: React.FC<RelationshipFieldProps> = ({
  name,
  disabled = false,
  label = "続柄",
  placeholder = "続柄を選択してください",
  helpText,
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = watch(name) || "";
  const error = errors[name as keyof typeof errors];
  const hasError = !!error;

  const handleOpen = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (newValue: string) => {
    setValue(name, newValue, { shouldValidate: true });
  };

  return (
    <div className={`${styles.fieldContainer} ${className}`}>
      {label && <label className={styles.fieldLabel}>{label}</label>}

      <div className={styles.inputContainer}>
        <button
          type="button"
          onClick={handleOpen}
          className={`${styles.triggerButton} ${hasError ? styles.error : ""} ${
            disabled ? styles.disabled : ""
          }`}
          disabled={disabled}
        >
          <div className={styles.triggerContent}>
            {value ? (
              <>
                <User className={styles.userIcon} />
                <span className={styles.selectedValue}>{value}</span>
              </>
            ) : (
              <>
                <User className={styles.userIcon} />
                <span className={styles.placeholder}>{placeholder}</span>
              </>
            )}
          </div>
          <ChevronDown className={styles.chevronIcon} />
        </button>
      </div>

      {helpText && <span className={styles.helpText}>{helpText}</span>}

      {error && (
        <span className={styles.errorMessage}>{error.message as string}</span>
      )}

      {/* Modal/Popup */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <DynamicRelationshipSelector
              value={value}
              onChange={handleChange}
              disabled={disabled}
              isOpen={isModalOpen}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipField;
