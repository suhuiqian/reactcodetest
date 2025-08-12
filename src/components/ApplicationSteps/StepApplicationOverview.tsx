import React from "react";
import FormCard from "@/components/FormCard";
import CommonButton from "@/components/CommonButton";
import styles from "@/pages/application/Application.module.css";
import { checkApplication } from "./StepOverviewData";
import { useNavigate } from "react-router-dom";

interface StepApplicationOverviewProps {
  onNext: () => void;
}

// TODO: ARCHITECTURE LEVEL
// how to handle mode of new application vs resume mode

const StepApplicationOverview: React.FC<StepApplicationOverviewProps> = ({
  onNext,
}) => {

  return (
    <div className={styles.overviewStepContent}>
      <div className={styles.overviewInfoCardsGrid}>
        <FormCard title="契約者" fields={checkApplication.applicant} />
        <FormCard title="被保険者" fields={checkApplication.insured} />
        <FormCard
          title="死亡保険金受取人"
          fields={checkApplication.beneficiary}
        />
        <FormCard title="保障内容" fields={checkApplication.content} />
        {/*  <ApplicantForm /> */}
      </div>
      <div className={`${styles.stepActionButtons} ${styles.margin50}`}>
        <CommonButton
          onClick={onNext}
          variant="primary"
          className={styles.fullWidthButton}
        >
          書類アップロードへ
        </CommonButton>
      </div>
    </div>
  );
};

export default StepApplicationOverview;
