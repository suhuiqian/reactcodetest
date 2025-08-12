import React from "react";
import StepCircle from "./StepCircle";
import StepText from "./StepText";
import "./StepItem.css";

interface Step {
  id: number;
  text: string;
}

interface StepItemProps {
  step: Step;
  isActive: boolean;
  isCompleted: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ step, isActive, isCompleted }) => {
  const getTextClass = () => {
    if (isCompleted) {
      return "step-item completed";
    } else if (isActive) {
      return "step-item active";
    } else {
      return "step-item future";
    }
  };

  return (
    <div className={getTextClass()}>
      <StepCircle
        stepNumber={step.id}
        isActive={isActive}
        isCompleted={isCompleted}
      />
      <StepText
        description={step.text}
        isActive={isActive}
        isCompleted={isCompleted}
      />
    </div>
  );
};

export default StepItem;
