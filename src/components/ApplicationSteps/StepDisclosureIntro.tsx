import React from "react";
import TextCard from "../TextCard";
import CommonButton from "../CommonButton";
import { INSURANCE_CONTENT } from "@/constants/insuranceContent";
import styles from "../../pages/application/Application.module.css";

interface StepDisclosureIntroProps {
  onNext: () => void;
  onBack: () => void;
  onTempSave?: () => void;
}

const StepDisclosureIntro: React.FC<StepDisclosureIntroProps> = ({
  onNext,
  onBack,
}) => {
  return (
    <div className={styles.stepContent}>
      <TextCard
        title="告知前のご案内"
        sections={INSURANCE_CONTENT.DISCLOSURE_INTRO}
        prefix={true}
      />

      <div className={`${styles.stepActionButtons} ${styles.step4Buttons}`}>
        <div className={styles.actionButtonRow}>
          <CommonButton
            onClick={onNext}
            variant="primary"
            className={styles.fullWidthButton}
          >
            告知内容の入力へ
          </CommonButton>
        </div>
        {/* <div className={styles.actionButtonRow}>
          <CommonButton
            onClick={onBack}
            variant="secondary"
            className={styles.fullWidthButton}
          >
            戻る
          </CommonButton>
        </div> */}
      </div>
    </div>
  );
};

export default StepDisclosureIntro;
