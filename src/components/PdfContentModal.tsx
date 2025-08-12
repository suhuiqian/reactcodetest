import React from "react";
import CommonButton from "./CommonButton";
import "./PdfContentModal.css";

interface PdfContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
}

const PdfContentModal: React.FC<PdfContentModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="pdf-modal-header">
            <h2>{title}</h2>
            <button type="button" className="pdf-modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        )}

        <div className="pdf-modal-body">{content}</div>

        <div className="pdf-modal-footer">
          <CommonButton onClick={onClose} variant="primary">
            閉じる
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default PdfContentModal;
