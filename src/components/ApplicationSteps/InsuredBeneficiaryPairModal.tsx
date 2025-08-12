import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InsuredFormCard from "./InsuredFormCard";
import BeneficiaryFormCard from "./BeneficiaryFormCard";
import CommonButton from "@/components/CommonButton";
import type { InsuredBeneficiaryPairData } from "@/types";
import styles from "@/pages/application/Application.module.css";
import { ErrorBoundary } from "react-error-boundary";
import log from "loglevel";
import { emptyInsuredBeneficiaryPair } from "@/constants/fake";
import {
  insuredBeneficiaryPairSchema,
  type InsuredBeneficiaryPairFormData,
} from "@/schemas";
import {
  calculateAgeFromDate,
  calculatePremium,
  getPremiumAsNumber,
} from "@/utils/premiumUtils";

interface InsuredBeneficiaryPairModalProps {
  onClose: () => void;
  onSave: (data: InsuredBeneficiaryPairData) => void;
  initialData?: InsuredBeneficiaryPairData;
  mode: "create" | "edit";
}

// Dev helper data
const devSampleData = {
  valid: {
    insured: {
      lastName: "田中",
      firstName: "太郎",
      lastNameKana: "タナカ",
      firstNameKana: "タロウ",
      birthDate: "1990-05-15",
      gender: "男性" as const,
      relationship: "配偶者" as const,
      postalCode: "1000001",
      prefecture: "東京都",
      city: "千代田区",
      address: "千代田1-1-1",
      building: "サンプルビル101",
      phoneNumber: "09012345678",
      email: "tanaka@example.com",
    },
    beneficiary: {
      lastName: "佐藤",
      firstName: "花子",
      lastNameKana: "サトウ",
      firstNameKana: "ハナコ",
      birthDate: "1992-08-20",
      gender: "女性" as const,
      relationship: "子" as const,
      postalCode: "1000002",
      prefecture: "東京都",
      city: "中央区",
      address: "銀座2-2-2",
      building: "テストマンション202",
      phoneNumber: "08087654321",
      email: "sato@example.com",
    },
    isInsuredSameAsApplicant: false,
    isBeneficiarySameAsApplicant: false,
  },
  invalid: {
    insured: {
      lastName: "山田",
      firstName: "次郎",
      lastNameKana: "ヤマダ",
      firstNameKana: "ジロウ",
      birthDate: "1985-12-10",
      gender: "男性" as const,
      relationship: "配偶者" as const,
      postalCode: "2000001",
      prefecture: "大阪府",
      city: "大阪市",
      address: "北区3-3-3",
      building: "デバッグビル303",
      phoneNumber: "07011111111",
      email: "yamada@example.com",
    },
    beneficiary: {
      lastName: "山田", // Same as insured - will trigger business rule error
      firstName: "次郎",
      lastNameKana: "ヤマダ",
      firstNameKana: "ジロウ",
      birthDate: "1985-12-10", // Same as insured
      gender: "男性" as const,
      relationship: "子" as const,
      postalCode: "2000002",
      prefecture: "大阪府",
      city: "大阪市",
      address: "北区4-4-4",
      building: "デバッグマンション404",
      phoneNumber: "07022222222",
      email: "yamada2@example.com",
    },
    isInsuredSameAsApplicant: false,
    isBeneficiarySameAsApplicant: false,
  },
};

const InsuredBeneficiaryPairModal: React.FC<
  InsuredBeneficiaryPairModalProps
