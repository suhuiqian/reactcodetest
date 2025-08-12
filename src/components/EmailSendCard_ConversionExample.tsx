import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./EmailSendCard.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { mailFormSchema, type MailFormData } from "@/schemas/auth";
// OLD WAY - CommonPopup
// import CommonPopup from "@/components/CommonPopup";

// NEW WAY - GeneralPopup
import { showSuccessPopup, showErrorPopup } from "@/components/GeneralPopup";

interface EmailSendCardProps {
  to: string;
}

const EmailSendCard: React.FC<EmailSendCardProps> = ({ to }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<MailFormData>({
    resolver: zodResolver(mailFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "tanaka112@mailto.plus",
      verifyCode: "",
    },
  });

  // OLD WAY - State management for popups
  // const [showErrorPopup, setShowErrorPopup] = useState(false);
  // const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // const [errorMSG, setErrorMSG] = useState<string[]>([]);

  // NEW WAY - No state needed! Just call the functions directly

  const onSubmit = async (data: MailFormData) => {
    try {
      // Simulate API call
      console.log("Submitting:", data);

      // OLD WAY
      // setErrorMSG([
      //   "メールを送信しました。メールをご確認ください。",
      //   "5分経っても届かない場合は、迷惑メールフォルダも確認してください。",
      // ]);
      // setShowSuccessPopup(true);

      // NEW WAY - Much simpler!
      showSuccessPopup(
        "メールを送信しました。メールをご確認ください。\n5分経っても届かない場合は、迷惑メールフォルダも確認してください。",
        {
          title: "送信完了",
          buttonText: "戻る",
          onConfirm: () => navigate(to),
        }
      );
    } catch (error) {
      // OLD WAY
      // setErrorMSG([
      //   "メール送信に失敗しました。",
      //   "しばらく時間をおいて再度お試しください。",
      // ]);
      // setShowErrorPopup(true);

      // NEW WAY - Much simpler!
      showErrorPopup(
        "メール送信に失敗しました。\nしばらく時間をおいて再度お試しください。",
        {
          title: "送信エラー",
          buttonText: "戻る",
        }
      );
    }
  };

  return (
    <div className={styles.emailCard}>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>メール認証</h2>
        <p className={styles.cardDescription}>
          登録されたメールアドレスに認証コードを送信します。
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Form fields here */}
          <CommonButton type="submit" disabled={!isValid}>
            認証コードを送信
          </CommonButton>
        </form>
      </div>

      {/* OLD WAY - Complex state management and JSX */}
      {/* 
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
      */}

      {/* NEW WAY - No JSX needed! Popups are handled globally */}
    </div>
  );
};

export default EmailSendCard;

// SUMMARY OF BENEFITS:
//
// 1. LESS CODE:
//    - No useState for popup states
//    - No JSX for popup components
//    - No manual state management
//
// 2. SIMPLER API:
//    - Just call showSuccessPopup() or showErrorPopup()
//    - No need to manage open/close states
//    - Clean, functional approach
//
// 3. GLOBAL SYSTEM:
//    - Works from any component
//    - Consistent UI across the app
//    - Portal-based rendering
//
// 4. BETTER UX:
//    - Smooth animations
//    - Consistent styling
//    - Better accessibility
//
// MIGRATION STEPS:
// 1. Remove CommonPopup import
// 2. Add GeneralPopup functions import
// 3. Remove state variables (showErrorPopup, showSuccessPopup, errorMSG)
// 4. Replace popup state logic with direct function calls
// 5. Remove CommonPopup JSX
// 6. Join multiple messages with \n instead of array
