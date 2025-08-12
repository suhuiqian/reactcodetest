import React from "react";
import SuccessIcon from "@/components/SuccessIcon";
import styles from "./Success.module.css";
import { useLocation } from "react-router-dom";

type OperationType = "applicant-success" | "insured-success" | "insured-cancel";

interface SuccessPageState {
  operationType?: OperationType;
}

const getSuccessContent = (operationType: OperationType) => {
  switch (operationType) {
    case "applicant-success":
      return {
        title: "お申し込みを受け付けました。",
        items: [
          "申込内容の確認後、契約成立のご案内およびマイページのURLをご登録のメールアドレスあてお送りいたします。",
          "被保険者様宛に告知リクエストメールをお送りしております。",
          "被保険者様から告知いただいた後、順次、告知内容についての査定を開始いたします。",
        ],
      };
    case "insured-success":
      return {
        title: "お手続きが完了しました",
        items: [],
      };
    case "insured-cancel":
      return {
        title: "取消しました。",
        items: [
         
        ],
      };
    default:
      return {
        title: "処理が完了しました",
        items: [],
      };
  }
};

const Success: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as SuccessPageState;
  const operationType: OperationType =
    locationState.operationType ?? "applicant-success";

  const content = getSuccessContent(operationType);

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

export default Success;
