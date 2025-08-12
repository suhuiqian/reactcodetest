import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./ClaimDetail.module.css";

// Mock claim data - in real app, this would come from API based on ID
const mockClaims = {
  1: {
    id: 1,
    policyNumber: "POL-2025-001",
    insuranceType: "12疾病保障付災害保障保険",
    claimType: "疾病給付",
    amount: 500000,
    status: "pending",
    submittedDate: "2025/01/15",
    incidentDate: "2025/01/10",
    description: "入院による疾病給付請求",
    details: {
      hospitalName: "東京中央病院",
      admissionDate: "2025/01/10",
      dischargeDate: "2025/01/20",
      diagnosis: "急性虫垂炎",
      treatment: "腹腔鏡下虫垂切除術",
      doctorName: "田中 太郎",
      department: "外科",
    },
    documents: ["診断書", "入院証明書", "治療費明細書", "身分証明書"],
    timeline: [
      {
        date: "2025/01/15",
        status: "請求受付",
        description: "保険金請求を承りました",
      },
      {
        date: "2025/01/16",
        status: "書類確認",
        description: "提出書類の確認を開始しました",
      },
      {
        date: "2025/01/17",
        status: "審査中",
        description: "保険金請求の審査を開始しました",
      },
    ],
  },
  2: {
    id: 2,
    policyNumber: "POL-2025-002",
    insuranceType: "12疾病保障付災害保障保険",
    claimType: "災害給付",
    amount: 300000,
    status: "approved",
    submittedDate: "2025/01/10",
    incidentDate: "2025/01/05",
    description: "交通事故による災害給付請求",
    details: {
      accidentType: "交通事故",
      accidentDate: "2025/01/05",
      location: "東京都渋谷区",
      policeReport: "渋谷警察署 受理番号: 2025-001",
      injury: "右腕骨折",
      treatment: "ギプス固定",
    },
    documents: ["事故証明書", "診断書", "治療費明細書"],
    timeline: [
      {
        date: "2025/01/10",
        status: "請求受付",
        description: "保険金請求を承りました",
      },
      {
        date: "2025/01/12",
        status: "書類確認",
        description: "提出書類の確認完了",
      },
      {
        date: "2025/01/14",
        status: "審査完了",
        description: "保険金請求の審査完了",
      },
      {
        date: "2025/01/15",
        status: "承認",
        description: "保険金請求を承認しました",
      },
    ],
  },
};

const ClaimDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const claimId = id ? parseInt(id) : 1;
  const claim = mockClaims[claimId as keyof typeof mockClaims] || mockClaims[1];

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

  return (
    <div className={styles.claimDetailPage}>
      <div className={styles.claimDetailContainer}>
        <div className={styles.header}>
          <h2>保険金請求詳細</h2>
        </div>

        <div className={styles.claimContent}>
          {/* Claim Header */}
          <div className={styles.claimHeader}>
            <div className={styles.claimTitle}>
              <span className={styles.policyNumber}>{claim.policyNumber}</span>
              <h3>{claim.claimType}</h3>
            </div>
            <div className={styles.claimMeta}>
              <span className={styles.amount}>
                ¥{claim.amount.toLocaleString()}
              </span>
              <span
                className={`${styles.status} ${getStatusClass(claim.status)}`}
              >
                {getStatusText(claim.status)}
              </span>
            </div>
          </div>

          {/* Basic Information */}
          <div className={styles.section}>
            <h4>基本情報</h4>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>保険種類:</span>
                <span className={styles.value}>{claim.insuranceType}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>請求日:</span>
                <span className={styles.value}>{claim.submittedDate}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>事故日:</span>
                <span className={styles.value}>{claim.incidentDate}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>請求内容:</span>
                <span className={styles.value}>{claim.description}</span>
              </div>
            </div>
          </div>

          {/* Claim Details */}
          <div className={styles.section}>
            <h4>請求詳細</h4>
            <div className={styles.detailsContent}>
              {claim.claimType === "疾病給付" && (
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>病院名:</span>
                    <span className={styles.value}>
                      {claim.details.hospitalName}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>入院日:</span>
                    <span className={styles.value}>
                      {claim.details.admissionDate}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>退院日:</span>
                    <span className={styles.value}>
                      {claim.details.dischargeDate}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>診断名:</span>
                    <span className={styles.value}>
                      {claim.details.diagnosis}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>治療内容:</span>
                    <span className={styles.value}>
                      {claim.details.treatment}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>担当医:</span>
                    <span className={styles.value}>
                      {claim.details.doctorName}
                    </span>
                  </div>
                </div>
              )}
              {claim.claimType === "災害給付" && (
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>事故種別:</span>
                    <span className={styles.value}>
                      {claim.details.accidentType}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>事故日:</span>
                    <span className={styles.value}>
                      {claim.details.accidentDate}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>事故場所:</span>
                    <span className={styles.value}>
                      {claim.details.location}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>警察届出:</span>
                    <span className={styles.value}>
                      {claim.details.policeReport}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>負傷内容:</span>
                    <span className={styles.value}>{claim.details.injury}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>治療内容:</span>
                    <span className={styles.value}>
                      {claim.details.treatment}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className={styles.section}>
            <h4>提出書類</h4>
            <div className={styles.documentsList}>
              {claim.documents.map((doc, index) => (
                <div key={index} className={styles.documentItem}>
                  <span className={styles.documentIcon}>📄</span>
                  <span className={styles.documentName}>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className={styles.section}>
            <h4>処理状況</h4>
            <div className={styles.timeline}>
              {claim.timeline.map((item, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineDate}>{item.date}</div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineStatus}>{item.status}</div>
                    <div className={styles.timelineDescription}>
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <CommonButton
            variant="outline"
            onClick={() => navigate("/claims")}
            className={styles.backButton}
          >
            戻る
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetail;
