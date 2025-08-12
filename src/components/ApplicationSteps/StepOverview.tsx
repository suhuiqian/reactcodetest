import React, { useState, useEffect } from "react";
import InsuredBeneficiaryPairModal from "@/components/ApplicationSteps/InsuredBeneficiaryPairModal";
import InsuredBeneficiaryPairViewModal from "@/components/ApplicationSteps/InsuredBeneficiaryPairViewModal";
import CommonButton from "@/components/CommonButton";
import appStyles from "@/pages/application/Application.module.css";
import formStyles from "@/components/FormCard.module.css";
import type { InsuredBeneficiaryPairData } from "@/types";
import { useApplication } from "@/contexts/ApplicationContext";
import ApplicationList from "../ApplicationList";
import TextCard from "../TextCard";
import { useNavigate } from "react-router-dom";
import { showConfirmDialog } from "@/components/GeneralPopup";
import { fakeSavedApplications } from "@/constants/fake";
import { mockCurrentUser } from "@/constants/currentUser";
import {
  formatFullName,
  formatFullNameKana,
  formatAddress,
  formatPostalCode,
  formatPhoneNumber,
  formatBirthDate,
} from "@/utils/formatUtils";

interface StepOverviewProps {
  onNext: () => void;
  onTempSave: () => void;
  isNew: boolean; // Add mode prop for cleaner architecture
  // true for new application, false for resume application
}

// TODO: ARCHITECTURE LEVEL
// how to handle mode of new application vs resume mode

