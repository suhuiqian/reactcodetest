import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import TextTitle from "@/components/TextTitle";
import TextWithPdfButtons from "@/components/TextWithPdfButtons";
import styles from "./ContractDetails.module.css";

const ContractDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleDisplayClick = () => {
    //console.log("契約内容を表示");
    // TODO: Implement PDF display functionality
  };

  const handleDownloadClick = () => {
    //console.log("契約内容をダウンロード");
    // TODO: Implement PDF download functionality
  };

  return (
    <div className={styles.contractDetailsPage}>
      <TextTitle text="契約内容について" />

      <div className={styles.contractIntro}>
        <p>
          このたびはご加入いただきまして、誠にありがとうございます。
          契約内容は以下のとおりです。
        </p>
      </div>

      <TextWithPdfButtons
        text="契約内容の詳細については、以下のPDFファイルでご確認いただけます。"
        pdfTitle="契約内容"
        onDisplayClick={handleDisplayClick}
        onDownloadClick={handleDownloadClick}
      />

      <div className={styles.actionButtons}>
        <CommonButton onClick={handleBack} className={styles.backButton}>
          戻る
        </CommonButton>
      </div>
    </div>
  );
};

export default ContractDetails;
