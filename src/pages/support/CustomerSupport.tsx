import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./CustomerSupport.module.css";

// Demo data for inquiries
const demoInquiries = [
  {
    id: 1,
    title: "保険金請求について",
    content: "保険金の請求手続きについて詳しく教えてください。",
    date: "2025/01/15",
    status: "unread",
    category: "保険金請求",
  },
  {
    id: 2,
    title: "契約内容の変更",
    content: "契約内容を変更したいのですが、どのような手続きが必要でしょうか。",
    date: "2025/01/14",
    status: "read",
    category: "契約変更",
  },
  {
    id: 3,
    title: "支払い方法の変更",
    content: "クレジットカードの支払い方法を変更したいです。",
    date: "2025/01/13",
    status: "unread",
    category: "支払い",
  },
  {
    id: 4,
    title: "保険証券の再発行",
    content: "保険証券を紛失してしまったので、再発行をお願いします。",
    date: "2025/01/12",
    status: "read",
    category: "書類",
  },
  {
    id: 5,
    title: "解約手続きについて",
    content: "保険の解約手続きについて詳しく教えてください。",
    date: "2025/01/11",
    status: "unread",
    category: "解約",
  },
];

const CustomerSupport: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const filteredInquiries =
    activeTab === "all"
      ? demoInquiries
      : demoInquiries.filter((inquiry) => inquiry.status === "unread");

  const unreadCount = demoInquiries.filter(
    (inquiry) => inquiry.status === "unread"
  ).length;

  return (
    <div className={styles.customerSupportPage}>
      <div className={styles.customerSupportContainer}>
        <div className={styles.header}>
          <h2>お問い合わせリスト</h2>
          <p>お客様からのお問い合わせ一覧です</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "all" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("all")}
          >
            全部 ({demoInquiries.length})
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "unread" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("unread")}
          >
            未読 ({unreadCount})
          </button>
        </div>

        {/* Inquiries List */}
        <div className={styles.inquiriesList}>
          {filteredInquiries.length === 0 ? (
            <div className={styles.emptyState}>
              <p>お問い合わせはありません</p>
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`${styles.inquiryItem} ${
                  inquiry.status === "unread" ? styles.unread : ""
                }`}
                onClick={() => navigate(`/supports/${inquiry.id}`)}
              >
                <div className={styles.inquiryHeader}>
                  <div className={styles.inquiryTitle}>
                    <span className={styles.category}>{inquiry.category}</span>
                    <span className={styles.title}>{inquiry.title}</span>
                  </div>
                  <div className={styles.inquiryMeta}>
                    <span className={styles.date}>{inquiry.date}</span>
                    {inquiry.status === "unread" && (
                      <span className={styles.unreadBadge}>未読</span>
                    )}
                  </div>
                </div>
                <div className={styles.inquiryContent}>{inquiry.content}</div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <CommonButton
            variant="primary"
            onClick={() => navigate("/supports/new")}
            className={styles.newInquiryButton}
          >
            お問い合わせする
          </CommonButton>
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

export default CustomerSupport;
