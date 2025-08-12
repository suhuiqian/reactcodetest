import React from "react";
import styles from "./ApplicationCard.module.css";
import type { InsuredBeneficiaryPairData } from "@/types";
import { showSuccessPopup } from "@/components/GeneralPopup";
import CommonButton from "@/components/CommonButton";

interface ApplicationCardProps {
  application: InsuredBeneficiaryPairData;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isReadOnly?: boolean;
  isNew?: boolean;
}

const STATUS_INDICATOR_MAP = {
  draft: {
    label: "未告知",
  },
  notified: {
    label: "告知済",
  },
  submitted: {
    label: "提出済",
  },
  approved: {
    label: "承認済",
  },
  rejected: {
    label: "取消/謝絶",
  },
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onView,
  onEdit,
  onDelete,
  isReadOnly = false,
  isNew = true,
}) => {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()}円`;
  };

  /*  const location = useLocation();
  const isConfirmFlag = location.state?.isConfirmFlag; */

  const getBeneficiaryName = () => {
    const { beneficiary } = application;
    return (
      `${beneficiary.lastName || ""} ${beneficiary.firstName || ""}`.trim() ||
      "未入力"
    );
  };

  const getInsuredName = () => {
    const { insured } = application;
    return (
      `${insured.lastName || ""} ${insured.firstName || ""}`.trim() || "未入力"
    );
  };

  const onResendEmail = () => {
    //call api send email
    showSuccessPopup(
      "被保険者宛に告知リクエストメールをお送りしておりますので、ご確認をお願いいたします。"
    );
    /*  console.log(`Resending email for application ${application.id}`); */
  };

  if (isNew) {
    return (
      <div className={styles.applicationCard}>
        <div className={styles.infoGrid}>
          <div className={styles.infoLabel}>被保険者</div>
          <div className={styles.infoValue}>{getInsuredName()}</div>
          <div className={styles.infoLabel}>死亡保険受取人</div>
          <div className={styles.infoValue}>{getBeneficiaryName()}</div>
          <div className={styles.infoLabel}>保険料</div>
          <div className={styles.infoValue}>
            {formatCurrency(application.premium ?? 0)}
          </div>
        </div>
        <div className={styles.rowButtons}>
          <CommonButton
            variant="primary"
            onClick={() => {
              onView(application.id);
            }}
            size="compact"
          >
            確認
          </CommonButton>
          {!isReadOnly && (
            <>
              <CommonButton
                variant="primary"
                onClick={() => {
                  onEdit(application.id);
                }}
                size="compact"
              >
                修正
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => {
                  onDelete(application.id);
                }}
                size="compact"
              >
                削除
              </CommonButton>
            </>
          )}
        </div>
      </div>
    );
  }

  // if (mode === 'resume') // NEED THIS LINE OR NOT?

  return (
    <div className={styles.applicationCard}>
      <div className={styles.applicationStatus}>
        <p>被保険者の告知状況</p>
        <div
          className={`${styles.statusIndicator} ${
            application.status === "draft"
              ? styles.statusDraft
              : application.status === "notified"
              ? styles.statusNotified
              : application.status === "submitted"
              ? styles.statusSubmitted
              : application.status === "approved"
              ? styles.statusApproved
              : styles.statusRejected
          }`}
        >
          <span className={styles.statusLabel}>
            {STATUS_INDICATOR_MAP[application.status].label}
          </span>
        </div>
      </div>
      <div className={styles.infoGrid}>
        <div className={styles.infoLabel}>被保険者</div>
        <div className={styles.infoValue}>{getInsuredName()}</div>
        <div className={styles.infoLabel}>死亡保険受取人</div>
        <div className={styles.infoValue}>{getBeneficiaryName()}</div>
        <div className={styles.infoLabel}>保険料</div>
        <div className={styles.infoValue}>{formatCurrency(fee)}</div>
      </div>
      <div className={styles.rowButtons}>
        <CommonButton
          variant="primary"
          onClick={() => {
            onView(application.id);
          }}
          size="compact"
        >
          確認
        </CommonButton>
        {application.status === "draft" && (
          <>
            <CommonButton
              variant="primary"
              onClick={() => {
                onEdit(application.id);
              }}
              size="compact"
            >
              修正
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => {
                onResendEmail();
              }}
              size="small"
            >
              告知メール再送信
            </CommonButton>
          </>
        )}
      </div>
      {application.status === "draft" && (
        <ul className={styles.pointsList}>
          <li className={styles.point}>
            被保険者のメールアドレスを修正したい場合や、被保険者に告知メールを再送信したい場合は、「告知メール再送信」ボタンを押下してください。
          </li>
        </ul>
      )}
    </div>
  );
};

export default ApplicationCard;
