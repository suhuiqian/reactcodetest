import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./ApplicationsIndex.module.css";

// change SanShiTo graph here
// 
interface ApplicationInProgress {
  id: string;
  identificationNumber: string;
  applicationDate: string;
}

const ApplicationsIndex: React.FC = () => {
  const navigate = useNavigate();
  const [lastSavedDate, setLastSavedDate] = useState<string>("");
  const [applicationsInProgress, setApplicationsInProgress] = useState<
    ApplicationInProgress[]
  >([]);

  useEffect(() => {
    // Load saved applications from localStorage or API
    loadSavedApplications();
    loadLastSavedDate();
  }, []);

  const loadSavedApplications = () => {
    // Mock data - replace with actual API call
    const mockApplications: ApplicationInProgress[] = [
      {
        id: "1",
        identificationNumber: "0720123",
        applicationDate: "2025/07/10",
      },
      {
        id: "2",
        identificationNumber: "0720124",
        applicationDate: "2025/07/10",
      },
      {
        id: "3",
        identificationNumber: "0720125",
        applicationDate: "2025/07/10",
      },
      {
        id: "4",
        identificationNumber: "0720126",
        applicationDate: "2025/07/10",
      },
      {
        id: "5",
        identificationNumber: "0720127",
        applicationDate: "2025/07/10",
      },
      {
        id: "6",
        identificationNumber: "0720128",
        applicationDate: "2025/07/10",
      },
      {
        id: "7",
        identificationNumber: "0720129",
        applicationDate: "2025/07/10",
      },
    ];
    setApplicationsInProgress(mockApplications);
  };

  const loadLastSavedDate = () => {
    // Mock data - replace with actual API call
    const savedDate = localStorage.getItem("lastSavedDate");
    if (savedDate) {
      setLastSavedDate(savedDate);
    } else {
      // Set current date as mock
      const now = new Date();
      const formattedDate = now
        .toLocaleString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          /*  second: "2-digit", */
        })
        .replace(/\//g, "/");
      setLastSavedDate(formattedDate);
    }
  };

  const handleNewRegistration = () => {
    /*  navigate("/application/step1-overview"); */
    void navigate("/statements");
  };

  const handleResumeTemporarySave = () => {
    void navigate("/application");
    // // Navigate to the last saved step
    // const lastStep = localStorage.getItem("lastSavedStep") || "step1-overview";
    // navigate(`/application/${lastStep}`);
    // // TODO: maybe many steps are better
  };

  const handleConfirmApplication = (applicationId: string) => {
    // Navigate to application details or confirmation page
    // TODO: fix this
    void navigate("/applications/RANDOM_APP_ID", {
      state: {
        isConfirmFlag: true,
        applicationId: applicationId,
      },
    });
  };

  return (
    <div className={styles.applicationsIndex}>
      {/* Current Application Section */}
      <section className={styles.currentApplicationSection}>
        <div className={styles.sectionHeader}>
          <h2>今回のお申込</h2>
        </div>

        <div className={styles.actionButtons}>
          {localStorage.getItem("templateState") === "true" ? (
            <CommonButton
              onClick={handleResumeTemporarySave}
              variant="primary"
              className={styles.fullWidthButton}
              size="medium"
            >
              一時保存再開
            </CommonButton>
          ) : (
            <CommonButton
              onClick={handleNewRegistration}
              variant="primary"
              className={styles.fullWidthButton}
              size="medium"
            >
              新規登録
            </CommonButton>
          )}
        </div>

        {lastSavedDate && localStorage.getItem("templateState") === "true" && (
          <div className={styles.lastSavedInfo}>
            最終保存日時 : {lastSavedDate}
          </div>
        )}
      </section>

      {/* Applications in Progress Section */}
      <section className={styles.applicationsInProgressSection}>
        <div className={styles.sectionHeader}>
          <h2>申込手続き中</h2>
        </div>

        <div className={styles.applicationsList}>
          {applicationsInProgress.map((application) => (
            <div key={application.id} className={styles.applicationItem}>
              <div className={styles.applicationInfo}>
                <div className={styles.infoTextGroup}>
                  <div className={styles.identificationNumber}>
                    <div className={styles.identificationNumberLeft}>
                      識別番号 :
                    </div>
                    {application.identificationNumber}
                  </div>
                  <div className={styles.applicationDate}>
                    <div className={styles.applicationDateLeft}>申込日 :</div>
                    {application.applicationDate}
                  </div>
                </div>
                <div>
                  <CommonButton
                    onClick={() => {
                      handleConfirmApplication(application.id);
                    }}
                    variant="outline"
                    className={styles.confirmButton}
                  >
                    確認
                  </CommonButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ApplicationsIndex;
