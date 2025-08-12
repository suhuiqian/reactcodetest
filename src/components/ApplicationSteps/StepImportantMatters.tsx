import React, { useState } from "react";
import TextTitle from "../TextTitle";
import TextWithPdfButtons from "../TextWithPdfButtons";
import CommonButton from "../CommonButton";
import styles from "../../pages/application/Application.module.css";

interface StepImportantMattersProps {
  onGoToTerms: () => void;
  onBack: () => void;
  onTempSave?: () => void;
}

const StepImportantMatters: React.FC<StepImportantMattersProps> = ({
  onGoToTerms,
  onBack,
}) => {
  const [importantMattersViewed, setImportantMattersViewed] = useState(false);

  const handleDisplayClick = () => {
    setImportantMattersViewed(true);
  };

  const handleDownloadClick = () => {
    // setImportantMattersViewed(true);
  };

  return (
    <div className={styles.stepContent}>
      <div className={styles.stepContentCard}>
        <TextTitle text="重要事項等のご説明" />
        <TextWithPdfButtons
          text="お申込みいただく保険商品の「重要事項」について全てのページの内容を十分にご確認ください。"
          pdfTitle="重要事項等のご説明"
          onDisplayClick={handleDisplayClick}
          onDownloadClick={handleDownloadClick}
        />
      </div>
      <div className={`${styles.stepActionButtons} ${styles.step3Buttons}`}>
        <div className={styles.actionButtonRow}>
          <CommonButton
            onClick={onGoToTerms}
            variant="primary"
            className={styles.fullWidthButton}
            disabled={!importantMattersViewed}
          >
            約款の確認へ
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

export default StepImportantMatters;
