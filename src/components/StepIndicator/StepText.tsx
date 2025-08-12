import React from "react";
import "./StepText.css";

interface StepTextProps {
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepText: React.FC<StepTextProps> = ({
  description,
  isActive,
  isCompleted,
}) => {
  const getTextClass = () => {
    if (isCompleted) {
      return "step-text completed";
    } else if (isActive) {
      return "step-text active";
    } else {
      return "step-text future";
    }
  };

  return <div className={getTextClass()}>{description}</div>;
};

export default StepText;
