import React, { useState } from "react";
import TextTitle from "../TextTitle";
import TextWithPdfButtons from "../TextWithPdfButtons";
import CommonButton from "../CommonButton";
import styles from "../../pages/application/Application.module.css";

interface StepTermsProps {
  onSubmit: () => void;
  onBack: () => void;
  onTempSave?: () => void;
}

const StepTerms: React.FC<StepTermsProps> = ({ onSubmit, onBack }) => {
  const [termsViewed, setTermsViewed] = useState(false);
  const handleDisplayClick = () => {
    setTermsViewed(true);
  };

  const handleDownloadClick = () => {
    //setTermsViewed(true);
  };

  return (
    <div className={styles.stepContent}>
      <div className={styles.stepContentCard}>
        <TextTitle text="約款確認" />
        <TextWithPdfButtons
          text="お申込みいただく保険商品の「約款）」について全てのページの内容を十分にご確認ください。"
          pdfTitle="約款"
          onDisplayClick={handleDisplayClick}
          onDownloadClick={handleDownloadClick}
        />
      </div>
      <div className={`${styles.stepActionButtons} ${styles.step4Buttons}`}>
        <div className={styles.actionButtonRow}>
          <CommonButton
            onClick={onSubmit}
            variant="primary"
            className={styles.fullWidthButton}
            disabled={!termsViewed}
          >
            告知内容の入力へ
            {/*  意向確認へ 
            DECIDE if applications contain HONIN
            */}
          </CommonButton>
        </div>
        {/* <div className={styles.actionButtonRow}>
          <CommonButton
            onClick={onBack}
            variant="outline"
            className={styles.fullWidthButton}
          >
            戻る
          </CommonButton>
        </div> */}
      </div>
    </div>
  );
};

export default StepTerms;
