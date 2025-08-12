import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import StepIndicator from "@/components/StepIndicator/StepIndicator";
import StepApplicationOverview from "@/components/ApplicationSteps/StepApplicationOverview";
import StepIdUploads from "@/components/ApplicationSteps/StepIdUploads";
import StepDisclosureIntro from "@/components/ApplicationSteps/StepDisclosureIntro";
import StepDisclosureForm from "@/components/ApplicationSteps/StepDisclosureForm";
import StepImportantMatters from "@/components/ApplicationSteps/StepImportantMatters";
import StepTerms from "@/components/ApplicationSteps/StepTerms";
import StepConfirmation from "@/components/ApplicationSteps/StepConfirmation";
import styles from "./Application.module.css";

type Step =
  | "application-overview"
  | "id-uploads"
  | "important-matters"
  | "terms"
  | "disclosure-intro"
  | "disclosure-form"
  | "confirmation";

const InsuredApplication: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("application-overview");

  // Add development mode toggle
  const [devMode, setDevMode] = useState(false);

  const steps = [
    { id: 1, text: "保険内容確認" },
    { id: 2, text: "本人確認書類アップロード" },
    { id: 3, text: "重要事項確認" },
    { id: 4, text: "約款確認" },
    { id: 5, text: "告知確認" },
    { id: 6, text: "最終確認" },
  ];

  /* const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMSG, setErrorMSG] = useState<string[]>([]); */

  /* const showPopup = () => {
    setErrorMSG(["15歳～64歳以外の方はお申し込みできません。"]);
    setShowErrorPopup(true);
  }; */

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  // Allow direct step access via URL parameter
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (
      stepParam &&
      import.meta.env.MODE !== "production" &&
      localStorage.getItem("devMode") === "true"
    ) {
      switch (stepParam) {
        case "1":
          setCurrentStep("application-overview");
          break;
        case "2":
          setCurrentStep("disclosure-intro");
          break;
        case "3":
          setCurrentStep("disclosure-form");
          break;
        case "4":
          setCurrentStep("important-matters");
          break;
        case "5":
          setCurrentStep("terms");
          break;
        case "6":
          setCurrentStep("confirmation");
          break;
      }
    }
  }, [searchParams]);

  const handleNext = () => {
    switch (currentStep) {
      case "application-overview":
        setCurrentStep("id-uploads");
        break;
      case "id-uploads":
        setCurrentStep("important-matters");
        break;
      case "important-matters":
        setCurrentStep("terms");
        break;
      case "terms":
        setCurrentStep("disclosure-intro");
        break;
      case "disclosure-intro":
        setCurrentStep("disclosure-form");
        break;
      case "disclosure-form":
        setCurrentStep("confirmation");
        break;
      case "confirmation":
        console.log("Application submitted!");
        void navigate("/success");
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "id-uploads":
        setCurrentStep("application-overview");
        break;
      case "important-matters":
        setCurrentStep("id-uploads");
        break;
      case "terms":
        setCurrentStep("important-matters");
        break;
      case "disclosure-intro":
        setCurrentStep("terms");
        break;
      case "disclosure-form":
        setCurrentStep("disclosure-intro");
        break;
      case "confirmation":
        setCurrentStep("disclosure-form");
        break;
      default:
        break;
    }
  };

  const handleDisclosureComplete = () => {
    // Auto-advance to confirmation step
    setCurrentStep("confirmation");
  };

  const handleTempSave = () => {
    console.log("Temporarily saved application progress");
    alert("申込内容を一時保存しました");
  };

  const handleSubmit = () => {
    console.log("Application submitted!");
    // Set application completion state
    sessionStorage.setItem("applicationCompleted", "true");
    void navigate("/success", { state: { operationType: "insured-success" } });
  };

  const getCurrentStepIndex = () => {
    switch (currentStep) {
      case "application-overview":
        return 0; // Step 1: 申し込み情報確認
      case "id-uploads":
        return 1; // Step 2: 本人確認書類アップロード
      case "important-matters":
        return 2; // Step 3: 重要事項確認
      case "terms":
        return 3; // Step 4: 約款確認
      case "disclosure-intro":
        return 4; // Step 5: 告知確認
      case "disclosure-form":
        return 4; // Step 6: 最終確認 (same as terms for indicator)
      case "confirmation":
        return 5; // Step 6: 最終確認 (same as terms for indicator)
      default:
        return 0;
    }
  };

  // Add quick navigation for development
  const quickNavigate = (targetStep: Step) => {
    setCurrentStep(targetStep);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "application-overview":
        return <StepApplicationOverview onNext={handleNext} />;
      case "id-uploads":
        return (
          <StepIdUploads
            onNext={handleNext}
            onBack={handleBack}
            onTempSave={handleTempSave}
          />
        );
      case "important-matters":
        return (
          <StepImportantMatters
            onGoToTerms={handleNext}
            onBack={handleBack}
            onTempSave={handleTempSave}
          />
        );
      case "terms":
        return (
          <StepTerms
            onSubmit={handleNext}
            onBack={handleBack}
            onTempSave={handleTempSave}
          />
        );
      case "disclosure-intro":
        return (
          <StepDisclosureIntro
            onNext={handleNext}
            onBack={handleBack}
            onTempSave={handleTempSave}
          />
        );
      case "disclosure-form":
        return (
          <StepDisclosureForm
            onComplete={handleDisclosureComplete}
            onBack={handleBack}
            useType="insured"
          />
        );
      case "confirmation":
        return (
          <StepConfirmation
            onSubmit={handleSubmit}
            onBack={handleBack}
            onTempSave={handleTempSave}
            useType="insured"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.applicationPage}>
      {/* <div className={styles.applicationHeader}> */}
      {/* Development Mode Toggle */}
      {import.meta.env.MODE !== "production" &&
        localStorage.getItem("devMode") === "true" && (
          <div className={styles.devControls}>
            <label>
              <input
                type="checkbox"
                checked={devMode}
                onChange={(e) => {
                  setDevMode(e.target.checked);
                }}
              />
              開発モード
            </label>

            {devMode && (
              <div className={styles.devNavigation}>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("application-overview");
                  }}
                >
                  Step 1
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("id-uploads");
                  }}
                >
                  Step 2
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("important-matters");
                  }}
                >
                  Step 3
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("terms");
                  }}
                >
                  Step 4
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("disclosure-intro");
                  }}
                >
                  Step 5a
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("disclosure-form");
                  }}
                >
                  Step 5b
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("confirmation");
                  }}
                >
                  Step 6
                </button>
              </div>
            )}
          </div>
        )}
      {/* </div> */}

      <StepIndicator steps={steps} currentStep={getCurrentStepIndex()} />

      <div className={styles.applicationContent}>{renderCurrentStep()}</div>

      {/* <CommonPopup
        isOpen={showErrorPopup}
        title="入力エラーがあります"
        messages={errorMSG}
        buttonText="戻る"
        onClose={() => setShowErrorPopup(false)}
      /> */}
    </div>
  );
};

export default InsuredApplication;
