import React from "react";
import CommonButton from "@/components/CommonButton";
import TextCard from "@/components/TextCard";
import styles from "./SubmitIdentity.module.css";
import { useLocation } from "react-router-dom";
import IdentityVerifyFilesUpload from "@/components/IdentityVerifyFilesUpload";
import { IDENTITY_VERIFY_CONTENT } from "@/constants/identity";


//const userType = localStorage.getItem("userType") || "insured";
// TODO: refactor this
const SubmitIdentity: React.FC = () => {
  const handleFilesChange = (files: (File | null)[]) => {
    console.log("已上传文件:", files);
  };

  return (
    <div className={styles.submitIdentityPage}>
      <TextCard
        title="本人確認書類の提出"
      >
        <div className={styles.submitIdentityContent}>
            <div className={styles.h4Style}>
                被保険者の本人情報を確認するため、次に記載している本人確認書類をアップロードしてください。
            </div>
            <IdentityVerifyFilesUpload
              sections={IDENTITY_VERIFY_CONTENT.IDENTITY_CONTENT}
              fileNumber={IDENTITY_VERIFY_CONTENT.fileNumber}
              prefix={true}
              onFilesChange={handleFilesChange}
            />
          </div>
      </TextCard>

      <div className={styles.actionButtons}>
        {/*  <div className={styles.actionButtonRow}> */}
        <CommonButton
          to="/application"
          variant="primary"
          className={styles.fullWidthButton}
          /*  disabled={state.applications.length === 0} */
        >
          申込一覧へ
        </CommonButton>
        
        <CommonButton
          to="/privacy"
          variant="secondary"
          className={styles.fullWidthButton}
        >
          戻る
        </CommonButton>
      </div>
    </div>
  );
};

export default SubmitIdentity;
