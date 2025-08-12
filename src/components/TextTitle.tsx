import React from "react";
import styles from "./TextTitle.module.css";

interface TextTitleProps {
  text: string;
}

const TextTitle: React.FC<TextTitleProps> = ({ text }) => {
  return <div className={styles.textTitle}>{text}</div>;
};

export default TextTitle;
