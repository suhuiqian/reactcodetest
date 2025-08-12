import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import headerLogo from "../assets/header_logo.webp";
import styles from "./Header.module.css";
import HamburgerMenu from "./HamburgerMenu";
import Sidebar from "./Sidebar";
import HelperDialog from "./HelperDialog";

interface HeaderProps {
  navText?: string; // Optional prop for navigation text
}

type OperationType = "applicant-success" | "insured-success" | "insured-cancel";

interface SuccessPageState {
  operationType?: OperationType;
}

const Header: React.FC<HeaderProps> = ({ navText }) => {
  const location = useLocation();
  const locationState = location.state as SuccessPageState;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const getStepFromHash = () => {
    const hash = location.hash;
    if (hash.startsWith("#step")) {
      return hash.replace("#step", "");
    }
    return null;
  };

  const getHeaderText = (pathname: string) => {
    // Check for NewClaim steps first
    if (pathname === "/claims/new") {
      const step = getStepFromHash();
      if (step) {
        switch (step) {
          case "1":
            return "必要書類アップロード";
          case "2":
            return "受取口座入力";
          case "3":
            return "入力内容確認";
          case "4":
            return "請求完了";
          default:
            return "必要書類アップロード";
        }
      }
      return "必要書類アップロード";
    }

    // Regular pathname-based logic
    switch (pathname) {
      case "/":
        return "TOPメニュー";
      case "/statements":
        return "12疾病保障付災害保障保険";
      case "/privacy":
        return "12疾病保障付災害保障保険";
      case "/insured-policy":
        return "12疾病保障付災害保障保険";
      case "/account":
        return "アカウント登録";
      case "/dashboard":
        return "マイページ";
      case "/profile":
        return "アカウント情報";
      case "/customer-support":
        return "お問い合わせ";
      case "/supports":
        return "お問い合わせ一覧";
      case "/supports/new":
        return "お問い合わせ作成";
      case "/notification":
        return "お知らせ詳細";
      case "/disclosure-form":
        return "12疾病保障付災害保障保険";
      case "/application":
        return "12疾病保障付災害保障保険";
      case "/insured-application":
        return "12疾病保障付災害保障保険";
      case "/success": {
        if (locationState.operationType === "insured-cancel") {
          return "取消完了";
        } else {
          return "12疾病保障付災害保障保険";
        }
      }
      case "/about":
        return "会社概要";
      case "/contact":
        return "お問い合わせ";
      case "/mypage/important-terms":
        return "重要事項/約款";
      case "/login":
        return "ログイン";
      case "/forgot-password":
        return "パスワードリセット";
      case "/password-change":
        return "パスワードの変更";
      case "/claims":
        return "請求一覧";
      case "/claims/medical-confirmation":
      case "/claims/medical-reminder":
        return "保険金・給付金";
      case "/newContractLogin":
        return "ログイン";
      case "/twoStepVerify":
        return "2段階認証画面";
      case "/applications":
        return "12疾病保障付災害保障保険";
      case "/reset-password":
        return "パスワードリセット";
      case "/submitIdentity":
        return "12疾病保障付災害保障保険";
      case "/createAccountSuccess":
        return "アカウント登録完了";
      /* case "/signup":
        return "新規登録"; */
      default:
        return "12疾病保障付災害保障保険";
    }
  };

  const displayText = navText ?? getHeaderText(location.pathname);

  const handleHomeClick = () => {
    void navigate("/dashboard");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <img src={headerLogo} alt="Service Logo" className={styles.logoImage} />
        <div className={styles.navSection}>
          <span className={styles.navText}>{displayText}</span>
          <div className={`${styles.navRight} h-full`}>
            <HelperDialog />
            {location.pathname === "/dashboard" && (
              <HamburgerMenu
                onClick={() => {
                  setSidebarOpen(true);
                }}
              />
            )}
            {/* TODO: modularize this home button */}
            {location.pathname === "/profile" && (
              <button
                type="button"
                className={styles.homeButton}
                onClick={handleHomeClick}
                aria-label="ホームに戻る"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      <Sidebar
        open={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
        }}
      />
    </header>
  );
};

export default Header;
