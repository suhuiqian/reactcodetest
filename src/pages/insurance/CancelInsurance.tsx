import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../components/CommonButton";
import SuccessIcon from "../../components/SuccessIcon";
import styles from "./CancelInsurance.module.css";

interface Insurance {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  premium: number;
  coverage: string;
  details: string;
}

const mockInsurances: Insurance[] = [
  {
    id: "INS001",
    name: "契約内容①",
    type: "終身保険",
    startDate: "2024/01/15",
    endDate: "終身",
    premium: 15000,
    coverage: "死亡保険金 1,000万円",
    details:
      "終身保険の詳細情報がここに表示されます。保障内容、保険料、特約などの詳細をご確認いただけます。",
  },
  {
    id: "INS002",
    name: "契約内容②",
    type: "医療保険",
    startDate: "2024/03/20",
    endDate: "2029/03/20",
    premium: 8000,
    coverage: "入院給付金 日額5,000円",
    details:
      "医療保険の詳細情報がここに表示されます。入院保障、手術保障、通院保障などの詳細をご確認いただけます。",
  },
  {
    id: "INS003",
    name: "契約内容③",
    type: "がん保険",
    startDate: "2024/06/10",
    endDate: "2034/06/10",
    premium: 12000,
    coverage: "がん診断給付金 100万円",
    details:
      "がん保険の詳細情報がここに表示されます。がん診断給付金、がん入院給付金、がん手術給付金などの詳細をご確認いただけます。",
  },
];

const CancelInsurance: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [hasConfirmedWarning, setHasConfirmedWarning] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInsuranceToggle = (insuranceId: string) => {
    setSelectedInsurances((prev) =>
      prev.includes(insuranceId)
        ? prev.filter((id) => id !== insuranceId)
        : [...prev, insuranceId]
    );
  };

  const handleSelectAll = () => {
    setSelectedInsurances(mockInsurances.map((ins) => ins.id));
  };

  const renderStepIndicator = () => (
    <div className={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <div key={step} className={styles.stepItem}>
          <div
            className={`${styles.stepCircle} ${
              currentStep >= step ? styles.active : ""
            }`}
          >
            {step}
          </div>
          <div className={styles.stepLabel}>
            {step === 1 && "解約"}
            {step === 2 && "保険の解約について"}
            {step === 3 && "解約完了"}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className={styles.stepContent}>
      <h3>解約時の注意点</h3>

      <div className={styles.warningSection}>
        <h4>解約時のご注意点</h4>

        {/* TODO: save this <li> in an array*/}
        <div className={styles.warningContent}>
          <ul>
            <li>本商品には解約返戻金はありません</li>
            <li>解約された場合、以後の保障はなくなります。</li>
            <li>
              解約後、新たに本商品にお申込み頂く場合、健康状態などによっては契約の引き受けができない場合があります。
            </li>
            <li>
              現在のご契約を解約された場合、新しいご契約のお取り扱いにかかわらず、解約された契約を元に戻すことはできません。
            </li>
            <li>
              解約をされたお日にちによっては当月分保険料の引き落しがされる場合がございます。
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.confirmationBox}>
        <label className={styles.confirmationCheckbox}>
          <input
            type="checkbox"
            checked={hasConfirmedWarning}
            onChange={(e) => setHasConfirmedWarning(e.target.checked)}
          />
          <span>上記の内容を理解し、解約手続きを進めることに同意します</span>
        </label>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.stepContent}>
      <h3>保険の解約について</h3>

      <div className={styles.selectionInfo}>
        <CommonButton
          onClick={handleSelectAll}
          className={styles.selectAllButton}
        >
          すべて解約する
        </CommonButton>
      </div>

      <div className={styles.insuranceList}>
        {mockInsurances.map((insurance) => (
          <div
            key={insurance.id}
            className={`${styles.insuranceItem} ${
              selectedInsurances.includes(insurance.id) ? styles.selected : ""
            }`}
          >
            <div className={styles.insuranceHeader}>
              <input
                type="checkbox"
                checked={selectedInsurances.includes(insurance.id)}
                onChange={() => handleInsuranceToggle(insurance.id)}
                className={styles.insuranceCheckbox}
              />
              <div className={styles.insuranceInfo}>
                <h4>{insurance.name}</h4>
              </div>

              <CommonButton
                onClick={() =>
                  setShowDetails(
                    showDetails === insurance.id ? null : insurance.id
                  )
                }
                className={styles.detailsButton}
              >
                詳細表示
              </CommonButton>
            </div>

            {showDetails === insurance.id && (
              <div className={styles.insuranceDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>契約期間:</span>
                  <span className={styles.detailValue}>
                    {insurance.startDate} ～ {insurance.endDate}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>月額保険料:</span>
                  <span className={styles.detailValue}>
                    ¥{insurance.premium.toLocaleString()}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>保障内容:</span>
                  <span className={styles.detailValue}>
                    {insurance.coverage}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>詳細:</span>
                  <span className={styles.detailValue}>
                    {insurance.details}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.successContent}>
      <SuccessIcon size="large" />
      <h3>解約完了</h3>
      <div className={styles.successMessage}>
        <p>このたびはご利用いただき、誠にありがとうございました。</p>
        <p>解約手続きを受け付けいたしましたことをお知らせいたします。</p>
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
      default:
        return renderStep1();
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return hasConfirmedWarning;
    }
    if (currentStep === 2) {
      return selectedInsurances.length > 0; // Must select at least one insurance
    }
    return true;
  };

  return (
    <div className={styles.cancelInsurancePage}>
      <div className={styles.cancelInsuranceContainer}>
        <div className={styles.header}>
          <h2>保険解約</h2>
        </div>

        {currentStep <= 3 && renderStepIndicator()}

        <div className={styles.content}>{renderCurrentStep()}</div>

        {currentStep <= 3 && (
          <div className={styles.actionButtons}>
            {currentStep > 1 && currentStep < 3 && (
              <CommonButton
                variant="outline"
                onClick={prevStep}
                className={styles.prevButton}
              >
                戻る
              </CommonButton>
            )}
            {currentStep < 3 && (
              <CommonButton
                variant="primary"
                onClick={nextStep}
                disabled={!canProceed()}
                className={styles.nextButton}
              >
                {currentStep === 1
                  ? "解約手続きをはじめる"
                  : "解約手続きをする"}
              </CommonButton>
            )}
            {currentStep === 3 && (
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

export default CancelInsurance;
