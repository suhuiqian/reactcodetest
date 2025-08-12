import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordUpdateNewPasswordSchema } from "@/schemas/auth";

import FloatingLabelInput from "@/components/FloatingLabelInput";
import CommonButton from "@/components/CommonButton";
import styles from "./ResetPassword.module.css"; // create this file if it doesn't exist
import { showWarningPopup } from "@/components/GeneralPopup";
// !FIX: should I force users to re-login after users updated password?
// TEMP: force log out them and make them login with new password !

const ResetPassword: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { control, setValue, handleSubmit } = useForm({
    resolver: zodResolver(passwordUpdateNewPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_data: unknown) => {
    setIsLoading(true);
    try {
      // TODO: Call backend API with new password and reset token
      await new Promise((resolve) => setTimeout(resolve, 500));
      // setIsSubmitted(true);
      showWarningPopup(
        "",
        {
          title: "パスワードリセットが完了しました。",
        }
      );

      if (onSuccess) onSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.resetPasswordContainer}>
        <h2>パスワードがリセットされました</h2>
        <p>新しいパスワードでログインしてください。</p>
      </div>
    );
  }


  const fillValidData = () => {
    setValue("newPassword", "demoPass123", { shouldValidate: true });
    setValue("confirmNewPassword", "demoPass123", { shouldValidate: true });
  };

  const fillInValidData = () => {
    setValue("newPassword", "2", { shouldValidate: true });
    setValue("confirmNewPassword", "3", { shouldValidate: true });
  };

  return (
    <div className={styles.resetPasswordPage}>
      <div className={styles.resetPasswordContainer}>
        {/* <h2>パスワード再設定</h2> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.resetPasswordForm}
        >
          <div className={styles.requiredTip}><span>* </span>必須</div>
          <Controller
            name="newPassword"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="パスワード"
                type="password"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className={styles.marginBottom10px}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                required={true}
              />
            )}
          />
          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="確認用パスワード"
                type="password"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className={styles.marginBottom10px}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                required={true}
              />
            )}
          />
          <div className={styles.hintText}>
            <ul className={styles.hintList}>
              <li>パスワードは、8～12文字で設定してください。</li>
              <li>半角英小文字・大文字・数字それぞれを最低1文字ずつ含む。</li>
              <li>過去、3回以内に使用したパスワードは登録できません。</li>
            </ul>
          </div>
          <div className={styles.formActions}>
            <CommonButton type="submit" disabled={isLoading}>
              {/* {isLoading ? "送信中..." : "パスワードを再設定"} */}
              {isLoading ? "送信中..." : "リセットする"}
            </CommonButton>
            {/* <CommonButton to="/" variant="secondary">
            戻る
          </CommonButton> */}
          </div>

          {/* Debug info in development */}
          {import.meta.env.MODE !== "production" &&
            localStorage.getItem("devMode") === "true" && (
              <div className={styles.debugInfo}>
                <br />
                <CommonButton type="button" onClick={fillValidData}>
                  fill valid data
                </CommonButton>
                <CommonButton type="button" onClick={fillInValidData}>
                  fill in valid data
                </CommonButton>
              </div>
            )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
