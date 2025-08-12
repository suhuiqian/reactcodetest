import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./NotificationDetail.module.css";

// Mock notification data - in real app, this would come from API based on ID
const mockNotifications = {
  1: {
    id: 1,
    title: "お申込内容受け取りのお知らせ",
    date: "2025/06/06",
    content: `山田 様

お世話になっております。
ヒューマンライフ少額短期保険株式会社でございます。

この度は【12疾病保障付災害保障保険】にお申し込みいただき、誠にありがとうございます。

お申し込みを下記の内容で承りました。
商品名称：12疾病保障付災害保障保険
契約者：山田 一二三
被保険者：山田 一二三
加入日：2025/06/01
責任開始日：2025/07/01
保険期間：1年間
保険料：1,345円

お問い合わせ先
ヒューマンライフ少額短期保険株式会社
Mail：xxx＠xxx.com
Tel：010-1234-5678`,
    category: "お申込内容",
  },
  2: {
    id: 2,
    title: "保険金請求の受付完了",
    date: "2025/06/05",
    content: `山田 様

お世話になっております。
ヒューマンライフ少額短期保険株式会社でございます。

保険金請求を承りました。
審査には通常1週間程度かかります。
結果は別途ご連絡いたします。

お問い合わせ先
ヒューマンライフ少額短期保険株式会社
Mail：xxx＠xxx.com
Tel：010-1234-5678`,
    category: "保険金請求",
  },
  3: {
    id: 3,
    title: "書類の再提出について",
    date: "2025/06/04",
    content: `山田 様

お世話になっております。
ヒューマンライフ少額短期保険株式会社でございます。

申し込み書類に不備がございました。
下記の書類を再提出してください。

・身分証明書のコピー
・収入証明書

お問い合わせ先
ヒューマンライフ少額短期保険株式会社
Mail：xxx＠xxx.com
Tel：010-1234-5678`,
    category: "書類",
  },
};

const NotificationDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Get notification data based on ID, fallback to first notification if not found
  const notificationId = id ? parseInt(id) : 1;
  const notification =
    mockNotifications[notificationId as keyof typeof mockNotifications] ||
    mockNotifications[1];

  return (
    <div className={styles.notificationDetailPage}>
      <div className={styles.notificationDetailContainer}>
        <div className={styles.header}>
          <h2>お知らせ詳細</h2>
        </div>

        <div className={styles.notificationContent}>
          <div className={styles.notificationHeader}>
            <div className={styles.notificationTitle}>
              <span className={styles.category}>{notification.category}</span>
              <h3>{notification.title}</h3>
            </div>
            <div className={styles.notificationDate}>{notification.date}</div>
          </div>

          <div className={styles.notificationBody}>
            <pre className={styles.contentText}>{notification.content}</pre>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <CommonButton
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className={styles.backButton}
          >
            戻る
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
