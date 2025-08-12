import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import SuccessPopup from "@/components/SuccessPopup";
import styles from "./PasswordChange.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordUpdateVerificationSchema,
  passwordUpdateNewPasswordSchema,
  type PasswordUpdateVerificationData,
  type PasswordUpdateNewPasswordData,
} from "@/schemas/auth";

type Step = "verify" | "newPassword";
// TODO: 3回以内に使用したパスワードは登録できません
// BACKEND QUERY

const PasswordChange: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("verify");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Step 1: Verify current credentials
  const verifyForm = useForm<PasswordUpdateVerificationData>({
    resolver: zodResolver(passwordUpdateVerificationSchema),
    mode: "onBlur",
  });

  // Step 2: Set new password
  const newPasswordForm = useForm<PasswordUpdateNewPasswordData>({
    resolver: zodResolver(passwordUpdateNewPasswordSchema),
    mode: "onBlur",
  });

  const handleVerifySubmit = async (data: PasswordUpdateVerificationData) => {
    setIsLoading(true);

    try {
      // Simulate API call to verify current credentials
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real app, verify current userId/password
      console.log("Verifying current credentials:", data);

      // If verification successful, move to next step
      setCurrentStep("newPassword");
    } catch (error) {
      console.error("Verification failed:", error);
      // Handle verification error - could show specific error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (
    data: PasswordUpdateNewPasswordData
  ) => {
    setIsLoading(true);

    try {
      // Simulate API call to update password
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updating password:", data);

      // Show success popup
      setShowSuccess(true);
    } catch (error) {
      console.error("Password update failed:", error);
      // Handle update error
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToVerify = () => {
    setCurrentStep("verify");
    newPasswordForm.reset();
  };

  return (
    <div className={styles.passwordChangePage}>
      <div className={styles.passwordChangeContainer}>
        <div className={styles.passwordChangeHeader}>
          <h2>パスワード変更</h2>
          {currentStep === "verify" ? (
            <p>現在のパスワードを確認してください</p>
          ) : (
            <p>新しいパスワードを設定してください</p>
          )}
        </div>

        {currentStep === "verify" ? (
          // Step 1: Verify current password only
          <form
            onSubmit={verifyForm.handleSubmit(handleVerifySubmit)}
            className={styles.passwordChangeForm}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="currentPassword">現在のパスワード</label>
              <input
                id="currentPassword"
                type="password"
                {...verifyForm.register("currentPassword")}
                className={
                  verifyForm.formState.errors.currentPassword
                    ? styles.error
                    : ""
                }
                disabled={isLoading}
              />
              {verifyForm.formState.errors.currentPassword && (
                <span className={styles.errorMessage}>
                  {verifyForm.formState.errors.currentPassword.message}
                </span>
              )}
            </div>

            <div className={styles.formActions}>
              <CommonButton
                type="submit"
                disabled={isLoading || !verifyForm.formState.isValid}
                className={styles.submitButton}
              >
                {isLoading ? "確認中..." : "確認"}
              </CommonButton>
            </div>
          </form>
        ) : (
          // Step 2: Set new password
          <form
            onSubmit={newPasswordForm.handleSubmit(handleNewPasswordSubmit)}
            className={styles.passwordChangeForm}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="newPassword">新しいパスワード</label>
              <input
                id="newPassword"
                type="password"
                {...newPasswordForm.register("newPassword")}
                className={
                  newPasswordForm.formState.errors.newPassword
                    ? styles.error
                    : ""
                }
                disabled={isLoading}
              />
              {newPasswordForm.formState.errors.newPassword && (
                <span className={styles.errorMessage}>
                  {newPasswordForm.formState.errors.newPassword.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmNewPassword">
                新しいパスワード（確認）
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                {...newPasswordForm.register("confirmNewPassword")}
                className={
                  newPasswordForm.formState.errors.confirmNewPassword
                    ? styles.error
                    : ""
                }
                disabled={isLoading}
              />
              {newPasswordForm.formState.errors.confirmNewPassword && (
                <span className={styles.errorMessage}>
                  {newPasswordForm.formState.errors.confirmNewPassword.message}
                </span>
              )}
            </div>

            <div className={styles.formActions}>
              <CommonButton
                type="submit"
                disabled={isLoading || !newPasswordForm.formState.isValid}
                className={styles.submitButton}
              >
                {isLoading ? "変更中..." : "パスワードを変更"}
              </CommonButton>
            </div>
          </form>
        )}

        <div className={styles.passwordChangeFooter}>
          {currentStep === "newPassword" && (
            <CommonButton
              variant="outline"
              onClick={handleBackToVerify}
              disabled={isLoading}
            >
              戻る
            </CommonButton>
          )}
          <CommonButton
            variant="outline"
            onClick={() => navigate("/profile")}
            disabled={isLoading}
          >
            キャンセル
          </CommonButton>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccess}
        title="パスワード変更完了"
        message="パスワードが正常に更新されました"
        buttonText="OK"
        onClose={() => setShowSuccess(false)}
        onConfirm={() => {
          setShowSuccess(false);
          navigate("/profile");
        }}
      />
    </div>
  );
};

export default PasswordChange;
