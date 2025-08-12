import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onClose();
    // Add your logout logic here (e.g., clear auth, redirect)
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <nav className={styles.menu}>
          <div className={styles.menuItem}>
            <Link to="/profile" onClick={() => onClose()}>
              <span className={styles.menuIcon}>👤</span>
              <span className={styles.menuText}>アカウント情報</span>
            </Link>
          </div>
          <div className={styles.menuItem}>
            <Link to="/supports" onClick={() => onClose()}>
              <span className={styles.menuIcon}>💬</span>
              <span className={styles.menuText}>お問い合わせ</span>
            </Link>
          </div>
          <div className={styles.menuItem} onClick={handleLogout}>
            <span className={styles.menuIcon}>🚪</span>
            <span className={styles.menuText}>ログアウト</span>
          </div>
        </nav>
      </div>
      {showLogoutConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <div className={styles.confirmText}>ログアウトしますか？</div>
            <div className={styles.confirmActions}>
              <button className={styles.confirmButton} onClick={confirmLogout}>
                はい
              </button>
              <button className={styles.cancelButton} onClick={cancelLogout}>
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
