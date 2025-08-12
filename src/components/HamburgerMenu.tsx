import React from "react";
import styles from "./HamburgerMenu.module.css";

const HamburgerMenu: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className={styles.hamburger}
    onClick={onClick}
    aria-label="メニューを開く"
    type="button"
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}
    >
      <rect y="7" width="32" height="4" rx="2" fill="#fff" />
      <rect y="14" width="32" height="4" rx="2" fill="#fff" />
      <rect y="21" width="32" height="4" rx="2" fill="#fff" />
    </svg>
  </button>
);

export default HamburgerMenu;
