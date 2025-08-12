import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import SuccessPopup from "@/components/SuccessPopup";
import styles from "./ForgotPassword.module.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/schemas/auth";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { showWarningPopup } from "@/components/GeneralPopup";

// ? should avoid 1. users Id enumeration 2. masking users email addresses

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      userId: "",   
    }
  });

  const handleSubmitForm = async () => {
    setIsLoading(true);
    try {
      // Call backend API to send reset link (do not reveal if userId exists)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setIsLoading(false);
      // setIsSubmitted(true);
      showWarningPopup(
        "",
        {
          title: "パスワードリセットのメールを送りました。",
        }
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.forgotPasswordPage}>
        <div className={styles.forgotPasswordContainer}>
          <SuccessPopup
            isOpen={true}
            title="リセットリンクを送信しました"
            message={
              "ご入力いただいたIDに登録されているメールアドレスにリセットリンクを送信しました。メールをご確認ください。"
            }
            buttonText="ログインページに戻る"
            onClose={() => navigate("/login")}
            onConfirm={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.forgotPasswordPage}>
      <div className={styles.forgotPasswordContainer}>
        {/* <div className={styles.forgotPasswordHeader}>
          <h2>パスワードを忘れた場合</h2>
          <p>
            ユーザーIDを入力して、パスワードリセット用のリンクを受け取ってください
          </p>
        </div> */}
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className={styles.forgotPasswordForm}
        >
          <div >
            <div className={styles.requiredTip}><span>* </span>必須</div>

            <Controller
              name="userId"
              control={control}
              render={({ field, fieldState }) => (
                <FloatingLabelInput
                  name={field.name}
                  /*  label="ユーザーID" */
                  className={styles.marginBottomMinSize}
                  label="ユーザーID"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  required
                />
              )}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="text"
              disabled={true}
              defaultValue="tanaka112@mailto.plus"
            />
          </div>
          <div className={styles.mailNotice}>
            <ul className={styles.pointsList}>
              <li className={styles.point}>
                表示されているメールアドレスに心当たりがない、またはメールが届かない場合はお客様相談窓口にお問い合わせをしてください。
              </li>
            </ul>
          </div>
          {/* <div className={styles.sendMailButtons}>
            <CommonButton type="button">メール送信</CommonButton>
          </div> */}
          <div className={styles.buttons}>
            <CommonButton
              type="submit"
              disabled={isLoading}
            // className={styles.resetButton}
            >
              {/* {isLoading ? "送信中..." : "パスワードリセットリンクを送信"} */}
              {isLoading ? "送信中..." : "メール送信"}
            </CommonButton>
          </div>
        </form>
        {/* <div className={styles.forgotPasswordFooter}>
          <Link to="/login" className={styles.linkText}>
            ← ログインページに戻る
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ForgotPassword;
