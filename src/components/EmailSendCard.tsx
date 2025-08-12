import React, { useState } from "react";
import { useNavigate, navigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./EmailSendCard.module.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mailFormSchema, type MailFormData } from "@/schemas/auth";
import CommonPopup from "@/components/CommonPopup";
import { useEmailSender } from "@/hooks/useEmailSender";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { inquiryMsg } from "@/constants/disclosureFormContent";

interface EmailSendCardProps {
  to: string;
}

const EmailSendCard: React.FC<EmailSendCardProps> = ({ to }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<MailFormData>({
    resolver: zodResolver(mailFormSchema),
    mode: "onChange",
    //mode: "onBlur", // 失去焦点时校验并显示错误
    // mode: "onSubmit",
    defaultValues: {
      email: "tanaka112@mailto.plus",
      verifyCode: "",
    },
  });

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMSG, setErrorMSG] = useState<string[]>([]);

  const {
    sendVerificationCode,
    isSendingVerification,
    verifyCode,
    isVerifyingCode,
  } = useEmailSender();
  // TODO: change this
  const showVerifySuccessPopup = () => {
    setErrorMSG([
      "認証コードを確認しました(POPOUTよりNOTIFICATIONの方か良い?)",
    ]);
    setShowSuccessPopup(true);
  };

  // TODO: change this
  const showVerifyErrorPopup = () => {
    setErrorMSG([
      "認証コードを確認できませんでした。",
      "認証コードが正しく入力されているかご確認ください。",
    ]);
    setShowErrorPopup(true);
  };

  const onSubmit = (data: MailFormData) => {
    // verifyCode({ email: data.email, verifyCode: data.verifyCode });

    navigate(to);
    // Handle login logic here
    console.log("Login attempted with:", data);
    /* navigate(to); */
    // After successful login, redirect to application page
    /*  if (data.verifyCode === "******") {
      showVerifyErrorPopup();
    } else {
      showVerifySuccessPopup();
    } 
  };

  const sendMail = (email: string) => {
    // Handle login logic here
    sendVerificationCode({ email, verifyCode: "" });
    console.log("Login attempted with:", email);
    // After successful login, redirect to application page
    /*  navigate(to); */
  };

  return (
    <div className={styles.accountPage}>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.topMsgText}>
            <p>
              アカウント登録にあたり、表示されているメールアドレスに認証コードを送ります。
            </p>
            <p>
              表示されているメールアドレスをご確認の上、
            </p>
            <p>
              メール送信ボタンを押下してください。
            </p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.fontSize18}>メールアドレス</label>
            <input
              id="email"
              type="text"
              disabled={true}
              defaultValue="tanaka112@mailto.plus"
              className={errors.email ? styles.error : ""}
            />
            <input
              type="hidden"
              {...register("email")}
              value="tanaka112@mailto.plus"
            />
          </div>

          <div className={styles.sendMailButtons}>
            <CommonButton
              onClick={() => sendMail("tanaka112@mailto.plus")}
              disabled={isSendingVerification}
            >
              メール送信
            </CommonButton>
          </div>
          <div className={styles.mailNotice}>
            <ul className={styles.pointsList}>
              <li className={styles.point}>
                メールが届かない、または表示されているメールアドレスが現在ご使用のメールアドレスと異なる場合は、お客様相談窓口に問い合わせください。
              </li>
            </ul>
          </div>
          <div className={`${styles.modalContent} ${styles.fontStyle}`}>

            <div className={styles.inquiryMsgConsultationTitle}>
              {inquiryMsg.consultationCounterHead}
            </div>

            <div className={styles.inquiryMsgConsultationList}>
              {inquiryMsg.consultationList.map((item, index) => (
                <div key={index} className={styles.inquiryMsgConsultationItem}>
                  <div className={styles.inquiryMsgItemTitle}>{item.title}</div>
                  ：
                  <div className={styles.inquiryMsgItemContent}>{item.content}</div>
                </div>
              ))}
            </div>

          </div>

          <div className={styles.inputGroup}>
            <div className={styles.requiredTip}><span>* </span>必須</div>
            <Controller
              name="verifyCode"
              control={control}
              render={({ field, fieldState }) => (
                <FloatingLabelInput
                  name={field.name}
                  className={styles.marginBottomMinSize}
                  label="認証コード"
                  type="text"
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
            <ul className={styles.pointsList}>
              <li className={styles.point}>
                メールに記載されている認証コードを入力して、アカウント登録を押下してください。
              </li>
            </ul>
          </div>

          <div className={styles.verifyCodeButtons}>
            <CommonButton
              type="submit"
              disabled={!isValid || !isDirty || isVerifyingCode}
            >
              認証
              {/* TODO: add a spinner */}
            </CommonButton>
          </div>

          {/* Debug info in development */}
          {import.meta.env.MODE !== "production" &&
            localStorage.getItem("devMode") === "true" && (
              <div className={styles.debugInfo}>
                <p>
                  Form State: {isValid ? "✅ Valid" : "❌ Invalid"} |{" "}
                  {isDirty ? "📝 Dirty" : "✨ Clean"}
                </p>
                <p>Errors: {Object.keys(errors).length}</p>
              </div>
            )}
        </form>
      </div>
      <CommonPopup
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
      />
    </div>
  );
};

export default EmailSendCard;
