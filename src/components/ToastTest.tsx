import React from "react";
import { useToast } from "@/contexts/ToastContext";
import CommonButton from "./CommonButton";

const ToastTest: React.FC = () => {
  const { addToast } = useToast();

  const showSuccessToast = () => {
    addToast({
      type: "success",
      message: "操作が正常に完了しました！",
      duration: 3000,
    });
  };

  const showErrorToast = () => {
    addToast({
      type: "error",
      message: "エラーが発生しました。もう一度お試しください。",
      duration: 5000,
    });
  };

  const showInfoToast = () => {
    addToast({
      type: "info",
      message: "情報をお知らせします。",
      duration: 4000,
    });
  };

  const showWarningToast = () => {
    addToast({
      type: "warning",
      message: "注意が必要です。",
      duration: 4000,
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <CommonButton onClick={showSuccessToast} variant="primary">
        Success Toast
      </CommonButton>
      <CommonButton onClick={showErrorToast} variant="secondary">
        Error Toast
      </CommonButton>
      <CommonButton onClick={showInfoToast} variant="outline">
        Info Toast
      </CommonButton>
      <CommonButton onClick={showWarningToast} variant="primary">
        Warning Toast
      </CommonButton>
    </div>
  );
};

export default ToastTest;
