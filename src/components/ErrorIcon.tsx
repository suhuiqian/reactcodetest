import React from "react";
import styles from "./ErrorIcon.module.css";

interface ErrorIconProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const ErrorIcon: React.FC<ErrorIconProps> = ({
  size = "medium",
  className = "",
}) => {
  return (
    <div className={`${styles.errorIcon} ${styles[size]} ${className}`}></div>
  );
};

export default ErrorIcon;
