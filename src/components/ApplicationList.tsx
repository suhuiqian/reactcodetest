import React from "react";
import ApplicationCard from "./ApplicationCard";
import TotalInsuranceFee from "./TotalInsuranceFee";
import CommonButton from "./CommonButton";
import styles from "./ApplicationList.module.css";
import { useApplication } from "@/contexts/ApplicationContext";
import { formatTimestampToJapaneseDate } from "@/utils/dateUtils";

interface ApplicationListProps {
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  isReadOnly?: boolean;
  isNew?: boolean;
}

// 1. can update (in new application)
// 2. read only (check mode) finished application

const ApplicationList: React.FC<ApplicationListProps> = ({
  onView,
  onEdit,
  onDelete,
  onAddNew,
  isReadOnly = false,
  isNew = true,
}) => {
  const { state } = useApplication();
  const { applications } = state;

  // Calculate total insurance fee (590円 per application as per ApplicationCard)
  const totalFee = applications.reduce(
    (acc, application) => acc + (application.premium ?? 0),
    0
  );

  return (
    <div className={styles.applicationList}>
      <div className={styles.listHeader}>
        {!isReadOnly && isNew && (
          <>
            {applications.length === 0 && (
              <>
                <p className={styles.listHeadTitle}>登録がありません</p>
                <p className={styles.listHeadTitleContent}>
                  被保険者/死亡保険金受取人を登録してください
                </p>
              </>
            )}
            <CommonButton
              variant="primary"
              size="large"
              onClick={onAddNew}
              className={styles.addButton}
              disabled={applications.length >= 5}
            >
              {/* TODO: add hover effect ?*/}
              被保険者・死亡保険金受取人の登録
            </CommonButton>

            <p className={styles.errorMessage}>
              1回のお申込みで5名まで登録することができます。
            </p>
            {state.operationTimestamp && (
              <div className="text-center text-black text-base font-normal font-['Inter']">
                最終保存日時：
                {formatTimestampToJapaneseDate(state.operationTimestamp)}
              </div>
            )}
          </>
        )}
      </div>

      {applications.length > 0 && (
        <>
          <TotalInsuranceFee
            totalFee={totalFee}
            /*  applicationCount={applications.length} */
            isNew={isNew}
          />
          <div className={styles.applicationsGrid}>
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                isReadOnly={isReadOnly}
                isNew={isNew}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationList;
