import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "../FormCard";
import CommonButton from "../CommonButton";
import CancelConfirmationDialog from "../CancelConfirmationDialog";
import styles from "@/pages/application/Application.module.css";
import { useApplication } from "@/contexts/ApplicationContext";
import ApplicationList from "../ApplicationList";
import TextCard from "../TextCard";
import type { InsuredBeneficiaryPairData } from "@/types";
import InsuredBeneficiaryPairViewModal from "./InsuredBeneficiaryPairViewModal";
import { INSURANCE_CONTENT } from "@/constants/insuranceContent";
import { checkApplication } from "./StepOverviewData";
import { showConfirmDialog } from "@/components/GeneralPopup";

interface StepConfirmationProps {
  onSubmit: () => void;
  onBack: () => void;
  onTempSave: () => void;
  useType?: "insured" | "applicant";
}

// Helper function to convert date format from YYYY/MM/DD to YYYY-MM-DD
const convertDateFormat = (dateString: string) => {
  return dateString.replace(/\//g, "-");
};

const StepConfirmation: React.FC<StepConfirmationProps> = ({
  onSubmit,
  onBack,
  useType = "applicant",
}) => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [mode, setMode] = useState<"confirmation" | "view">("confirmation");
  const [viewingPair, setViewingPair] = useState<
    InsuredBeneficiaryPairData | undefined
  >();
  const {
    state: { applications },
  } = useApplication();

  const handleView = (id: string) => {
    const pair = applications.find((app) => app.id === id);
    if (pair) {
      setViewingPair(pair);
      setMode("view");
    }
  };

  const handleCloseView = () => {
    setViewingPair(undefined);
    setMode("confirmation");
  };

  const policyholderFields = [
    { label: "氏名", value: "佐藤太郎", type: "text" as const },
    {
      label: "生年月日",
      value: convertDateFormat("1990/05/11"),
      type: "date" as const,
    },
    { label: "性別", value: "男性", type: "text" as const },
    {
      label: "住所",
      value: "〒0510011北海道中央町2-3-13",
      type: "text" as const,
    },
    { label: "電話番号", value: "0510000001", type: "tel" as const },
    {
      label: "メールアドレス",
      value: "tanaka112@mailto.plus",
      type: "email" as const,
    },
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  };

  return (
    <div className={styles.stepContent}>
      {mode === "confirmation" && (
        <>
          <div className={styles.infoCardsGrid}>
            <FormCard title="契約者" fields={policyholderFields} />
            {/* <FormCard title="保険料" fields={premiumFields} /> */}
            {useType === "applicant" ? (
              <TextCard title="被保険者・死亡保険金受取人">
                <ApplicationList
                  onView={handleView}
                  onEdit={() => {
                    // No edit functionality in confirmation step
                  }}
                  onDelete={() => {
                    // No delete functionality in confirmation step
                  }}
                  onAddNew={() => {
                    // No add functionality in confirmation step
                  }}
                  isReadOnly={true}
                />
              </TextCard>
            ) : (
              <>
                <FormCard title="被保険者" fields={checkApplication.insured} />
                <FormCard
                  title="保険料"
                  fields={[
                    {
                      label: "保険料（月払）",
                      value: "590円",
                      type: "text" as const,
                    },
                  ]}
                />
                <FormCard
                  title="死亡保険金受取人"
                  fields={checkApplication.beneficiary}
                />
              </>
            )}
            <TextCard
              title="保障内容"
              benefitSections={INSURANCE_CONTENT.BENEFITS_DESCRIPTION}
              prefix={false}
            />
          </div>
          <ul className={styles.noteUl}>
            <li className={styles.note}>
              告知完了が締切日（毎月10日）を過ぎると、契約開始日が翌月に繰り越されます。
            </li>
          </ul>
          <div className={styles.confirmationCheckboxContainer}>
            <label className={styles.confirmationCheckboxLabel}>
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={handleCheckboxChange}
              />
              <p
                className={styles.confirmationCheckboxText}
                style={{
                  color: "#F00",
                }}
              >
                上記内容がご意向に沿った内容となっていることを確認されましたら、チェックしてください。
              </p>
            </label>
          </div>

          <div className={`${styles.stepActionButtons} ${styles.step5Buttons}`}>
            <div className={styles.actionButtonRow}>
              <CommonButton
                onClick={onSubmit}
                variant="primary"
                className={styles.fullWidthButton}
                disabled={!isConfirmed}
              >
                {useType === "insured" ? "同意する" : "申込する"}
              </CommonButton>
            </div>
            <div className={styles.Precautions}>
              {useType === "applicant"
                ? "申込情報を修正する場合は、申込情報一覧に戻るを押下してください。"
                : "同意しない場合は、以下の「取消す」ボタンを押してください。"}
            </div>
            <div className={styles.actionButtonRow}>
              {useType === "applicant" ? (
                <CommonButton
                  onClick={onBack}
                  variant="secondary"
                  className={styles.fullWidthButton}
                >
                  申込情報一覧に戻る
                </CommonButton>
              ) : (
                // <CancelConfirmationDialog
                //   title="申込のキャンセル確認"
                //   description="申込手続きをキャンセルしますか？入力された情報は全て削除され、復元できません。"
                //   confirmText="はい、キャンセルします"
                //   cancelText="いいえ、続行します"
                //   onConfirm={() => {
                //     void navigate("/success", {
                //       state: { operationType: "insured-cancel" },
                //     });
                //   }}
                // >
                //   <CommonButton
                //     variant="secondary"
                //     className={styles.fullWidthButton}
                //   >
                //     取消す
                //   </CommonButton>
                // </CancelConfirmationDialog>

                <CommonButton
                  variant="primary"
                  className={styles.fullWidthButton}
                  onClick={() => {
                    showConfirmDialog(
                      "",
                      {
                        title: "本当に取消しますか？",
                        confirmText: "はい",
                        cancelText: "いいえ",
                        type: "warning",
                        order: "desc",
                        onConfirm: () => {
                          void navigate("/success", {
                            state: { operationType: "insured-cancel" },
                          });
                        },
                        onCancel: () => {
                          // Optional: Handle cancel action if needed
                          console.log("キャンセルされました");
                        },
                      }
                    );
                  }}
                >
                  取消す
                </CommonButton>
              )}
            </div>
          </div>
        </>
      )}
      {mode === "view" && viewingPair && (
        <InsuredBeneficiaryPairViewModal
          onClose={handleCloseView}
          data={viewingPair}
          mode="view"
        />
      )}
    </div>
  );
};

export default StepConfirmation;
