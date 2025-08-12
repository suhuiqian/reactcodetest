import React from "react";
import "./StepCircle.css";

interface StepCircleProps {
  stepNumber: number;
  isActive: boolean;
  isCompleted: boolean;
}

const StepCircle: React.FC<StepCircleProps> = ({
  stepNumber,
  isActive,
  isCompleted,
}) => {
  const getCircleContent = () => {
    if (isCompleted) {
      // return "✓"; // Checkmark for completed steps
      return "";
    }
    return stepNumber; // Number for active/future steps
  };

  const getCircleClass = () => {
    if (isCompleted) {
      return "step-circle completed";
    } else if (isActive) {
      return "step-circle active";
    } else {
      return "step-circle future";
    }
  };

  return <div className={getCircleClass()}>{getCircleContent()}</div>;
};

export default StepCircle;
