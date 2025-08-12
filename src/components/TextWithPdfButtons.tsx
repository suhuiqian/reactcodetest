import React, { useState } from "react";
import CommonButton from "./CommonButton";
import PdfContentModal from "./PdfContentModal";
import ImportantMattersContent from "./PdfContents/ImportantMattersContent";
import TermsContent from "./PdfContents/TermsContent";
import type { DisclosureAnswers } from "../services/PdfService";
import styles from "./TextWithPdfButtons.module.css";

interface TextWithPdfButtonsProps {
  text: string;
  pdfTitle?: string;
  disclosureAnswers?: DisclosureAnswers[];
  onDisplayClick?: () => void;
  onDownloadClick?: () => void;
  className?: string;
}

const TextWithPdfButtons: React.FC<TextWithPdfButtonsProps> = ({
  text,
  pdfTitle,
  disclosureAnswers = [],
  onDisplayClick,
  onDownloadClick,
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadPdfClicked, setDownloadPdfClicked] = useState(false);

  const handleDisplayPdf = () => {
    setIsModalOpen(true);
    if (onDisplayClick) {
      onDisplayClick();
    }
  };

  const handleDownloadPdf = () => {
    try {
      let pdfUrl: string;
      let fileName: string;

      if (pdfTitle === "重要事項等のご説明") {
        pdfUrl = "/pdfs/important-matters.pdf";
        fileName = "重要事項等のご説明.pdf";
      } else if (pdfTitle === "約款") {
        pdfUrl = "/pdfs/terms.pdf";
        fileName = "約款.pdf";
      } else {
        throw new Error("Unknown PDF type");
      }

      // Create download link
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      link.target = "_blank"; // Open in new tab if download doesn't work

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (onDownloadClick) {
        onDownloadClick();
      }
      setDownloadPdfClicked(true);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("PDFのダウンロード中にエラーが発生しました");
    }
  };

  const getModalContent = () => {
    if (pdfTitle === "重要事項等のご説明") {
      return <ImportantMattersContent />;
    } else if (pdfTitle === "約款") {
      return <TermsContent disclosureAnswers={disclosureAnswers} />;
    }
    return null;
  };

  const pdfButtons = (
    <div className={styles.pdfButtons}>
      <CommonButton
        onClick={handleDisplayPdf}
        variant="primary"
        className={styles.pdfButton}
      >
        表示
      </CommonButton>

      <CommonButton
        onClick={handleDownloadPdf}
        variant="primary"
        className={`${styles.pdfButton} ${
          "" // downloadPdfClicked ? styles.clicked : "", to prompt users downloaded status
        }`}
      >
        ダウンロード
      </CommonButton>
    </div>
  );

  return (
    <>
      <div className={`${styles.textCard} ${className}`}>
        <div className={styles.textContent}>{text}</div>
        {pdfButtons}
      </div>

      <PdfContentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        /*  title={pdfTitle} */
        content={getModalContent()}
      />
    </>
  );
};

export default TextWithPdfButtons;
