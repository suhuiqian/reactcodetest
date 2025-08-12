import React from "react";
import SuccessIcon from "@/components/SuccessIcon";
import styles from "./Success.module.css";
import { useLocation } from "react-router-dom";

type OperationType = "createAccountSuccess" ;


const getSuccessContent = (operationType: OperationType) => {
  switch (operationType) {
    default:
      return {
        title: "アカウント登録が完了しました",
        items: [],
      };
  }
};

const CreateAccountSuccess: React.FC = () => {

  const content = getSuccessContent("createAccountSuccess");

  return (
    <div className={styles.successPage}>
      <div className={styles.successContent}>
        <div className={styles.successIcon}>
          <SuccessIcon size="large" />
        </div>

        <div className={styles.successText}>
          <div className={styles.successTextHead}>{content.title}</div>
          {content.items.map((item, index) => (
            <div key={index} className={styles.successTextItem}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateAccountSuccess;
