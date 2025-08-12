import React, { useState, useEffect } from "react";
import IdentityVerifyContent from "./IdentityVerifyContent";
import styles from "./IdentityVerifyFilesUpload.module.css";
import type { IdentityVerifySection } from "./IdentityVerifyContent";

interface IdentityVerifyFilesUploadProps {
  content?: string;
  sections?: IdentityVerifySection[];
  children?: React.ReactNode;
  prefix?: boolean;
  fileNumber: number;
  onFilesChange?: (files: (File | null)[]) => void;
}

const IdentityVerifyFilesUpload: React.FC<IdentityVerifyFilesUploadProps> = ({
  content,
  sections,
  children,
  fileNumber,
  onFilesChange,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>(
    Array(fileNumber).fill(null)
  );

  const handleFileUpload =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("ファイルサイズは5MB以下にしてください。");
          return;
        }
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/heic",
          "application/pdf",
        ];
        if (!allowedTypes.includes(file.type)) {
          alert(
            "アップロード可能な形式はjpeg、heic、jpg、png、gif、pdfになります。"
          );
          return;
        }

        const updatedFiles = [...uploadedFiles];
        updatedFiles[index] = file;
        setUploadedFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
      }
    };

  const removeFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index] = null;
    setUploadedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  if (fileNumber <= 0 || fileNumber >= 5) {
    throw new Error("fileNumber must be between 1 and 4");
  }
  return (
    <div className={styles.textCard}>
      <div className={styles.h4Style}>本人確認書類</div>
      <div className={styles.textContext}>
        {children ? (
          children
        ) : sections ? (
          <IdentityVerifyContent sections={sections} />
        ) : (
          content
        )}
      </div>

      <div className={styles.documentSection}>
        <div className={styles.documentGroup}>
          {uploadedFiles.map((file, index) => (
            <div key={index} className={styles.uploadSlot}>
              {file ? (
                <div className={styles.uploadedFile}>
                  <span className={styles.fileIcon}>📄</span>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className={styles.removeButton}
                  >
                    削除
                  </button>
                </div>
              ) : (
                <div className={styles.uploadArea}>
                  <input
                    type="file"
                    onChange={handleFileUpload(index)}
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.heic"
                    id={`file-upload-${index}`}
                    className={styles.fileInput}
                  />
                  <label
                    htmlFor={`file-upload-${index}`}
                    className={styles.uploadLabel}
                  >
                    <div className={styles.uploadIcon}></div>
                    <div className={styles.uploadText}>
                      <strong>ファイルアップロード {/*index + 1*/}</strong>
                    </div>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tipGroup}>
        <div className={styles.tipTitle}>【注意】</div>
        <ul className={styles.tipsList}>
          <li className={styles.tip}>ファイルサイズの上限は５MBです。</li>
          <li className={styles.noContentTip}>
            上限を超える場合は、エラーが表示されます。
          </li>
          <li className={styles.noContentTip}>
            解決できない場合は、ヒューマンライフのお客様相談窓口までお問い合わせください。
          </li>
          <li className={styles.tip}>
            アップロード可能な形式はjpeg、jpg、png、gif、pdf、heicになります。
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IdentityVerifyFilesUpload;
