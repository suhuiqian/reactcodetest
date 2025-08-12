import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./Account.module.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountFormSchema, type AccountFormData } from "@/schemas/auth";
import { VIBISLE_BASIC_ERROR_MESSAGES } from "@/schemas/auth";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { showWarningPopup } from "@/components/GeneralPopup";
import { inquiryMsg } from "@/constants/disclosureFormContent";

// TODO: for new users, (no confirmed apps)
//
const Account: React.FC = () => {
  const [showAccountPage, setShowAccountPage] = useState(false);
  const handleSendMailClick = () => {
    setShowAccountPage(true);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema),
    mode: "onChange",
    //reValidateMode: "onBlur"
    defaultValues: {
      userId: "",
      password: "",
      rePassword: "",
      verifyCode: "",
    },
  });

  // This function is called when validation PASSES
  const onSubmit = (data: AccountFormData) => {
    console.log("✅ Form is valid! Data:", data);
    // Handle successful registration logic here
    // After successful registration, redirect to application page
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      void navigate("/createAccountSuccess");
    } else {
      void navigate("/applications");
    }
  };

  // This function is called when validation FAILS
  const onError = (errors: Record<string, { message?: string }>) => {
    console.log("❌ Form has errors:", errors);

    // Convert all errors to messages
    const messages = Object.values(errors)
      .map((error) => error?.message)
      .filter(Boolean)
      .slice(0, 1) as string[];

    showWarningPopup(messages.join("\n"), {
      title: "入力エラーがあります",
    });
  };

  const fillValidData = () => {
    setValue("userId", "demoUser1234", { shouldValidate: true });
    setValue("password", "demoPass123", { shouldValidate: true });
    setValue("rePassword", "demoPass123", { shouldValidate: true });
    setValue("verifyCode", "123456", { shouldValidate: true });
  };

  const fillInValidData = () => {
    setValue("userId", "1", { shouldValidate: true });
    setValue("password", "2", { shouldValidate: true });
    setValue("rePassword", "3", { shouldValidate: true });
    setValue("verifyCode", "", { shouldValidate: true });
  };
  return (
    <div className={styles.accountPage}>
      <div className={styles.loginContainer}>
        <form
          className={styles.loginForm}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className={styles.emailPage}>
            <div className={styles.topMsgText}>
              <p>
                アカウント登録にあたり、表示されているメールアドレスに認証コードを送ります。
              </p>
              <p>表示されているメールアドレスをご確認の上、</p>
              <p>メール送信ボタンを押下してください。</p>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.fontSize18}>
                メールアドレス
              </label>
              <input
                id="email"
                type="text"
                disabled={true}
                className={errors.email ? styles.error : ""}
                defaultValue={"tanaka112@mailto.plus"}
              />
              <input
                type="hidden"
                {...register("email")}
                value="tanaka112@mailto.plus"
              />
              {/* TODO: change this email */}
            </div>

            <div className={styles.sendMailButtons}>
              <CommonButton type="button" onClick={handleSendMailClick}>
                メール送信
              </CommonButton>
            </div>
            <div className={styles.mailNotice}>
              <ul className={styles.pointsList}>
                <li className={styles.point}>
                  メールが届かない、または表示されているメールアドレスが現在ご使用のメールアドレスと異なる場合は、お客様相談窓口にお問い合わせください。
                </li>
              </ul>
            </div>

            <div className={`${styles.modalContent} ${styles.fontStyle}`}>
              <div className={styles.inquiryMsgConsultationTitle}>
                {inquiryMsg.consultationCounterHead}
              </div>

              <div className={styles.inquiryMsgConsultationList}>
                {inquiryMsg.consultationList.map((item, index) => (
                  <div
                    key={index}
                    className={styles.inquiryMsgConsultationItem}
                  >
                    <div className={styles.inquiryMsgItemTitle}>
                      {item.title}
                    </div>
                    ：
                    <div className={styles.inquiryMsgItemContent}>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <CommonPopup
                isOpen={showSuccessPopup}
                showIcon={false}
                messages={errorMSG}
                buttonText="戻る"
                onConfirm={() => navigate(to)}
                onClose={() => setShowSuccessPopup(false)}
              />

              <CommonPopup
                isOpen={showErrorPopup}
                showIcon={false}
                messages={errorMSG}
                buttonText="戻る"
                onClose={() => setShowErrorPopup(false)}
              /> */}
          {/* // TODO: REWRITE EmailSendCard, hard to reuse*/}
          {/* <EmailSendCard to="/applications" /> */}

          {showAccountPage && (
            <div className={styles.accountPage}>
              <div className={styles.emailText}>
                <p>アカウントID/パスワード/再パスワードを入力したのち</p>
                <p>アカウント登録ボタンを押下してください。</p>
                <div className={styles.requiredTip}>
                  <span>* </span>必須
                </div>
              </div>

              <Controller
                name="userId"
                control={control}
                render={({ field, fieldState }) => (
                  <FloatingLabelInput
                    name={field.name}
                    className={styles.marginBottomMinSize}
                    label="ユーザーID"
                    type="text"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    required
                    helpText={[
                      VIBISLE_BASIC_ERROR_MESSAGES.ACCOUNT_ID.LENGTH,
                      VIBISLE_BASIC_ERROR_MESSAGES.ACCOUNT_ID.PATTERN,
                    ]}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <FloatingLabelInput
                    name={field.name}
                    className={styles.marginBottomMinSize}
                    label="パスワード"
                    type="password"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    required
                    /*  helpText={
                VIBISLE_BASIC_ERROR_MESSAGES.PASSWORD.LENGTH +
                " " +
                VIBISLE_BASIC_ERROR_MESSAGES.PASSWORD.PATTERN
              } */
                  />
                )}
              />

              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <FloatingLabelInput
                    name={field.name}
                    className={styles.marginBottomMinSize}
                    label="確認用パスワード"
                    type="password"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    required
                    helpText={[
                      VIBISLE_BASIC_ERROR_MESSAGES.PASSWORD.LENGTH,
                      VIBISLE_BASIC_ERROR_MESSAGES.PASSWORD.PATTERN,
                    ]}
                  />
                )}
              />

              {/* <ul className={styles.pointsList}>
              <li className={styles.point}>
                {VIBISLE_BASIC_ERROR_MESSAGES.PASSWORD.LENGTH}
              </li>
              <li className={styles.point}>
                {VIBISLE_BASIC_ERROR_MESSAGES.PASSWORD.PATTERN}
              </li>
            </ul> */}

              {/* <input
                      id="verifyCode"
                      type="text"
                      {...register("verifyCode")}
                      placeholder="認証コード"
                      className={errors.verifyCode ? styles.error : ""}
                    /> */}

              <Controller
                name="verifyCode"
                control={control}
                render={({ field, fieldState }) => (
                  <FloatingLabelInput
                    name={field.name}
                    label="認証コード"
                    type="text"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    required
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    helpText={[
                      "メールに記載されている認証コードを入力して、アカウント登録を押下してください。",
                    ]}
                  />
                )}
              />

              <div className={styles.verifyCodeButtons}>
                <CommonButton type="submit" disabled={!isValid || !isDirty}>
                  アカウント登録
                  {/* TODO: add a spinner */}
                </CommonButton>
              </div>
            </div>
          )}

          {/* Debug info in development */}
          {import.meta.env.MODE !== "production" &&
            localStorage.getItem("devMode") === "true" && (
              <div className={styles.debugInfo}>
                <p>
                  Form State: {isValid ? "✅ Valid" : "❌ Invalid"} |{" "}
                  {isDirty ? "📝 Dirty" : "✨ Clean"}
                </p>
                <p>Errors: {Object.keys(errors).length}</p>
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

      {/* <CommonPopup
        isOpen={showErrorPopup}
        showIcon={true}
        messages={errorMessages}
        buttonText="戻る"
        onClose={() => setShowErrorPopup(false)}
        type="error"
        title="入力エラーがあります"
      /> */}
    </div>
  );
};

export default Account;