> = ({ onClose, onSave, initialData, mode }) => {
  const methods = useForm<InsuredBeneficiaryPairFormData>({
    resolver: zodResolver(insuredBeneficiaryPairSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialData
      ? {
          insured: initialData.insured,
          beneficiary: initialData.beneficiary,
          isInsuredSameAsApplicant: initialData.isInsuredSameAsApplicant,
          isBeneficiarySameAsApplicant:
            initialData.isBeneficiarySameAsApplicant,
        }
      : emptyInsuredBeneficiaryPair,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, isDirty, errors },
    reset,
  } = methods;

  // Watch the "same as applicant" flags
  //const isInsuredSameAsApplicant = watch("isInsuredSameAsApplicant");
  //const isBeneficiarySameAsApplicant = watch("isBeneficiarySameAsApplicant");

  // Add logging for form state debugging
  useEffect(() => {
    log.info("Modal - Form State:", {
      isValid,
      isDirty,
      errorsCount: Object.keys(errors).length,
      errors: errors,
      insuredErrors: errors.insured,
      beneficiaryErrors: errors.beneficiary,
    });
  }, [isValid, isDirty, errors]);

  useEffect(() => {
    if (initialData) {
      reset({
        insured: initialData.insured,
        beneficiary: initialData.beneficiary,
        isInsuredSameAsApplicant: initialData.isInsuredSameAsApplicant ?? false,
        isBeneficiarySameAsApplicant:
          initialData.isBeneficiarySameAsApplicant ?? false,
      });
    }
  }, [initialData, reset]);

  const fillValidData = () => {
    reset(devSampleData.valid);
  };

  const fillInvalidData = () => {
    reset(devSampleData.invalid);
  };

  const clearAllData = () => {
    reset(emptyInsuredBeneficiaryPair);
  };

  const onSubmit = (data: InsuredBeneficiaryPairFormData) => {
    // Additional business logic validation
    /* const existingApplications = state.applications; */

    // Check for duplicate applications (skip current one if editing)
    /* const duplicatePair = existingApplications.find(
      (app) =>
        app.id !== initialData?.id && // Skip current application if editing
        app.insured.lastName === data.insured.lastName &&
        app.insured.firstName === data.insured.firstName &&
        app.insured.birthDate === data.insured.birthDate &&
        app.beneficiary.lastName === data.beneficiary.lastName &&
        app.beneficiary.firstName === data.beneficiary.firstName &&
        app.beneficiary.birthDate === data.beneficiary.birthDate
    ); */

    /* if (duplicatePair) {
      alert("同じ被保険者・受取人の組み合わせは既に登録されています");
      return;
    } */

    log.info("data:", JSON.stringify(data));
    const now = new Date().toISOString();
    const age = calculateAgeFromDate(data.insured.birthDate);

    // Calculate premium based on age and gender
    const premium =
      age !== null
        ? getPremiumAsNumber(
            age,
            data.insured.gender === "男性" ? "male" : "female"
          )
        : 100_000_000; //"対象外";
    const pairData: InsuredBeneficiaryPairData = {
      //TODO: change this, do we really need this id?
      id: initialData?.id ?? `pair_${Date.now().toString()}`,
      insured: data.insured,
      isInsuredSameAsApplicant: data.isInsuredSameAsApplicant,
      isBeneficiarySameAsApplicant: data.isBeneficiarySameAsApplicant,
      beneficiary: data.beneficiary,
      createdAt: initialData?.createdAt ?? now,
      updatedAt: now,
      status: initialData?.status ?? "temp",
      premium: premium,
    };

    console.log("pairData", JSON.stringify(pairData));
    onSave(pairData);
    // onClose();
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm("変更内容が失われます。本当にキャンセルしますか？")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className={styles.stepContent}>
      {/* Dev Helper Panel - Only show in development */}
      {import.meta.env.MODE !== "production" &&
        localStorage.getItem("devMode") === "true" && (
          <div className={styles.devNotice}>
            <p className={styles.devNoticeText}>🧪 Dev Helper</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={fillValidData}
                className={styles.devNoticeButton}
              >
                Fill Valid Data
              </button>
              <button
                type="button"
                onClick={fillInvalidData}
                className={styles.devNoticeButton}
              >
                Fill Invalid Data
              </button>
              <button
                type="button"
                onClick={clearAllData}
                className={styles.devNoticeButton}
              >
                Clear All
              </button>
            </div>
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: isValid ? "#dcfce7" : "#fef2f2",
                  color: isValid ? "#166534" : "#dc2626",
                }}
              >
                {isValid ? "✅ Valid" : "❌ Invalid"}
              </span>
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  backgroundColor: isDirty ? "#fef3c7" : "#f0f9ff",
                  color: isDirty ? "#92400e" : "#0369a1",
                }}
              >
                {isDirty ? "📝 Dirty" : "✨ Clean"}
              </span>
            </div>
            {Object.keys(errors).length > 0 && (
              <div style={{ marginTop: "8px", textAlign: "left" }}>
                <h5
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "12px",
                    color: "#dc2626",
                  }}
                >
                  Validation Errors:
                </h5>
                <ul
                  style={{ margin: "0", paddingLeft: "16px", fontSize: "11px" }}
                >
                  {Object.entries(errors).map(([field, error]) => (
                    <li
                      key={field}
                      style={{ color: "#dc2626", marginBottom: "2px" }}
                    >
                      <strong>{field}:</strong> {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      <ErrorBoundary fallback={<div>Error</div>}>
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => {
              void handleSubmit(onSubmit)(e);
            }}
          >
            <InsuredFormCard
              isReadOnly={false}
              initialData={watch("insured")}
              isSameAsApplicant={watch("isInsuredSameAsApplicant")}
              onSameAsApplicantChange={(value) => {
                setValue("isInsuredSameAsApplicant", value);
              }}
              disableSameAsApplicant={watch("isBeneficiarySameAsApplicant")} // Disable if beneficiary is same
            />

            <BeneficiaryFormCard
              isReadOnly={false}
              initialData={watch("beneficiary")}
              isSameAsApplicant={watch("isBeneficiarySameAsApplicant")}
              onSameAsApplicantChange={(value) => {
                setValue("isBeneficiarySameAsApplicant", value);
              }}
              disableSameAsApplicant={watch("isInsuredSameAsApplicant")} // Disable if insured is same
            />
          </form>
        </FormProvider>
      </ErrorBoundary>

      <div className={styles.stepActionButtons}>
        <CommonButton
          variant="primary"
          onClick={() => {
            void handleSubmit(onSubmit)();
          }}
          disabled={!isValid}
        >
          {/* {mode === "create" ? "確認する" : "更新する"} */}
          確認する
        </CommonButton>
        <CommonButton variant="secondary" onClick={handleCancel}>
          戻る
        </CommonButton>
      </div>
    </div>
  );
};

export default InsuredBeneficiaryPairModal;
