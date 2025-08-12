import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./MedicalCertificateReminder.module.css";

const MedicalCertificateReminder: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/claims/medical-confirmation");
  };

  const handleBack = () => {
    navigate("/claims");
  };

  return (
    <div className={styles.reminderPage}>
      <div className={styles.reminderContainer}>
        <div className={styles.header}>
          <h2>診断書提出の注意事項</h2>
          <p>
            保険金請求に必要な診断書の提出について、以下の点にご注意ください
          </p>
        </div>

        <div className={styles.content}>
          {/* First Notice Box */}
          <div className={styles.noticeBox}>
            <div className={styles.noticeHeader}>
              <span className={styles.noticeIcon}>⚠️</span>
              <h3>診断書の提出について</h3>
            </div>
            <div className={styles.noticeContent}>
              <p>
                保険金請求の審査を迅速に行うため、以下の書類の提出をお願いいたします。
                診断書は、保険金請求の根拠となる重要な書類です。正確で詳細な情報を含む診断書を
                ご提出いただくことで、審査の進行がスムーズになります。
              </p>
              <p>
                診断書は、保険金請求の対象となる疾病や事故に関連する医療機関で発行された
                正式な書類である必要があります。コピーや手書きのメモは受け付けできません。
                また、診断書には医師の署名と医療機関の印鑑が必要です。
              </p>
              <p>
                提出いただいた診断書は、保険金請求の審査目的でのみ使用されます。
                個人情報の取り扱いについては、当社のプライバシーポリシーに従って
                適切に管理いたします。
              </p>
            </div>
          </div>

          {/* Second Notice Box */}
          <div className={styles.noticeBox}>
            <div className={styles.noticeHeader}>
              <span className={styles.noticeIcon}>📋</span>
              <h3>診断書に記載が必要な項目</h3>
            </div>
            <div className={styles.noticeContent}>
              <p>
                診断書には以下の項目が必ず記載されている必要があります。
                記載が不十分な場合は、追加書類の提出をお願いする場合があります。
              </p>
              <ul className={styles.requirementList}>
                <li>患者氏名（保険契約者と同一であること）</li>
                <li>生年月日</li>
                <li>診断名（ICD-10コードがある場合は併記）</li>
                <li>発症日または初診日</li>
                <li>治療内容（手術の場合は手術名、入院の場合は入院期間）</li>
                <li>治療経過</li>
                <li>予後（治癒、改善、悪化等）</li>
                <li>医師の署名</li>
                <li>医療機関名と印鑑</li>
                <li>診断書作成日</li>
              </ul>
              <p>
                診断書の有効期限は発行日から3ヶ月以内となっております。
                古い診断書は受け付けできませんので、ご注意ください。
                また、診断書は日本語で記載されている必要があります。
                外国語で記載されている場合は、日本語訳を添付してください。
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className={styles.additionalInfo}>
            <h4>その他の注意事項</h4>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>提出期限:</span>
                <span className={styles.infoValue}>保険金請求から30日以内</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>提出方法:</span>
                <span className={styles.infoValue}>オンラインアップロード</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ファイル形式:</span>
                <span className={styles.infoValue}>PDF, JPG, PNG</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ファイルサイズ:</span>
                <span className={styles.infoValue}>最大10MB</span>
              </div>
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
            className={styles.continueButton}
          >
            次へ進む
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default MedicalCertificateReminder;
