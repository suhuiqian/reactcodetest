import React from "react";
import StepItem from "./StepItem";
import "./StepIndicator.css";

interface Step {
  id: number;
  text: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <StepItem
          key={step.id}
          step={step}
          isActive={index === currentStep}
          isCompleted={index < currentStep}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
