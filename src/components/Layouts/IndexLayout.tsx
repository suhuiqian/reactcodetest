import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./IndexLayout.module.css";

const IndexLayout: React.FC = () => {
  return (
    <div className={styles.indexLayout}>
      <Outlet />
    </div>
  );
};

export default IndexLayout;
