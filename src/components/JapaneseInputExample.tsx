import React, { useState } from "react";
import JapaneseInput from "./JapaneseInput";

const JapaneseInputExample: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    kana: "",
    phone: "",
    postal: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate validation
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "氏名を入力してください";
    if (!formData.kana) newErrors.kana = "フリガナを入力してください";
    if (!formData.phone) newErrors.phone = "電話番号を入力してください";
    if (!formData.postal) newErrors.postal = "郵便番号を入力してください";
    if (!formData.email) newErrors.email = "メールアドレスを入力してください";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("フォームが正常に送信されました！");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>日本語入力フォーム例</h2>
      <p>
        全角文字を半角専用フィールドに入力するとエラーメッセージが表示されます。
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <JapaneseInput
            fieldType="name"
            label="氏名"
            required
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            error={errors.name}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <JapaneseInput
            fieldType="kana"
            label="フリガナ"
            required
            value={formData.kana}
            onChange={(value) => handleInputChange("kana", value)}
            error={errors.kana}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <JapaneseInput
            fieldType="phone"
            label="電話番号"
            required
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            error={errors.phone}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <JapaneseInput
            fieldType="postal"
            label="郵便番号"
            required
            value={formData.postal}
            onChange={(value) => handleInputChange("postal", value)}
            error={errors.postal}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <JapaneseInput
            fieldType="email"
            label="メールアドレス"
            required
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            error={errors.email}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          送信
        </button>
      </form>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>テスト用入力例：</h3>
        <ul>
          <li>
            <strong>電話番号</strong>: ０９０－１２３４－５６７８ (全角数字)
          </li>
          <li>
            <strong>郵便番号</strong>: １２３－４５６７ (全角数字)
          </li>
          <li>
            <strong>メールアドレス</strong>: ｔｅｓｔ＠ｅｘａｍｐｌｅ．ｃｏｍ
            (全角英数字)
          </li>
          <li>
            <strong>フリガナ</strong>: やまだたろう (ひらがな)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JapaneseInputExample;
