import React from "react";
import { Link } from "react-router-dom";
import styles from "./CommonButton.module.css";

// TODO: define 3 interfaces rather 1 mixed?
// 1 <button>
// 2 <a>
// 3 <Link>
interface CommonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  form?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large" | "compact";
  className?: string;
  href?: string; // For external links only
  target?: string;
  to?: string; // For React Router navigation

  // API-related props
  onApiCall?: () => Promise<any>;
  loadingText?: string;
  loadingSpinner?: boolean;
  loadingVariant?: "primary" | "secondary" | "outline"; // Different style during loading
  autoDisable?: boolean; // Whether to disable during API call
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "medium",
  className = "",
  href,
  target,
  to,
}) => {
  const buttonClasses = [
    styles.commonButton,
    variant !== "primary" ? styles[variant] : "",
    size !== "medium" ? styles[size] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // External link
  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={buttonClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // React Router navigation
  if (to) {
    return (
      <Link to={to} className={buttonClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CommonButton;
