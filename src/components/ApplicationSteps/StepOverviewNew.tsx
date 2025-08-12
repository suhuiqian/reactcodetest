import React from "react";
import { useNavigate } from "react-router-dom";
import ApplicationList from "@/components/ApplicationList";
import { useApplicationContext } from "@/contexts/ApplicationContext";
import CommonButton from "@/components/CommonButton";
import styles from "./StepOverviewNew.module.css";

interface StepOverviewNewProps {
  onNext: () => void;
  onTempSave: () => void;
}

const StepOverviewNew: React.FC<StepOverviewNewProps> = ({
  onNext,
  onTempSave,
}) => {
  const navigate = useNavigate();
  const {
    state: { applications },
    addApplication,
    deleteApplication,
    deleteMultipleApplications,
    submitMultipleApplications,
  } = useApplicationContext();

  const handleView = (id: string) => {
    // Navigate to application detail view
    navigate(`/application/detail/${id}`);
  };

  const handleEdit = (id: string) => {
    // Navigate to application edit flow
    navigate(`/application/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("この申込を削除しますか？")) {
      deleteApplication(id);
    }
  };

  const handleAddNew = () => {
    // Create a new application with default data
    addApplication({
      beneficiaryName: "",
      insuredPersonName: "",
      insuranceFee: 0,
    });
  };

  const handleBulkDelete = (ids: string[]) => {
    if (window.confirm(`${ids.length}件の申込を削除しますか？`)) {
      deleteMultipleApplications(ids);
    }
  };

  const handleBulkSubmit = (ids: string[]) => {
    if (window.confirm(`${ids.length}件の申込を提出しますか？`)) {
      submitMultipleApplications(ids);
    }
  };

  const handleNext = () => {
    // Only allow proceeding if there's at least one application
    if (applications.length === 0) {
      alert("少なくとも1つの申込を作成してください。");
      return;
    }

    // Check if all applications have required data
    const incompleteApplications = applications.filter(
      (app) =>
        !app.beneficiaryName || !app.insuredPersonName || app.insuranceFee === 0
    );

    if (incompleteApplications.length > 0) {
      alert("すべての申込の必須項目を入力してください。");
      return;
    }

    onNext();
  };

  return (
    <div className={styles.stepOverviewNew}>
      <div className={styles.header}>
        <h2 className={styles.title}>保険申込一覧</h2>
        <p className={styles.description}>
          複数の保険申込を作成・管理できます。最大10件まで作成可能です。
        </p>
      </div>

      <ApplicationList
        applications={applications}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        onBulkDelete={handleBulkDelete}
        onBulkSubmit={handleBulkSubmit}
      />

      <div className={styles.actionButtons}>
        <div className={styles.buttonRow}>
          <CommonButton
            variant="outline"
            onClick={onTempSave}
            className={styles.tempSaveButton}
          >
            一時保存
          </CommonButton>

          <CommonButton
            variant="primary"
            onClick={handleNext}
            className={styles.nextButton}
            disabled={applications.length === 0}
          >
            次へ進む
          </CommonButton>
        </div>
      </div>

      {applications.length > 0 && (
        <div className={styles.summary}>
          <h3>申込サマリー</h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>申込件数</span>
              <span className={styles.summaryValue}>
                {applications.length}件
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>合計保険料</span>
              <span className={styles.summaryValue}>
                ¥
                {applications
                  .reduce((sum, app) => sum + app.insuranceFee, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>下書き</span>
              <span className={styles.summaryValue}>
                {applications.filter((app) => app.status === "draft").length}件
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>提出済み</span>
              <span className={styles.summaryValue}>
                {
                  applications.filter((app) => app.status === "submitted")
                    .length
                }
                件
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepOverviewNew;
