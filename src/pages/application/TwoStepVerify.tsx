import React from "react";
import EmailSendCard from "@/components/EmailSendCard";
import styles from "./TwoStepVerify.module.css";

// TODO: refine OTP input component ?
const TwoStepVerify: React.FC = () => {
  return (
    <div className={styles.twoStepVerifyPage}>
      <EmailSendCard to="/applications" />
    </div>
  );
};

export default TwoStepVerify;
