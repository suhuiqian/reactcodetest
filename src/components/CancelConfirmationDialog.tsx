import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import CommonButton from "./CommonButton";
import styles from "./CancelConfirmationDialog.module.css";

interface CancelConfirmationDialogProps {
  children: React.ReactNode; // Trigger element (e.g., cancel button)
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

const CancelConfirmationDialog: React.FC<CancelConfirmationDialogProps> = ({
  children,
  title = "キャンセルの確認",
  description = "この操作を実行すると、入力した内容が失われます。本当にキャンセルしますか？",
  confirmText = "はい、キャンセルします",
  cancelText = "いいえ、続行します",
  onConfirm,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.overlay} />
        <AlertDialog.Content className={styles.content}>
          <AlertDialog.Title className={styles.title}>
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className={styles.description}>
            {description}
          </AlertDialog.Description>

          <div className={styles.actions}>
            <AlertDialog.Cancel asChild>
              <CommonButton variant="outline" className={styles.cancelButton}>
                {cancelText}
              </CommonButton>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <CommonButton
                variant="secondary"
                className={styles.confirmButton}
                onClick={onConfirm}
              >
                {confirmText}
              </CommonButton>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default CancelConfirmationDialog;
