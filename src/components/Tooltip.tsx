import React, { useState } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  disabled?: boolean;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  disabled = false,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    if (disabled) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`${styles.tooltipContainer} ${
        disabled ? styles.disabled : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {disabled && <div className={styles.tooltip}>{content}</div>}
    </div>
  );
};

export default Tooltip;
