import React, { useState, useEffect } from "react";
import styles from "../pages/application/Application.module.css";
import formStyles from "./FormCard.module.css";

import TextCard from "./TextCard";
import ApplicationList from "./ApplicationList";
import { fakeSavedApplications } from "@/constants/fake";
import { useApplication } from "@/contexts/ApplicationContext";
import type { InsuredBeneficiaryPairData } from "@/types";
import InsuredBeneficiaryPairViewModal from "./ApplicationSteps/InsuredBeneficiaryPairViewModal";
import InsuredEmailEditModal from "./ApplicationSteps/InsuredEmailEditModal";
import {
  formatPhoneNumber,
  formatBirthDate,
  formatPostalCode,
  formatAddress,
} from "@/utils/formatUtils";
import { mockCurrentUser } from "@/constants/currentUser";
import CommonButton from "./CommonButton";

const InsuredApplication: React.FC = () => {
  const { state, dispatch } = useApplication();
  const [mode, setMode] = useState<"overview" | "view" | "edit" | "preview">(
    "overview"
  );
  const [viewingPair, setViewingPair] = useState<
    InsuredBeneficiaryPairData | undefined
  >();
  const [editingPair, setEditingPair] = useState<
    InsuredBeneficiaryPairData | undefined
  >();
  const [pendingData, setPendingData] =
    useState<InsuredBeneficiaryPairData | null>(null);

  useEffect(() => {
    try {
      const storedApplications = fakeSavedApplications();
      dispatch({ type: "RESTORE_APPLICATIONS", payload: storedApplications });
    } catch (error) {
      console.error("Failed to load saved applications:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "一時保存データの読み込みに失敗しました",
      });
    }
  }, [dispatch]);

  const handleView = (id: string) => {
    const pair = state.applications.find((app) => app.id === id);
    if (pair) {
      setViewingPair(pair);
      setMode("view");
    }
  };

  const handleEdit = (id: string) => {
    const pair = state.applications.find((app) => app.id === id);
    if (pair) {
      setEditingPair(pair);
      setMode("edit");
    }
  };

  const handleCloseView = () => {
    setViewingPair(undefined);
    setMode("overview");
  };

  const handleCloseEdit = () => {
    setPendingData(null);
    setEditingPair(undefined);
    setMode("overview");
  };

  // Preview flow handlers (following StepOverview pattern)
  const handlePreview = (data: InsuredBeneficiaryPairData) => {
    setPendingData(data);
    setMode("preview");
  };

  const handleConfirm = () => {
    if (pendingData) {
      dispatch({ type: "UPDATE_APPLICATION", payload: pendingData });
    }
    setPendingData(null);
    setEditingPair(undefined);
    setMode("overview");
  };

  const handleBackToEdit = () => {
    // Keep pendingData so the form will be pre-filled when we go back
    setMode("edit");
  };
  return (
    <div className={styles.applicationContent}>
      <div className={styles.overviewStepContent}>
        {mode === "overview" && (
          <div className={styles.overviewInfoCardsGrid}>
            <div
              style={{
                margin: "auto",
                marginBottom: "20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>識別番号：0000027</p>
              <p>申込日：2025/07/10</p>
            </div>
            <TextCard title="契約者">
              <div className={formStyles.formFields}>
                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>氏名</span>
                  <span className={formStyles.fieldValue}>
                    {mockCurrentUser.insured.lastName}{" "}
                    {mockCurrentUser.insured.firstName}
                  </span>
                </div>

                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>フリガナ</span>
                  <span className={formStyles.fieldValue}>
                    {mockCurrentUser.insured.lastNameKana}{" "}
                    {mockCurrentUser.insured.firstNameKana}
                  </span>
                </div>

                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>生年月日</span>
                  <span className={formStyles.fieldValue}>
                    {formatBirthDate(mockCurrentUser.insured.birthDate)}
                  </span>
                </div>

                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>性別</span>
                  <span className={formStyles.fieldValue}>
                    {mockCurrentUser.insured.gender}
                  </span>
                </div>

                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>郵便番号</span>
                  <span className={formStyles.fieldValue}>
                    {formatPostalCode(mockCurrentUser.insured.postalCode)}
                  </span>
                </div>

                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>住所</span>
                  <span className={formStyles.fieldValue}>
                    {formatAddress(
                      mockCurrentUser.insured.prefecture,
                      mockCurrentUser.insured.city,
                      mockCurrentUser.insured.address,
                      mockCurrentUser.insured.building
                    )}
                  </span>
                </div>

                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>電話番号</span>
                  <span className={formStyles.fieldValue}>
                    {formatPhoneNumber(mockCurrentUser.insured.phoneNumber)}
                  </span>
                </div>

                {/*  <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>メールアドレス</span>
                  <span className={formStyles.fieldValue}>
                    {mockCurrentUser.insured.email}
                  </span>
                </div> */}
              </div>
            </TextCard>
            <TextCard title="被保険者・死亡保険金受取人">
              <ApplicationList
                onView={handleView}
                onEdit={handleEdit}
                onDelete={() => {
                  // No delete functionality in view mode
                }}
                onAddNew={() => {
                  // No add functionality in view mode
                }}
                isReadOnly={false}
                isNew={false}
              />
            </TextCard>
            <div style={{ margin: "auto" }}>
              <CommonButton to="/applications" variant="outline">
                戻る
              </CommonButton>
            </div>
          </div>
        )}
        {mode === "view" && viewingPair && (
          <InsuredBeneficiaryPairViewModal
            onClose={handleCloseView}
            data={viewingPair}
            mode="view"
          />
        )}
        {mode === "edit" && editingPair && (
          <InsuredEmailEditModal
            onClose={handleCloseEdit}
            onSave={handlePreview}
            data={editingPair}
          />
        )}
        {mode === "preview" && pendingData && (
          <InsuredBeneficiaryPairViewModal
            onClose={handleBackToEdit}
            data={pendingData}
            mode="confirmation" // preview -> 1. create 2.update
            onConfirm={handleConfirm}
            onEdit={handleBackToEdit}
            buttonText="更新する"
          />
        )}
      </div>
    </div>
  );
};

export default InsuredApplication;
