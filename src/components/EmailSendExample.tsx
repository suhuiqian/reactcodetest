import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonButton from "@/components/CommonButton";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { useEmailSender } from "@/hooks/useEmailSender";
import { emailSendSchema, type EmailSendData } from "@/schemas/auth";
import { showWarningPopup } from "@/components/GeneralPopup";

/**
 * Example component demonstrating email sending with CommonButton and enhanced state management
 */
const EmailSendExample: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm<EmailSendData>({
    resolver: zodResolver(emailSendSchema),
    defaultValues: {
      to: "",
      subject: "",
      content: "",
      type: "notification",
    },
  });

  const { sendEmailAsync } = useEmailSender({
    onSuccess: (data) => {
      console.log("✅ Email sent successfully:", data);
      reset(); // Clear form after success
    },
    onError: (error) => {
      console.error("❌ Email sending failed:", error);
    },
  });

  // API call function for CommonButton
  const handleEmailSend = async () => {
    const formData = getValues();

    return sendEmailAsync(formData);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px" }}>
      <h2>📧 Email Sending Example</h2>
      <p>Demonstrates enhanced CommonButton with email API functionality</p>

      <form onSubmit={handleSubmit(() => {})}>
        <Controller
          name="to"
          control={control}
          render={({ field, fieldState }) => (
            <FloatingLabelInput
              name={field.name}
              label="To Email *"
              type="email"
              value={field.value || ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              required
            />
          )}
        />

        <Controller
          name="subject"
          control={control}
          render={({ field, fieldState }) => (
            <FloatingLabelInput
              name={field.name}
              label="Subject *"
              type="text"
              value={field.value || ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              required
            />
          )}
        />

        <Controller
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor={field.name}>Content *</label>
              <textarea
                id={field.name}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                style={{
                  width: "100%",
                  height: "120px",
                  padding: "10px",
                  border: fieldState.error ? "2px solid red" : "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
                placeholder="Enter email content..."
              />
              {fieldState.error && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        <div style={{ marginTop: "20px" }}>
          {/* Enhanced CommonButton with API state management */}
          <CommonButton
            type="submit"
            onApiCall={handleEmailSend}
            loadingText="送信中..."
            successText="送信完了！"
            errorText="送信失敗"
            variant="primary"
            onSuccess={(data) => {
              console.log("🎉 Button success callback:", data);
            }}
            onError={(error) => {
              showWarningPopup("メール送信に失敗しました。", {
                title: "送信エラー",
              });
            }}
          >
            📧 メール送信
          </CommonButton>
        </div>
      </form>

      <div
        style={{
          marginTop: "40px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>🔧 Features Demonstrated:</h3>
        <ul style={{ fontSize: "14px", lineHeight: "1.6" }}>
          <li>
            ✅ <strong>Form validation</strong> with Zod schema
          </li>
          <li>
            ✅ <strong>Enhanced CommonButton</strong> with API state management
          </li>
          <li>
            ✅ <strong>Loading states</strong> (idle → loading → success/error)
          </li>
          <li>
            ✅ <strong>Visual feedback</strong> with spinner and color changes
          </li>
          <li>
            ✅ <strong>Error handling</strong> with popup notifications
          </li>
          <li>
            ✅ <strong>Auto form reset</strong> after successful send
          </li>
          <li>
            ✅ <strong>TypeScript safety</strong> with proper types
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmailSendExample;
