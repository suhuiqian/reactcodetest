import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import CommonButton from "@/components/CommonButton";

const userInfo = {
  accountId: "XXXXXXXXX",
  insurancePeriod: "2025/06/24 ~ 2026/06/24",
  contracts: 1,
};

const notifications = [
  {
    id: 1,
    title: "お申出内容　結果",
    date: "2025/06/12",
    to: "/notification/1",
  },
  {
    id: 2,
    title: "お申込内容　引受可否結果",
    date: "2025/06/11",
    to: "/notification/2",
  },
  {
    id: 3,
    title: "お申出内容　結果",
    date: "2025/06/10",
    to: "/notification/3",
  },
  {
    id: 4,
    title: "書類再提出",
    date: "2025/06/07",
    to: "/notification/4",
  },
  {
    id: 5,
    title: "お申出内容　結果",
    date: "2025/06/06",
    to: "/notification/5",
  },
  {
    id: 6,
    title: "お申込内容　引受可否結果",
    date: "2025/06/05",
    to: "/notification/6",
  },
  {
    id: 7,
    title: "書類再提出",
    date: "2025/06/04",
    to: "/notification/7",
  },
  {
    id: 8,
    title: "お申出内容　受付",
    date: "2025/06/03",
    to: "/notification/8",
  },
  {
    id: 9,
    title: "お申込内容　受付",
    date: "2025/06/02",
    to: "/notification/9",
  },
  {
    id: 10,
    title: "保険加入　お申込手続にあたって",
    date: "2025/06/01",
    to: "/notification/10",
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      {/* 1. User Info */}
      <section className={styles.userInfo}>
        <div>アカウントID : {userInfo.accountId}</div>
        <div>保証期間 : {userInfo.insurancePeriod}</div>
        <div>契約中{userInfo.contracts}件</div>
      </section>

      {/* 2. Navigation Buttons */}
      <section className={styles.navSection}>
        <CommonButton className={styles.navButton} to="/claims">
          請求
        </CommonButton>

        <CommonButton className={styles.navButton} to="/cancel-insurance">
          解約
        </CommonButton>
        <CommonButton
          className={styles.navButton}
          to="/mypage/contract-details"
        >
          契約内容
        </CommonButton>
        <CommonButton className={styles.navButton} to="/mypage/important-terms">
          重要事項/約款
        </CommonButton>
      </section>

      {/* 3. Notifications 
        click any well of the notification to navigate to the notification detail page
        rather than the 'detail' link
       */}
      <section className={styles.notifications}>
        <h3 className={styles.notificationsTitle}>お知らせ</h3>
        <div className={styles.notificationsList}>
          {notifications.map((n) => (
            <div
              key={n.id}
              className={styles.notificationItem}
              onClick={() => navigate(n.to)}
            >
              <div className={styles.notificationContent}>
                <span className={styles.notificationDot}></span>
                <span className={styles.notificationTitle}>{n.title}</span>
              </div>
              <div className={styles.notificationRight}>
                {/* TODO: use Link rather than navigation callback?*/}
                <span className={styles.notificationTriangle}></span>
                <span className={styles.notificationDetail}>詳細</span>
                <span className={styles.notificationDate}>{n.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
