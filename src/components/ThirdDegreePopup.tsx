import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import CommonButton from "./CommonButton";
import styles from "./ThirdDegreePopup.module.css";

interface ThirdDegreePopupProps {
  children: React.ReactNode; // Trigger element
  title?: string;
  description?: string;
}

const ThirdDegreePopup: React.FC<ThirdDegreePopupProps> = ({
  children,
  title = "三親等説明",
  description = "三親等についての説明図です",
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.relationshipOverlay} />
        <Dialog.Content className={styles.relationshipModal}>
          <div className={styles.relationshipContent}>
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {description}
            </Dialog.Description>

            <div className={styles.diagramContainer}>
              {/* TODO: 
              // 1. a better way to reuse svg file
              // 2. need a better svg
              */}

              <img
                src="/SanshintoSetsumei.svg"
                alt="三親等の関係図。配偶者、子、親、祖父母、孫、兄弟姉妹などの家族関係を示した図表"
                className={styles.relationshipDiagram}
              />
            </div>

            <div className={styles.relationshipActions}>
              <Dialog.Close asChild>
                <CommonButton variant="primary">閉じる</CommonButton>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ThirdDegreePopup;
