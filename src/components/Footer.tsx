import React from "react";
import styles from "./Footer.module.css";

const copyrightText =
  "Copyright　（C）ヒューマンライフ少額短期保険株式会社 All Rights Reserved.";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.copyrightText}>{copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
