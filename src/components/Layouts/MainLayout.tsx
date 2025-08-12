import React from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === "/";

  return (
    <div className={styles.mainLayout}>
      {!isIndexPage && <Header />}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      {!isIndexPage && <Footer />}
    </div>
  );
};

export default MainLayout;