// TODO: useReduce to replace all useState
const StepOverview: React.FC<StepOverviewProps> = ({
  onNext,
  isNew = true,
}) => {
  const [mode, setMode] = useState<
    "overview" | "create" | "edit" | "preview" | "view"
  >("overview");
  const [pendingData, setPendingData] =
    useState<InsuredBeneficiaryPairData | null>(null); // For preview step
  const [editingPair, setEditingPair] = useState<
    InsuredBeneficiaryPairData | undefined
  >();
  const [viewingPair, setViewingPair] = useState<
    InsuredBeneficiaryPairData | undefined
  >();

  const navigate = useNavigate();
  const { state, dispatch } = useApplication();

  // Handle resume mode data loading
  useEffect(() => {
    if (!isNew) {
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
    }
  }, [isNew, dispatch]);

  const handleEdit = (id: string) => {
    const pair = state.applications.find(
      (app: InsuredBeneficiaryPairData) => app.id === id
    );
    if (pair) {
      setEditingPair(pair);
      setMode("edit");
    }
  };

  const handleView = (id: string) => {
    const pair = state.applications.find(
      (app: InsuredBeneficiaryPairData) => app.id === id
    );
    if (pair) {
      setViewingPair(pair);
      setMode("view");
    }
  };

  const handleDelete = (id: string) => {
    showConfirmDialog(
      "",
      /*  "この登録を削除しますか？削除された情報は復元できません。", */
      {
        title: "本当に削除しますか？",
        confirmText: "削除する",
        cancelText: "キャンセル",
        type: "warning",
        onConfirm: () => {
          dispatch({ type: "DELETE_APPLICATION", payload: id });
        },
        onCancel: () => {
          // Optional: Handle cancel action if needed
          console.log("削除がキャンセルされました");
        },
      }
    );
  };

  // Preview flow handlers
  const handlePreview = (data: InsuredBeneficiaryPairData) => {
    setPendingData(data);
    setMode("preview");
  };

  const handleConfirm = () => {
    if (pendingData) {
      if (editingPair) {
        // Update existing
        dispatch({ type: "UPDATE_APPLICATION", payload: pendingData });
      } else {
        // Create new
        dispatch({
          type: "ADD_APPLICATION",
          payload: { ...pendingData, status: "draft" },
        });
      }
    }
    setPendingData(null);
    setEditingPair(undefined);
    setMode("overview");
  };

  const handleBackToEdit = () => {
    // Keep pendingData so the form will be pre-filled when we go back
    setMode(editingPair ? "edit" : "create");
  };

  const handleCancelEdit = () => {
    setPendingData(null);
    setEditingPair(undefined);
    setMode("overview");
  };

  const handleCloseView = () => {
    setViewingPair(undefined);
    setMode("overview");
  };

  const onBack = () => {
    void navigate("/applications");
  };

  const handleCreate = () => {
    setMode("create");
  };

  return (
    <div className={appStyles.overviewStepContent}>
      {mode === "overview" && (
        <>
          <div className={appStyles.overviewInfoCardsGrid}>
            <TextCard title="契約者">
              <div className={formStyles.formFields}>
                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>氏名</span>
                  <span className={formStyles.fieldValue}>
                    {formatFullName(
                      mockCurrentUser.insured.lastName,
                      mockCurrentUser.insured.firstName
                    )}
                  </span>
                </div>

                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>フリガナ</span>
                  <span className={formStyles.fieldValue}>
                    {formatFullNameKana(
                      mockCurrentUser.insured.lastNameKana,
                      mockCurrentUser.insured.firstNameKana
                    )}
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

                <div className={formStyles.formField}>
                  <span className={formStyles.fieldLabel}>メールアドレス</span>
                  <span className={formStyles.fieldValue}>
                    {mockCurrentUser.insured.email}
                  </span>
                </div>
              </div>
            </TextCard>
            {/*  <ApplicantForm /> */}

            <TextCard title="被保険者・死亡保険金受取人">
              <ApplicationList
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddNew={handleCreate}
                isNew={isNew}
              />
            </TextCard>
          </div>
          <div className={appStyles.stepActionButtons}>
            {/*  <div className={appStyles.actionButtonRow}> */}
            <CommonButton
              onClick={() => {
                alert("一時保存");
              }}
              variant="primary"
              className={appStyles.fullWidthButton}
              /*  disabled={state.applications.length === 0} */
            >
              一時保存
            </CommonButton>
            <CommonButton
              onClick={onNext}
              variant="primary"
              className={appStyles.fullWidthButton}
              disabled={state.applications.length === 0}
            >
              重要事項確認へ
            </CommonButton>
            {/*  <CommonButton
              onClick={onBack}
              variant="secondary"
              className={appStyles.fullWidthButton}
            >
              戻る
            </CommonButton> */}
          </div>
          {/* TODO: pass applicant data to modal*/}
          {/* TODO: more micro animatiosn ?
        e.g., small snowbar for success/error messages
      */}
          {/*   <InsuredBeneficiaryPairModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handlePreSubmit}
            //initialData={pendingData ?? editingPair}
            mode={modalMode}
          /> */}
          {/*  // Confirmation Modal - add mode and save handler */}
          {/*  <InsuredBeneficiaryPairViewModal
            isOpen={isViewModalOpen}
            onClose={
              isConfirmationMode
                ? handleCloseConfirmationModal
                : handleCloseViewModal
            }
            data={pendingData ?? viewingPair} // Use pendingData in confirmation mode
            mode={isConfirmationMode ? "confirmation" : "view"} // NEW PROP
            onConfirm={
              isConfirmationMode
                ? () => {
                    handleSavePair(pendingData!);
                  }
                : undefined
            } // NEW PROP
            onEdit={isConfirmationMode ? handleBackToEdit : undefined} // NEW PROP
          /> */}
          {/*  {viewingPair && (
        <InsuredBeneficiaryPairViewModal
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          data={viewingPair}
        />
      )} */}
        </>
      )}
      {mode === "create" && (
        <InsuredBeneficiaryPairModal
          onClose={handleCancelEdit}
          onSave={handlePreview}
          mode="create"
          initialData={pendingData ?? undefined} // Pre-fill with pending data if returning from preview
        />
      )}
      {mode === "edit" && editingPair && (
        <InsuredBeneficiaryPairModal
          onClose={handleCancelEdit}
          onSave={handlePreview}
          mode="edit"
          initialData={pendingData ?? editingPair} // Use pending data if available, otherwise use editing pair
        />
      )}
      {mode === "preview" && pendingData && (
        <InsuredBeneficiaryPairViewModal
          onClose={handleBackToEdit}
          data={pendingData}
          mode="confirmation"
          onConfirm={handleConfirm}
          onEdit={handleBackToEdit}
        />
      )}
      {mode === "view" && viewingPair && (
        <InsuredBeneficiaryPairViewModal
          onClose={handleCloseView}
          data={viewingPair}
          mode="view"
        />
      )}
    </div>
  );
};

export default StepOverview;
