import React from "react";
import {
  showSuccessPopup,
  showErrorPopup,
  showWarningPopup,
  showInfoPopup,
} from "./GeneralPopup";

const GeneralPopupDemo: React.FC = () => {
  const handleShowSuccess = () => {
    showSuccessPopup("操作が正常に完了しました。", {
      title: "成功",
      buttonText: "OK",
    });
  };

  const handleShowError = () => {
    showErrorPopup("アカウントIDまたはパスワードが違います。", {
      title: "ログインできませんでした。",
      buttonText: "閉じる",
    });
  };

  const handleShowWarning = () => {
    showWarningPopup("この操作は元に戻すことができません。続行しますか？", {
      title: "警告",
      buttonText: "OK",
      onConfirm: () => {
        console.log("Warning confirmed");
      },
    });
  };

  const handleShowInfo = () => {
    showInfoPopup(
      "システムメンテナンスのため、一時的にサービスを停止いたします。",
      {
        title: "お知らせ",
        buttonText: "了解",
      }
    );
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>General Popup Demo</h2>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          marginTop: "2rem",
        }}
      >
        <button
          onClick={handleShowSuccess}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 16px",
            cursor: "pointer",
          }}
        >
          Show Success Popup
        </button>

        <button
          onClick={handleShowError}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 16px",
            cursor: "pointer",
          }}
        >
          Show Error Popup
        </button>

        <button
          onClick={handleShowWarning}
          style={{
            backgroundColor: "#ffc107",
            color: "#333",
            border: "none",
            borderRadius: "8px",
            padding: "12px 16px",
            cursor: "pointer",
          }}
        >
          Show Warning Popup
        </button>

        <button
          onClick={handleShowInfo}
          style={{
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 16px",
            cursor: "pointer",
          }}
        >
          Show Info Popup
        </button>
      </div>

      <div style={{ marginTop: "2rem", fontSize: "14px", color: "#666" }}>
        <h3>Usage Examples:</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          {`// Simple error popup
showErrorPopup("アカウントIDまたはパスワードが違います。", {
  title: "ログインできませんでした。",
  buttonText: "閉じる",
});

// Success with callback
showSuccessPopup("保存が完了しました。", {
  onConfirm: () => {
    // Handle success action
  }
});

// Warning with confirmation
showWarningPopup("削除しますか？", {
  title: "確認",
  onConfirm: () => {
    // Handle delete action
  }
});`}
        </pre>
      </div>
    </div>
  );
};

export default GeneralPopupDemo;
