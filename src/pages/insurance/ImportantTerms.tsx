import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../components/CommonButton";
import TextTitle from "../../components/TextTitle";
import TextWithPdfButtons from "../../components/TextWithPdfButtons";
import styles from "./ImportantTerms.module.css";

const ImportantTerms: React.FC = () => {
  const navigate = useNavigate();

  const handleAgreeAndApply = () => {
    console.log("同意して申し込む clicked");
    // Navigate to account page or next step
    // todo
    void navigate("/dashboard");
  };

  const handleDisplayClick = () => {};

  const handleDownloadClick = () => {};

  return (
    <div className={styles["importantTerms-page"]}>
      <TextTitle text="重要事項等のご説明" />
      <TextWithPdfButtons
        text="重要事項（契約概要・注意喚起情報）、保険商品の「重要事項（契約概要・注意喚起情報）」について全てのページの内容を十分にご確認ください。"
        pdfTitle="重要事項等のご説明"
        onDisplayClick={handleDisplayClick}
        onDownloadClick={handleDownloadClick}
      />

      <TextTitle text="約款のご説明" />
      <TextWithPdfButtons
        text="保険商品の「約款」について全てのページの内容を十分にご確認ください。"
        pdfTitle="約款"
        onDisplayClick={handleDisplayClick}
        onDownloadClick={handleDownloadClick}
      />

      <div className={styles["action-buttons"]}>
        <CommonButton onClick={handleAgreeAndApply} className="back-button">
          戻る
        </CommonButton>
      </div>
    </div>
  );
};

export default ImportantTerms;
