import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "@/components/StepIndicator/StepIndicator";
import CommonButton from "@/components/CommonButton";
import styles from "./NewInquiry.module.css";

interface InquiryFormData {
  category: string;
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
}

const steps = [
  { id: 1, title: "入力", text: "お問い合わせ内容を入力" },
  { id: 2, title: "確認", text: "内容を確認" },
  { id: 3, title: "完了", text: "送信完了" },
];

const NewInquiry: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<InquiryFormData>({
    category: "",
    title: "",
    content: "",
    priority: "medium",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Inquiry submitted:", formData);
      setCurrentStep(3);
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    }
  };

  const handleComplete = () => {
    navigate("/supports");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Form formData={formData} onInputChange={handleInputChange} />
        );
      case 2:
        return <Step2Preview formData={formData} />;
      case 3:
        return <Step3Success />;
      default:
        return null;
    }
  };

  const renderButtons = () => {
    if (currentStep === 1) {
      return (
        <div className={styles.buttonGroup}>
          <CommonButton
            variant="outline"
            onClick={() => navigate("/customer-support")}
          >
            キャンセル
          </CommonButton>
          <CommonButton
            variant="primary"
            onClick={handleNext}
            disabled={
              !formData.category || !formData.title || !formData.content
            }
          >
            次へ
          </CommonButton>
        </div>
      );
    } else if (currentStep === 2) {
      return (
        <div className={styles.buttonGroup}>
          <CommonButton variant="outline" onClick={handleBack}>
            戻る
          </CommonButton>
          <CommonButton variant="primary" onClick={handleSubmit}>
            送信する
          </CommonButton>
        </div>
      );
    } else if (currentStep === 3) {
      return (
        <div className={styles.buttonGroup}>
          <CommonButton variant="primary" onClick={handleComplete}>
            お問い合わせ一覧に戻る
          </CommonButton>
        </div>
      );
    }
  };

  return (
    <div className={styles.newInquiryPage}>
      <div className={styles.newInquiryContainer}>
        <div className={styles.header}>
          <h2>お問い合わせ</h2>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep - 1} />

        <div className={styles.content}>{renderStep()}</div>

        {renderButtons()}
      </div>
    </div>
  );
};

// Step 1: Form Component
const Step1Form: React.FC<{
  formData: InquiryFormData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}> = ({ formData, onInputChange }) => {
  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="category">カテゴリ</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={onInputChange}
          required
        >
          <option value="">選択してください</option>
          <option value="保険金請求">保険金請求</option>
          <option value="契約変更">契約変更</option>
          <option value="支払い">支払い</option>
          <option value="書類">書類</option>
          <option value="解約">解約</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title">件名</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={onInputChange}
          placeholder="お問い合わせの件名を入力してください"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="priority">優先度</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={onInputChange}
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">お問い合わせ内容</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={onInputChange}
          placeholder="お問い合わせの詳細を入力してください"
          rows={6}
          required
        />
      </div>
    </div>
  );
};

// Step 2: Preview Component
const Step2Preview: React.FC<{ formData: InquiryFormData }> = ({
  formData,
}) => {
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "low":
        return "低";
      case "medium":
        return "中";
      case "high":
        return "高";
      default:
        return "中";
    }
  };

  return (
    <div className={styles.preview}>
      <h3>お問い合わせ内容の確認</h3>
      <div className={styles.previewItem}>
        <span className={styles.previewLabel}>カテゴリ:</span>
        <span className={styles.previewValue}>{formData.category}</span>
      </div>
      <div className={styles.previewItem}>
        <span className={styles.previewLabel}>件名:</span>
        <span className={styles.previewValue}>{formData.title}</span>
      </div>
      <div className={styles.previewItem}>
        <span className={styles.previewLabel}>優先度:</span>
        <span className={styles.previewValue}>
          {getPriorityText(formData.priority)}
        </span>
      </div>
      <div className={styles.previewItem}>
        <span className={styles.previewLabel}>お問い合わせ内容:</span>
        <div className={styles.previewContent}>{formData.content}</div>
      </div>
    </div>
  );
};

// Step 3: Success Component
const Step3Success: React.FC = () => {
  return (
    <div className={styles.success}>
      <div className={styles.successIcon}>✓</div>
      <h3>お問い合わせを送信しました</h3>
      <p>お問い合わせを受け付けました。回答までしばらくお待ちください。</p>
    </div>
  );
};

export default NewInquiry;
