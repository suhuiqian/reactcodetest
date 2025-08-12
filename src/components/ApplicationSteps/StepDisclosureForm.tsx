import React, { useState } from "react";
import DisclosureForm from "./DisclosureForm";
import CommonButton from "../CommonButton";
import styles from "@/pages/application/Application.module.css";

interface StepDisclosureFormProps {
  onComplete: () => void;
  onBack: () => void;
  onHandleCancel: () => void;
  useType?: "insured" | "applicant";
}

const StepDisclosureForm: React.FC<StepDisclosureFormProps> = ({
  onComplete,
  onBack,
  onHandleCancel,
  useType = "applicant",
}) => {
  const isDev =
    import.meta.env.MODE !== "production" &&
    localStorage.getItem("devMode") === "true";
  const [autoComplete, setAutoComplete] = useState(false);

  // Mock completion for development (only if autoComplete is enabled)
  React.useEffect(() => {
    if (isDev && autoComplete) {
      const timer = setTimeout(() => {
        console.log("Auto-completing disclosure form in dev mode");
        onComplete();
      }, 2000); // Auto-complete after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [isDev, autoComplete, onComplete]);

  return (
    <div className={styles.disclosureStepContent}>
      {isDev && (
        <div className={styles.devNotice}>
          <div className={styles.devControls}>
            <label>
              <input
                type="checkbox"
                checked={autoComplete}
                onChange={(e) => setAutoComplete(e.target.checked)}
              />
              自動完了モード
            </label>
            {autoComplete && (
              <p className={styles.devNoticeText}>
                開発モード: 2秒後に自動的に次のステップに進みます
              </p>
            )}
          </div>
          <button className={styles.devNoticeButton} onClick={onComplete}>
            手動で完了
          </button>
        </div>
      )}
      <DisclosureForm
        onComplete={onComplete}
        useType={useType}
        onHandleCancel={onHandleCancel}
      />

      <div className={styles.stepActionButtons}>
        <div className={styles.actionButtonRow}>
          {/* <CommonButton
            onClick={onBack}
            variant="outline"
            className={styles.fullWidthButton}
          >
            戻る
          </CommonButton> */}
        </div>
      </div>
    </div>
  );
};

export default StepDisclosureForm;
