import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./MedicalCertificateConfirmation.module.css";

const MedicalCertificateConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleContinue = () => {
    if (isConfirmed) {
      navigate("/claims/new");
    }
  };

  const handleBack = () => {
    navigate("/claims/medical-reminder");
  };

  return (
    <div className={styles.confirmationPage}>
      <div className={styles.confirmationContainer}>
        <div className={styles.header}>
          <h2>診断書確認</h2>
          <p>保険会社による診断書の確認について</p>
        </div>

        <div className={styles.content}>
          {/* Main Message */}
          <div className={styles.mainMessage}>
            <div className={styles.messageIcon}>🔍</div>
            <h3>診断書の確認について</h3>
            <p>
              保険金請求の審査において、提出いただいた診断書の内容を確認させていただきます。
              この確認は、保険金の適正な支払いを確保するための重要なプロセスです。
            </p>
          </div>

          {/* Confirmation Box */}
          <div className={styles.confirmationBox}>
            <div className={styles.confirmationHeader}>
              <span className={styles.confirmationIcon}>✅</span>
              <h4>確認事項</h4>
            </div>
            <div className={styles.confirmationContent}>
              <p>
                以下の事項について、ご理解いただいた上でチェックボックスにチェックを入れてください。
              </p>
              <ul className={styles.confirmationList}>
                <li>
                  提出する診断書は、保険金請求の対象となる疾病や事故に関連する正式な書類であることを確認しました
                </li>
                <li>
                  診断書に記載されている情報は、すべて正確で真実であることを確認しました
                </li>
                <li>
                  診断書の提出により、保険会社が医療機関に直接確認を行う場合があることを理解しました
                </li>
                <li>
                  虚偽の情報提供や書類の偽造は、保険金の支払い拒否や契約解除の原因となることを理解しました
                </li>
                <li>
                  提出した書類は、保険金請求の審査目的でのみ使用されることを理解しました
                </li>
              </ul>
            </div>
          </div>

          {/* Checkbox */}
          <div className={styles.checkboxSection}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>
                上記の確認事項をすべて理解し、同意いたします
              </span>
            </label>
          </div>

          {/* Additional Information */}
          <div className={styles.additionalInfo}>
            <h4>診断書確認の流れ</h4>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h5>書類提出</h5>
                  <p>診断書をオンラインでアップロード</p>
                </div>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h5>内容確認</h5>
                  <p>保険会社が診断書の内容を確認</p>
                </div>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h5>医療機関確認</h5>
                  <p>必要に応じて医療機関に直接確認</p>
                </div>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h5>審査完了</h5>
                  <p>審査結果の通知</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className={styles.warningBox}>
            <div className={styles.warningIcon}>⚠️</div>
            <div className={styles.warningContent}>
              <h4>ご注意</h4>
              <p>
                診断書の確認には通常3-5営業日かかります。
                確認の結果、追加書類の提出をお願いする場合があります。
                その際は、メールまたはお電話でご連絡いたします。
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <CommonButton
            variant="outline"
            onClick={handleBack}
            className={styles.backButton}
          >
            戻る
          </CommonButton>
          <CommonButton
            variant="primary"
            onClick={handleContinue}
            disabled={!isConfirmed}
            className={styles.continueButton}
          >
            保険金請求を開始する
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default MedicalCertificateConfirmation;
