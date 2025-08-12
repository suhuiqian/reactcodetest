import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextTitle from "@/components/TextTitle";
import type { BeneficiaryFormCardProps } from "@/types/forms";
import styles from "@/components/FormCard.module.css";
import { ErrorBoundary } from "react-error-boundary";
import log from "loglevel";
import AddressLookupButton from "@/components/AddressLookupButton";
import BirthdayInput from "../BirthdayInput";
import FloatingLabelInput from "../FloatingLabelInput";
import FloatingLabelSelect from "../FloatingLabelSelect";
import ThirdDegreePopup from "../ThirdDegreePopup";
import { relationshipOptions } from "@/constants/selectOptions";
import { mockCurrentUser } from "@/constants/currentUser";

const BeneficiaryFormCard: React.FC<BeneficiaryFormCardProps> = ({
  isSameAsApplicant,
  onSameAsApplicantChange,
  disableSameAsApplicant,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Auto-fill form with current user data when same as applicant
  React.useEffect(() => {
    if (isSameAsApplicant) {
      // Auto-fill all beneficiary fields with current user data
      setValue("beneficiary", {
        ...mockCurrentUser.beneficiary,
        relationship: "本人", // Override relationship for beneficiary
      });
      log.info("BeneficiaryFormCard - Auto-filled form with current user data");
    } else {
      setValue("beneficiary", {
        lastName: "",
        firstName: "",
        lastNameKana: "",
        firstNameKana: "",
        birthDate: "",
        relationship: "子",
        postalCode: "",
        prefecture: "",
        city: "",
        address: "",
        building: "",
      });
    }
  }, [isSameAsApplicant, setValue]);

  return (
    <div className={styles.formCard}>
      <div className={styles.formCardHeader}>
        <TextTitle text="死亡保険金受取人" />
      </div>

      {/* Radio buttons - always visible */}
      <div className={styles.formFields}>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="isBeneficiarySameAsApplicant"
              className={styles.radioInput}
              checked={isSameAsApplicant}
              disabled={disableSameAsApplicant}
              onChange={() => {
                onSameAsApplicantChange(true);
              }}
            />
            <span className={styles.radioText}>
              契約者と死亡保険金受取人が同じ場合
            </span>
            {disableSameAsApplicant && (
              <div className={styles.disabledTooltip}>
                <span className={styles.tooltipText}>
                  契約者と被保険者が同じ場合、死亡保険金受取人は契約者と異なる必要があります
                </span>
              </div>
            )}
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              checked={!isSameAsApplicant}
              onChange={() => {
                onSameAsApplicantChange(false);
              }}
              name="isBeneficiarySameAsApplicant"
              className={styles.radioInput}
            />
            <span className={styles.radioText}>
              契約者と死亡保険金受取人が異なる場合
            </span>
          </label>
        </div>
      </div>

      <ErrorBoundary fallback={<div>Error</div>}>
        {/* Form fields */}
        <div className={styles.formFields}>
          {/* Name fields */}
          <div className={styles.formField}>
            <Controller
              name="beneficiary.lastName"
              control={control}
              render={({ field, fieldState }) => (
                <FloatingLabelInput
                  name={field.name}
                  label="姓"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  required
                  readonly={isSameAsApplicant}
                />
              )}
            />
            <Controller
              name="beneficiary.firstName"
              control={control}
              render={({ field, fieldState }) => (
                <FloatingLabelInput
                  name={field.name}
                  label="名"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  required
                  readonly={isSameAsApplicant}
                />
              )}
            />
          </div>

          {/* Kana fields */}
          <div className={styles.formField}>
            <Controller
              name="beneficiary.lastNameKana"
              control={control}
              render={({ field, fieldState }) => (
                <FloatingLabelInput
                  name={field.name}
                  label="セイ"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  required
                  readonly={isSameAsApplicant}
                />
              )}
            />
            <Controller
              name="beneficiary.firstNameKana"
              control={control}
              render={({ field, fieldState }) => (
                <FloatingLabelInput
                  name={field.name}
                  label="メイ"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  required
                  readonly={isSameAsApplicant}
                />
              )}
            />
          </div>

          {/* Birthday field */}
          <div className={styles.formField}>
            <label className={styles.label}>
              生年月日<span className={styles.requiredMark}>*</span>
            </label>
            <Controller
              name="beneficiary.birthDate"
              control={control}
              render={({ field, fieldState }) => (
                <BirthdayInput
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  disabled={isSameAsApplicant}
                />
              )}
            />
          </div>

          {/* Gender field */}
          {/*  <Controller
            name="beneficiary.gender"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelSelect
                name={field.name}
                label="性別"
                placeholder="性別を選択してください"
                options={[
                  { value: "男性", label: "男性" },
                  { value: "女性", label: "女性" },
                ]}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                required
              />
            )}
          /> */}

          <div className={styles.formField}>
            <Controller
              name="beneficiary.relationship"
              control={control}
              render={({ field, fieldState }) => (
                <FloatingLabelSelect
                  name={field.name}
                  label="続柄"
                  options={relationshipOptions}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  disabled={isSameAsApplicant}
                  placeholder="続柄を選択してください"
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  required
                />
              )}
            />

            <div className={styles.helpText}>
              {isSameAsApplicant && (
                <p className="flex">
                  <span className="w-3 flex-shrink-0">※</span>
                  <span className={styles.helpMessage}>
                    契約者と同じ場合、続柄は自動的に「本人」に設定されます
                  </span>
                </p>
              )}
              <p className="flex">
                <span className="w-3 flex-shrink-0">※</span>
                <span className={styles.helpMessage}>
                  被保険者から見た死亡保険金受取人の続柄(3親等まで)を入力してください。
                </span>
              </p>
              <p className="flex">
                <span className="w-3 flex-shrink-0"></span>
                <span className={styles.helpMessage}>
                  3親等については
                  <ThirdDegreePopup>
                    <span className={styles.thirdDegreeLink}>こちら</span>
                  </ThirdDegreePopup>
                  を参照してください
                </span>
              </p>
            </div>
          </div>

          {/* Postal code field */}
          <div className={styles.formField}>
            <Controller
              name="beneficiary.postalCode"
              control={control}
              render={({ field, fieldState }) => (
                <FloatingLabelInput
                  name={field.name}
                  label="郵便番号"
                  type="text"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="1234567"
                  maxLength={7}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  required
                  readonly={isSameAsApplicant}
                />
              )}
            />
            {!isSameAsApplicant && (
              <AddressLookupButton
                postalCodeField="beneficiary.postalCode"
                addressFields={{
                  prefecture: "beneficiary.prefecture",
                  city: "beneficiary.city",
                  address: "beneficiary.address",
                }}
                disabled={isSameAsApplicant}
              />
            )}
          </div>

          {/* Address fields */}
          <Controller
            name="beneficiary.prefecture"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="都道府県"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                required
                readonly={isSameAsApplicant}
              />
            )}
          />

          <Controller
            name="beneficiary.city"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="市区町村"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                required
                readonly={isSameAsApplicant}
              />
            )}
          />

          <Controller
            name="beneficiary.address"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="番地など"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                required
                readonly={isSameAsApplicant}
              />
            )}
          />

          <Controller
            name="beneficiary.building"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="建物名・部屋番号等"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                readonly={isSameAsApplicant}
              />
            )}
          />

          {/* Contact fields */}
          {/*   <Controller
            name="beneficiary.phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="電話番号"
                type="tel"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                required
              />
            )}
          /> */}

          {/* <Controller
            name="beneficiary.email"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="メールアドレス"
                type="email"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                required
              />
            )}
          /> */}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default BeneficiaryFormCard;
