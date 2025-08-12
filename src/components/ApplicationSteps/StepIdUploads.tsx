import React from "react";
import IdentityVerifyFilesUpload from "@/components/IdentityVerifyFilesUpload";
import TextCard from "@/components/TextCard";
import CommonButton from "@/components/CommonButton";
import { IDENTITY_VERIFY_CONTENT } from "@/constants/identity";
import styles from "./StepIdUploads.module.css";

interface StepIdUploadsProps {
  onNext: () => void;
  onBack: () => void;
  onTempSave: () => void;
}

const StepIdUploads: React.FC<StepIdUploadsProps> = ({
  onNext,
  onBack,
  onTempSave,
}) => {
  const handleSubmit = () => {
    // Validate uploads here if needed
    // For now, just proceed to next step
    onNext();
  };

  return (
    <div className={styles.stepIdUploads}>
      <TextCard title="本人確認書類アップロード">
        <div className={styles.content}>
          <IdentityVerifyFilesUpload
            sections={IDENTITY_VERIFY_CONTENT.IDENTITY_CONTENT}
            fileNumber={IDENTITY_VERIFY_CONTENT.fileNumber}
            prefix={true}
          />
        </div>
      </TextCard>
      <div className={styles.stepActionButtons}>
          <CommonButton
            variant="primary"
            onClick={onNext}
            className={styles.fullWidthButton}
          >
            重要事項へ
          </CommonButton>

          <CommonButton
            variant="secondary"
            onClick={onBack}
            className={styles.fullWidthButton}
          >
            戻る
          </CommonButton>
      </div>
    </div>
  );
};

export default StepIdUploads;
