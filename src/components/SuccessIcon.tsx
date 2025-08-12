import React from "react";
import styles from "./SuccessIcon.module.css";

interface SuccessIconProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const SuccessIcon: React.FC<SuccessIconProps> = ({
  size = "medium",
  className = "",
}) => {
  return (
    <div className={`${styles.successIcon} ${styles[size]} ${className}`}></div>
  );
};

export default SuccessIcon;
