import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import StepIndicator from "@/components/StepIndicator/StepIndicator";
import StepOverview from "@/components/ApplicationSteps/StepOverview";
import StepDisclosureIntro from "@/components/ApplicationSteps/StepDisclosureIntro";
import StepDisclosureForm from "@/components/ApplicationSteps/StepDisclosureForm";
import StepImportantMatters from "@/components/ApplicationSteps/StepImportantMatters";
import StepTerms from "@/components/ApplicationSteps/StepTerms";
import StepConfirmation from "@/components/ApplicationSteps/StepConfirmation";
import { useApplication } from "@/contexts/ApplicationContext";
import { isCurrentUserInApplications } from "@/utils/applicationHelpers";
import styles from "./Application.module.css";

type Step =
  | "overview"
  | "disclosure-intro"
  | "disclosure-form"
  | "important-matters"
  | "terms"
  | "confirmation";

const isResumeMode = localStorage.getItem("templateState") === "true";

const Application: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("overview");
  const [disclosureCompleted, setDisclosureCompleted] = useState(false);
  const { state } = useApplication();

  // Add development mode toggle
  const [devMode, setDevMode] = useState(false);

  // TODO: this workflow needs to be changed ?
  const steps = [
    { id: 1, text: "申し込み情報" },
    { id: 2, text: "重要事項確認" },
    { id: 3, text: "約款確認" },
    { id: 4, text: "告知確認" },
    { id: 5, text: "最終確認" },
  ];

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
          setCurrentStep("overview");
          break;
        case "2":
          setCurrentStep("important-matters");
          break;
        case "3":
          setCurrentStep("terms");
          break;
        case "4":
          setCurrentStep("disclosure-intro");
          break;
        case "5":
          setCurrentStep("disclosure-form");
          break;
        case "6":
          setCurrentStep("confirmation");
          setDisclosureCompleted(true);
          break;
      }
    }
  }, [searchParams]);

  // TODO: handleNext and handleBack should be refactored to be more reusable
  // need to handle logic here
  const handleNext = () => {
    switch (currentStep) {
      case "overview":
        setCurrentStep("important-matters");
        break;
      case "disclosure-intro":
        setCurrentStep("disclosure-form");
        break;
      case "disclosure-form":
        if (disclosureCompleted) {
          setCurrentStep("confirmation");
        }
        break;
      case "important-matters":
        setCurrentStep("terms");
        break;
      case "terms":
        // Check if current user is in applications to decide next step
        if (
          isCurrentUserInApplications(state.applications, state.applicantData)
        ) {
          // Current user is in applications, skip to confirmation
          setCurrentStep("confirmation");
        } else {
          // Current user is not in applications, go through disclosure steps
          setCurrentStep("disclosure-intro");
        }
        break;
      case "confirmation":
        console.log("Application submitted!");
        void navigate("/success");
        break;
    }
  };

  const handleCancel = () => {
    //todo
    setCurrentStep("overview");
  };

  const handleBack = () => {
    switch (currentStep) {
      case "disclosure-intro":
        setCurrentStep("overview");
        break;
      case "disclosure-form":
        setCurrentStep("disclosure-intro");
        break;
      case "important-matters":
        // Check if current user is in applications to decide back navigation
        if (
          isCurrentUserInApplications(state.applications, state.applicantData)
        ) {
          // Current user is in applications, go back to overview
          setCurrentStep("overview");
        } else {
          // Current user is not in applications, go back to disclosure form
          setCurrentStep("disclosure-form");
        }
        break;
      case "terms":
        setCurrentStep("important-matters");
        break;
      case "confirmation":
        // Check if current user is in applications to decide back navigation
        if (
          isCurrentUserInApplications(state.applications, state.applicantData)
        ) {
          // Current user is in applications, go back to terms
          setCurrentStep("terms");
        } else {
          // Current user is not in applications, go back to overview
          setCurrentStep("overview");
        }
        break;
      default:
        break;
    }
  };

  const handleTempSave = () => {
    console.log("Temporarily saved application progress");
    alert("申込内容を一時保存しました");
  };

  const handleDisclosureComplete = () => {
    setDisclosureCompleted(true);
    // Auto-advance to important matters step
    setCurrentStep("confirmation");
  };

  const handleGoToTerms = () => {
    setCurrentStep("terms");
  };

  const handleGoToConfirmation = () => {
    if (isCurrentUserInApplications(state.applications, state.applicantData)) {
      // Current user is in applications, go back to terms
      setCurrentStep("disclosure-intro");
    } else {
      // Current user is not in applications, go back to overview
      setCurrentStep("confirmation");
    }
    //setCurrentStep("confirmation");
    // setCurrentStep("disclosure-intro");
  };

  const handleSubmit = () => {
    console.log("Application submitted!");
    // Set application completion state
    sessionStorage.setItem("applicationCompleted", "true");
    void navigate("/success", {
      state: { operationType: "applicant-success" },
    });
  };

  const getCurrentStepIndex = () => {
    const isCurrentUserIncluded = isCurrentUserInApplications(
      state.applications,
      state.applicantData
    );

    switch (currentStep) {
      case "overview":
        return 0; // Step 1: 申し込み情報確認
      case "important-matters":
        return 1; // Step 4: 約款確認
      case "terms":
        return 2; // Step 5: 最終確認
      case "disclosure-intro":
        return 3; // Step 2: 告知確認
      case "disclosure-form":
        return 3; // Step 3: 重要事項確認
      case "confirmation":
        return 4; // Step 5: 最終確認 (same as terms for indicator)
      default:
        return 0;
    }
  };

  // Add quick navigation for development
  const quickNavigate = (targetStep: Step) => {
    setCurrentStep(targetStep);
    // Set required states for the target step
    if (
      /* targetStep === "important-matters" ||
      targetStep === "terms" || */
      targetStep === "confirmation"
    ) {
      setDisclosureCompleted(true);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "overview":
        return (
          <StepOverview
            onNext={handleNext}
            onTempSave={handleTempSave}
            isNew={!isResumeMode}
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
            onHandleCancel={handleCancel}
          />
        );
      case "important-matters":
        return (
          <StepImportantMatters
            onGoToTerms={handleGoToTerms}
            onBack={handleBack}
            onTempSave={handleTempSave}
          />
        );
      case "terms":
        return (
          <StepTerms
            onSubmit={handleGoToConfirmation}
            onBack={handleBack}
            onTempSave={handleTempSave}
          />
        );
      case "confirmation":
        return (
          <StepConfirmation
            onSubmit={handleSubmit}
            onBack={handleBack}
            onTempSave={handleTempSave}
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
                    quickNavigate("overview");
                  }}
                >
                  Step 1
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("important-matters");
                  }}
                >
                  Step 2
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("terms");
                  }}
                >
                  Step 3
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("disclosure-intro");
                  }}
                >
                  Step 4a
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("confirmation");
                  }}
                >
                  Step 4b
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickNavigate("confirmation");
                  }}
                >
                  Step 5
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

export default Application;
