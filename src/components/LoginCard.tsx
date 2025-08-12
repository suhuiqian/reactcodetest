import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/CommonButton";
import styles from "./LoginCard.module.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { loginFormSchema, type LoginFormData } from "@/schemas/auth";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { showWarningPopup } from "@/components/GeneralPopup";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Check, X, RefreshCw } from "lucide-react";

// TODO: fix here?
interface LoginCardProps {
  to: string; // Optional prop for navigation
  type: "newContract" | "myPage";
}

// Configuration for different login types
const LOGIN_CONFIG = {
  newContract: {
    title: "新規契約",
    links: [
      {
        text: "パスワードを忘れた方はこちら",
        to: "/forgot-password",
        isLink: true, //false, // Just text for now
        style: {},
      },
      {
        text: "アカウントをお持ちでない方はこちら",
        // TODO: really need a red text?
        to: "/account",
        isLink: true,
        style: {
          color: "red",
        },
      },
    ],
  },
  myPage: {
    title: "マイページ",
    links: [
      {
        text: "パスワードを忘れた方はこちら",
        to: "/forgot-password",
        isLink: true,
        style: {}, // Add empty style object
      },
    ],
  },
} as const;

const LoginCard: React.FC<LoginCardProps> = ({ to, type }) => {
  const navigate = useNavigate();
  const config = LOGIN_CONFIG[type];
  const { login, isLoggingIn } = useAuth();
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    //mode: "onChange",
    //mode: "onBlur", // 失去焦点时校验并显示错误
    mode: "onSubmit",
    // NOTE: avoid MUST-INPUT validation (related to FloatingLabelInput required)
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Handle login logic here
    console.log("🚀 Starting login with data:", data);

    login(data, {
      onSuccess: () => {
        console.log("✅ Login successful");
        navigate(to);
      },
      onError: (error) => {
        console.log("❌ Login failed:", error);
      },
    });
    console.log("Login attempted with:", data);
    // After suoccessful login, redirect to application page
    // TODO: Query API here
    // LOADING SPINNER?
    /* navigate(to); */
    /* showWarningPopup("ログインに失敗しました。"); */
  };

  const onError = (error: any) => {
    console.log("❌ Login failed:", JSON.stringify(error));
    /* showWarningPopup("ログインに失敗しました。"); */
  };

  return (
    <div className={styles.accountPage}>
      <div className={styles.loginContainer}>
        <form
          className={styles.loginForm}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Controller
            name="userId"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="お客様ID"
                type="text"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                /* required */
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <FloatingLabelInput
                name={field.name}
                label="パスワード"
                type="password"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                /* required */
              />
            )}
          />

          {/* Dynamic links based on configuration */}
          {/* TODO: store current state even page changes? */}
          <div className={styles.linkText}>
            {config.links.map((link, index) => (
              <div key={index} className={styles.linkItem}>
                {link.isLink ? (
                  <Link to={link.to} style={link.style ?? {}}>
                    {link.text}
                  </Link>
                ) : (
                  <span className={styles.disabledLink}>{link.text}</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.actionButtons}>
            <CommonButton
              type="submit"
              /* disabled={!isValid || !isDirty} */
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className={styles.loadingSpinner}>
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "ログイン"
              )}
            </CommonButton>
            {/* {isLoggingIn && (
              <div className={styles.loadingSpinner}>
                <Loader2 className="animate-spin" />
              </div>
            )} */}
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
                <CommonButton
                  onClick={() => {
                    showWarningPopup(
                      "アカウントIDまたはパスワードが違います。",
                      {
                        title: "ログインできませんでした",
                      }
                    );
                  }}
                >
                  ログイン失敗
                </CommonButton>
              </div>
            )}
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
