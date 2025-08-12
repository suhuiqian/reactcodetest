import React from "react";
import { showToast } from "./SimpleToast";
import CommonButton from "./CommonButton";

const SimpleToastTest: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <CommonButton
        onClick={() => showToast("住所が見つかりました！", "success")}
        variant="primary"
      >
        Success Toast
      </CommonButton>
      <CommonButton
        onClick={() => showToast("エラーが発生しました", "error")}
        variant="secondary"
      >
        Error Toast
      </CommonButton>
    </div>
  );
};

export default SimpleToastTest;
