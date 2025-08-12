import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonButton from "@/components/CommonButton";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import type { InsuredBeneficiaryPairData } from "@/types";
import {
  formatFullName,
  formatFullNameKana,
  formatAddress,
  formatPostalCode,
  formatPhoneNumber,
  formatBirthDate,
} from "@/utils/formatUtils";
import styles from "@/components/FormCard.module.css";

const emailEditSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
});

type EmailEditFormData = z.infer<typeof emailEditSchema>;

interface InsuredEmailEditModalProps {
  onClose: () => void;
  onSave: (data: InsuredBeneficiaryPairData) => void;
  data: InsuredBeneficiaryPairData;
}

const InsuredEmailEditModal: React.FC<InsuredEmailEditModalProps> = ({
  onClose,
  onSave,
  data,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailEditFormData>({
    resolver: zodResolver(emailEditSchema),
    defaultValues: {
      email: data.insured.email,
    },
  });

  const onSubmit = (formData: EmailEditFormData) => {
    const updatedData: InsuredBeneficiaryPairData = {
      ...data,
      insured: {
        ...data.insured,
        email: formData.email,
      },
    };
    onSave(updatedData);
  };

  return (
    <div>
      <div className={styles.formCard}>
        <div className={styles.formCardHeader}>
          <h2>メールアドレス編集</h2>
        </div>

        <div className={styles.formFields}>
          {/* 被保険者情報（読み取り専用） */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>被保険者情報</h3>
            <div className={styles.formFields}>
              <div className={styles.formField}>
                <span className={styles.fieldLabel}>氏名</span>
                <span className={styles.fieldValue}>
                  {formatFullName(
                    data.insured.lastName,
                    data.insured.firstName
                  )}
                </span>
              </div>

              <div className={styles.formField}>
                <span className={styles.fieldLabel}>フリガナ</span>
                <span className={styles.fieldValue}>
                  {formatFullNameKana(
                    data.insured.lastNameKana,
                    data.insured.firstNameKana
                  )}
                </span>
              </div>

              <div className={styles.formField}>
                <span className={styles.fieldLabel}>生年月日</span>
                <span className={styles.fieldValue}>
                  {formatBirthDate(data.insured.birthDate)}
                </span>
              </div>

              <div className={styles.formField}>
                <span className={styles.fieldLabel}>性別</span>
                <span className={styles.fieldValue}>{data.insured.gender}</span>
              </div>

              <div className={styles.formField}>
                <span className={styles.fieldLabel}>続柄</span>
                <span className={styles.fieldValue}>
                  {data.insured.relationship}
                </span>
              </div>

              <div className={styles.formField}>
                <span className={styles.fieldLabel}>郵便番号</span>
                <span className={styles.fieldValue}>
                  {formatPostalCode(data.insured.postalCode)}
                </span>
              </div>

              <div className={styles.formField}>
                <span className={styles.fieldLabel}>住所</span>
                <span className={styles.fieldValue}>
                  {formatAddress(
                    data.insured.prefecture,
                    data.insured.city,
                    data.insured.address,
                    data.insured.building
                  )}
                </span>
              </div>

              <div className={styles.formField}>
                <span className={styles.fieldLabel}>電話番号</span>
                <span className={styles.fieldValue}>
                  {formatPhoneNumber(data.insured.phoneNumber)}
                </span>
              </div>
            </div>
          </div>

          {/* メールアドレス編集フィールド */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>編集可能項目</h3>
            <div className={styles.formFields}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <FloatingLabelInput
                    name={field.name}
                    label="メールアドレス"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    required
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
      </div>
      <div
        className={styles.formCardFooter}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CommonButton
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          確認する
        </CommonButton>
        <CommonButton variant="secondary" onClick={onClose}>
          戻る
        </CommonButton>
      </div>
    </div>
  );
};

export default InsuredEmailEditModal;
