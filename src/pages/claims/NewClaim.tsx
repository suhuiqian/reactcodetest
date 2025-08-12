import React, { useState, useEffect } from "react";
import CommonButton from "@/components/CommonButton";
import SuccessIcon from "@/components/SuccessIcon";
import styles from "./NewClaim.module.css";

interface ClaimFormData {
  diagnosisDocument: File | null;
  disabilityDocument: File | null;
  accountNameSei: string;
  accountNameMei: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  accountType: string;
}

const NewClaim: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ClaimFormData>({
    diagnosisDocument: null,
    disabilityDocument: null,
    accountNameSei: "",
    accountNameMei: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    accountType: "",
  });

  const [devMode, setDevMode] = useState(false);

  const totalSteps = 4;

  const updateFormData = (
    field: keyof ClaimFormData,
    value: File | string | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const autofill = () => {
    updateFormData("bankName", "みずほ銀行");
    updateFormData("branchName", "渋谷支店");
    updateFormData("accountType", "普通預金");
    updateFormData("accountNumber", "1234567");
    updateFormData("accountNameSei", "ヤマダ");
    updateFormData("accountNameMei", "タロウ");
  };

  const handleFileUpload =
    (field: "diagnosisDocument" | "disabilityDocument") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert("ファイルサイズは5MB以下にしてください。");
          return;
        }
        // Check file type
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/heic",
          "application/pdf",
        ];
        if (!allowedTypes.includes(file.type)) {
          alert(
            "アップロード可能な形式はjpeg、heic、jpg、png、gif、pdfになります。"
          );
          return;
        }
        updateFormData(field, file);
      }
    };

  const removeDocument = (
    field: "diagnosisDocument" | "disabilityDocument"
  ) => {
    updateFormData(field, null);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // change URL and render HEADER text based on URL
      window.history.pushState(null, "", `#step${currentStep + 1}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In real app, this would submit to API
    console.log("Submitting claim:", formData);
    nextStep(); // Go to success step
  };

  const renderStepIndicator = () => (
    <div className={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className={styles.stepItem}>
          <div
            className={`${styles.stepCircle} ${
              currentStep >= step ? styles.active : ""
            }`}
          >
            {step}
          </div>
          <div className={styles.stepLabel}>
            {step === 1 && "必要書類アップロード"}
            {step === 2 && "受取口座入力"}
            {step === 3 && "入力内容確認"}
            {step === 4 && "請求完了"}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div id="step1" className={styles.stepContent}>
      <h3>必要書類アップロード</h3>

      <div className={styles.documentSection}>
        <div className={styles.documentGroup}>
          <h4>診断書</h4>
          <p className={styles.documentDescription}>
            医療機関にて証明いただいた診断書をアップロードください。
          </p>

          {formData.diagnosisDocument ? (
            <div className={styles.uploadedFile}>
              <span className={styles.fileIcon}>📄</span>
              <span className={styles.fileName}>
                {formData.diagnosisDocument.name}
              </span>
              <span className={styles.fileSize}>
                ({(formData.diagnosisDocument.size / 1024 / 1024).toFixed(2)}{" "}
                MB)
              </span>
              <button
                type="button"
                onClick={() => removeDocument("diagnosisDocument")}
                className={styles.removeButton}
              >
                削除
              </button>
            </div>
          ) : (
            <div className={styles.uploadArea}>
              <input
                type="file"
                onChange={handleFileUpload("diagnosisDocument")}
                accept=".pdf,.jpg,.jpeg,.png,.gif,.heic"
                id="diagnosis-upload"
                className={styles.fileInput}
              />
              <label htmlFor="diagnosis-upload" className={styles.uploadLabel}>
                <div className={styles.uploadIcon}>📁</div>
                <div className={styles.uploadText}>
                  <strong>ファイルアップロード</strong>
                </div>
              </label>
            </div>
          )}
        </div>

        <div className={styles.documentGroup}>
          <h4>障害・要介護認定を証明する書類</h4>
          <p className={styles.documentDescription}>
            障害・要介護認定を証明する書類をアップロードしてください。
            <br />
            （障害者手帳・介護被保険者証等）
          </p>
          <p className={styles.documentNote}>
            ※障害・介護状態による請求のみ「障害・要介護認定を証明する書類」を
            アップロードしてください。
          </p>

          {formData.disabilityDocument ? (
            <div className={styles.uploadedFile}>
              <span className={styles.fileIcon}>📄</span>
              <span className={styles.fileName}>
                {formData.disabilityDocument.name}
              </span>
              <span className={styles.fileSize}>
                ({(formData.disabilityDocument.size / 1024 / 1024).toFixed(2)}{" "}
                MB)
              </span>
              <button
                type="button"
                onClick={() => removeDocument("disabilityDocument")}
                className={styles.removeButton}
              >
                削除
              </button>
            </div>
          ) : (
            <div className={styles.uploadArea}>
              <input
                type="file"
                onChange={handleFileUpload("disabilityDocument")}
                accept=".pdf,.jpg,.jpeg,.png,.gif,.heic"
                id="disability-upload"
                className={styles.fileInput}
              />
              <label htmlFor="disability-upload" className={styles.uploadLabel}>
                <div className={styles.uploadIcon}>📁</div>
                <div className={styles.uploadText}>
                  <strong>ファイルアップロード</strong>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className={styles.attentionBox}>
        <h4>【注意】</h4>
        <ul>
          <li>請求に必要な書類すべてを撮影し、アップロードしてください。</li>
          <li>ファイルサイズの上限が５MBです。</li>
          <li>
            アップロード可能な形式はjpeg、heic、jpg、png、gif、pdfになります。
          </li>
        </ul>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div id="step2" className={styles.stepContent}>
      <div className={styles.noticeBox}>
        <p>※被保険者さまご本人名義の口座を入力してください。</p>
      </div>

      <div className={styles.accountForm}>
        <div className={styles.formGroup}>
          <label>
            金融機関名 <span className={styles.required}>必須</span>
          </label>
          <select
            value={formData.bankName}
            onChange={(e) => updateFormData("bankName", e.target.value)}
            required
            className={
              formData.bankName === "" ? styles.colorGrey : styles.colorBlack
            }
          >
            <option value="">選択してください</option>
            <option value="みずほ銀行">みずほ銀行</option>
            <option value="三菱UFJ銀行">三菱UFJ銀行</option>
            <option value="三井住友銀行">三井住友銀行</option>
            <option value="りそな銀行">りそな銀行</option>
            <option value="ゆうちょ銀行">ゆうちょ銀行</option>
            <option value="その他">その他</option>
          </select>
          {formData.bankName === "ゆうちょ銀行" && (
            <p className={styles.bankNote}>
              ゆうちょ銀行をご利用の場合、記号番号から振込用の店名・口座種別・口座番号をお調べください。
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>
            支店名 <span className={styles.required}>必須</span>
          </label>
          <select
            value={formData.branchName}
            onChange={(e) => updateFormData("branchName", e.target.value)}
            required
            className={
              formData.branchName === "" ? styles.colorGrey : styles.colorBlack
            }
          >
            <option value="">選択してください</option>
            <option value="渋谷支店">渋谷支店</option>
            <option value="新宿支店">新宿支店</option>
            <option value="池袋支店">池袋支店</option>
            <option value="銀座支店">銀座支店</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>
            口座種別 <span className={styles.required}>必須</span>
          </label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="accountType"
                value="普通預金"
                checked={formData.accountType === "普通預金"}
                onChange={(e) => updateFormData("accountType", e.target.value)}
                required
              />
              <span className={styles.customRadio}></span>
              <span>普通預金</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="accountType"
                value="貯蓄預金"
                checked={formData.accountType === "貯蓄預金"}
                onChange={(e) => updateFormData("accountType", e.target.value)}
                required
              />
              <span>貯蓄預金</span>
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>
            口座番号 <span className={styles.required}>必須</span>
          </label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => updateFormData("accountNumber", e.target.value)}
            maxLength={7}
            required
          />
          <p className={styles.inputNote}>
            ※口座番号が７桁未満の場合は、左に０をつけて７桁を入力してください。
          </p>
        </div>

        <div className={styles.formGroup}>
          <label>
            口座名義人名 <span className={styles.required}>必須</span>
          </label>
          <div className={styles.nameInputs}>
            <div className={styles.nameField}>
              <input
                type="text"
                value={formData.accountNameSei || ""}
                onChange={(e) =>
                  updateFormData("accountNameSei", e.target.value)
                }
                placeholder="セイ"
                required
              />
            </div>
            <div className={styles.nameField}>
              <input
                type="text"
                value={formData.accountNameMei || ""}
                onChange={(e) =>
                  updateFormData("accountNameMei", e.target.value)
                }
                placeholder="メイ"
                required
              />
            </div>
          </div>
          <p className={styles.inputNote}>※全角カタカナで入力してください。</p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div id="step3" className={styles.stepContent}>
      <h3>入力内容確認</h3>

      <div className={styles.confirmationSection}>
        <div className={styles.confirmationBlock}>
          <h4>診断書・必要書類</h4>
          <div className={styles.documentList}>
            {formData.diagnosisDocument && (
              <div className={styles.documentItem}>
                {formData.diagnosisDocument.name}
              </div>
            )}
            {formData.disabilityDocument && (
              <div className={styles.documentItem}>
                {formData.disabilityDocument.name}
              </div>
            )}
            {!formData.diagnosisDocument && !formData.disabilityDocument && (
              <div className={styles.noDocuments}>
                アップロードされた書類がありません
              </div>
            )}
          </div>
        </div>

        <div className={styles.confirmationBlock}>
          <h4>受取口座に関する情報</h4>
          <div className={styles.accountInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>
                金融機関名 <span className={styles.required}>必要</span>
              </span>
              <span className={styles.infoValue}>
                {formData.bankName || "未入力"}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>
                支店名 <span className={styles.required}>必要</span>
              </span>
              <span className={styles.infoValue}>
                {formData.branchName || "未入力"}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>
                口座種別 <span className={styles.required}>必要</span>
              </span>
              <span className={styles.infoValue}>
                {formData.accountType || "未選択"}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>
                口座番号 <span className={styles.required}>必要</span>
              </span>
              <span className={styles.infoValue}>
                {formData.accountNumber || "未入力"}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>
                口座名義人名 <span className={styles.required}>必要</span>
              </span>
              <span className={styles.infoValue}>
                {formData.accountNameSei && formData.accountNameMei
                  ? `${formData.accountNameSei} ${formData.accountNameMei}`
                  : "未入力"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div id="step4" className={styles.successContent}>
      <h3>給付金の請求書手続きを承りました。</h3>
      <SuccessIcon size="large" />
      <div className={styles.successMessage}>
        <p>
          審査程における確認事項や審査結果等につきましては、ご登録のメールアドレスにご連絡いたします。
        </p>
        <p>お手数ですが、ご確認いただきますようお願いいたします。</p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.diagnosisDocument !== null;
    }
    if (currentStep === 2) {
      return (
        formData.accountNameSei &&
        formData.accountNameMei &&
        formData.bankName &&
        formData.branchName &&
        formData.accountType &&
        formData.accountNumber
      );
    }
    return true;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  return (
    <div className={styles.newClaimPage}>
      <div className={styles.newClaimContainer}>
        {currentStep <= 4 && renderStepIndicator()}

        <div className={styles.content}>{renderCurrentStep()}</div>
        {import.meta.env.MODE !== "production" && localStorage.getItem("devMode") === "true" && (
          <div className={styles.devControls}>
            <label>
              <input
                type="checkbox"
                checked={devMode}
                onChange={(e) => setDevMode(e.target.checked)}
              />
              開発モード
            </label>

            {devMode && (
              <div className={styles.devNavigation}>
                <button onClick={() => setCurrentStep(1)}>Step 1</button>

                <button onClick={() => setCurrentStep(2)}>Step 2</button>
                <button onClick={() => setCurrentStep(3)}>Step 3</button>
                <button onClick={() => setCurrentStep(4)}>Step 4</button>
                {currentStep === 2 && (
                  <button onClick={() => autofill()}>自動入力</button>
                )}
              </div>
            )}
          </div>
        )}

        {currentStep <= 4 && (
          <div className={styles.actionButtons}>
            {currentStep < 3 && (
              <CommonButton
                variant="primary"
                onClick={nextStep}
                disabled={!canProceed()}
                className={styles.nextButton}
              >
                {currentStep === 2 ? "入力内容のご確認へ" : "次へ"}
              </CommonButton>
            )}
            {currentStep === 3 && (
              <CommonButton
                variant="primary"
                onClick={handleSubmit}
                className={styles.submitButton}
              >
                この内容で保険金を請求する
              </CommonButton>
            )}
            {currentStep > 1 && currentStep < 4 && (
              <CommonButton
                variant="outline"
                onClick={prevStep}
                className={styles.prevButton}
              >
                戻る
              </CommonButton>
            )}
            {currentStep === 4 && (
              <CommonButton
                variant="primary"
                to="/dashboard"
                className={styles.completeButton}
              >
                TOPに戻る
              </CommonButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewClaim;
