import React from "react";
import DisclosureForm from "./DisclosureForm";
import styles from "@/pages/application/Application.module.css";

interface StepDisclosureProps {
  onComplete: () => void;
}

const StepDisclosure: React.FC<StepDisclosureProps> = ({ onComplete }) => {
  return (
    <div className={styles.disclosureStepContent}>
      <DisclosureForm onComplete={onComplete} />
    </div>
  );
};

export default StepDisclosure;
