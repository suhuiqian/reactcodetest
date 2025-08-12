import React from "react";
import styles from "./TextContext.module.css";

interface TextContextProps {
  text?: string;
  children?: React.ReactNode;
}

const TextContext: React.FC<TextContextProps> = ({ text, children }) => {
  return (
    <div className={styles.textContext}>
      {text && <div className={styles.textContent}>{text}</div>}
      {children}
    </div>
  );
};

export default TextContext;
