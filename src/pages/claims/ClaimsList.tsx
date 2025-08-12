import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./ClaimsList.module.css";

// Demo data for claims
const demoClaims = [
  {
    id: 1,
    policyNumber: "POL-2025-001",
    insuranceType: "12疾病保障付災害保障保険",
    claimType: "疾病給付",
    amount: 500000,
    status: "pending",
    submittedDate: "2025/01/15",
    incidentDate: "2025/01/10",
    description: "入院による疾病給付請求",
  },
  {
    id: 2,
    policyNumber: "POL-2025-002",
    insuranceType: "12疾病保障付災害保障保険",
    claimType: "災害給付",
    amount: 300000,
    status: "approved",
    submittedDate: "2025/01/10",
    incidentDate: "2025/01/05",
    description: "交通事故による災害給付請求",
  },
  {
    id: 3,
    policyNumber: "POL-2025-003",
    insuranceType: "12疾病保障付災害保障保険",
    claimType: "手術給付",
    amount: 200000,
    status: "rejected",
    submittedDate: "2025/01/05",
    incidentDate: "2025/01/01",
    description: "手術による給付請求",
  },
];

const ClaimsList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "審査中";
      case "approved":
        return "承認済み";
      case "rejected":
        return "却下";
      default:
        return "不明";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return styles.pending;
      case "approved":
        return styles.approved;
      case "rejected":
        return styles.rejected;
      default:
        return "";
    }
  };

  const filteredClaims =
    activeTab === "all"
      ? demoClaims
      : demoClaims.filter((claim) => claim.status === activeTab);

  const pendingCount = demoClaims.filter(
    (claim) => claim.status === "pending"
  ).length;
  const approvedCount = demoClaims.filter(
    (claim) => claim.status === "approved"
  ).length;
  const rejectedCount = demoClaims.filter(
    (claim) => claim.status === "rejected"
  ).length;

  return (
    <div className={styles.claimsListPage}>
      <div className={styles.claimsListContainer}>
        <div className={styles.header}>
          <h2>保険金請求一覧</h2>
          <p>お客様の保険金請求履歴です</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "all" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("all")}
          >
            全部 ({demoClaims.length})
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "pending" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("pending")}
          >
            審査中 ({pendingCount})
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "approved" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("approved")}
          >
            承認済み ({approvedCount})
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "rejected" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("rejected")}
          >
            却下 ({rejectedCount})
          </button>
        </div>

        {/* Claims List */}
        <div className={styles.claimsList}>
          {filteredClaims.length === 0 ? (
            <div className={styles.emptyState}>
              <p>保険金請求はありません</p>
            </div>
          ) : (
            filteredClaims.map((claim) => (
              <div
                key={claim.id}
                className={styles.claimItem}
                onClick={() => navigate(`/claims/${claim.id}`)}
              >
                <div className={styles.claimHeader}>
                  <div className={styles.claimTitle}>
                    <span className={styles.policyNumber}>
                      {claim.policyNumber}
                    </span>
                    <span className={styles.claimType}>{claim.claimType}</span>
                  </div>
                  <div className={styles.claimMeta}>
                    <span className={styles.amount}>
                      ¥{claim.amount.toLocaleString()}
                    </span>
                    <span
                      className={`${styles.status} ${getStatusClass(
                        claim.status
                      )}`}
                    >
                      {getStatusText(claim.status)}
                    </span>
                  </div>
                </div>
                <div className={styles.claimDetails}>
                  <div className={styles.insuranceType}>
                    {claim.insuranceType}
                  </div>
                  <div className={styles.description}>{claim.description}</div>
                  <div className={styles.dates}>
                    <span>請求日: {claim.submittedDate}</span>
                    <span>事故日: {claim.incidentDate}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <CommonButton
            to="/claims/medical-reminder"
            variant="primary"
            className={styles.newClaimButton}
          >
            請求手続きを始める
          </CommonButton>
          <CommonButton
            to="/dashboard"
            variant="outline"
            className={styles.backButton}
          >
            戻る
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default ClaimsList;
