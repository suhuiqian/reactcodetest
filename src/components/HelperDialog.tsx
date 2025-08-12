import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./HelperDialog.module.css";
import CommonButton from "./CommonButton";

const HelperDialog: React.FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className={styles.helpButton}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.helpIcon}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 0V15.5556H14.4444V20L7.66667 15.5556H0V0H20ZM10.0487 10.4722C9.69279 10.4722 9.39766 10.5883 9.16328 10.8205C8.92891 11.0527 8.81172 11.3424 8.81172 11.6897C8.81172 12.0543 8.92674 12.3537 9.15677 12.5881C9.38681 12.8225 9.68411 12.9397 10.0487 12.9397C10.4046 12.9397 10.6987 12.8225 10.9309 12.5881C11.1631 12.3537 11.2792 12.0608 11.2792 11.7092C11.2792 11.3533 11.1631 11.0582 10.9309 10.8238C10.6986 10.5894 10.4046 10.4722 10.0487 10.4722ZM10.5305 3.38891C9.56259 3.38891 8.59688 3.64064 7.63333 4.14411L8.21276 5.58943C8.99832 5.14234 9.66889 4.91882 10.2245 4.91885C10.563 4.91885 10.831 5.00023 11.0285 5.16297C11.226 5.32571 11.3247 5.54599 11.3247 5.8238C11.3247 6.04516 11.2542 6.2383 11.1132 6.40323C11.0073 6.52691 10.8069 6.697 10.512 6.91349L9.81354 7.41349C9.7537 7.45775 9.69452 7.50291 9.63604 7.54896L9.51484 7.65C9.40634 7.7476 9.31953 7.85936 9.25443 7.98526C9.14158 8.20224 9.08516 8.58635 9.08516 9.1376V9.71052H11.0057V9.44359C11.0057 9.04863 11.0556 8.7741 11.1555 8.62C11.2553 8.46594 11.5222 8.24351 11.9562 7.95271L12.1614 7.81234C12.6208 7.4879 12.9474 7.1842 13.1411 6.90125C13.3625 6.57792 13.4732 6.18839 13.4732 5.73266C13.4732 5.05988 13.2453 4.513 12.7896 4.09203C12.2731 3.62328 11.5201 3.38891 10.5305 3.38891Z"
              fill="currentColor"
            />
          </svg>
          <span className={styles.helpText}>お問い合わせ</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>お客様相談窓口</Dialog.Title>

          <div className={styles.contactInfo}>
            <div className={styles.description}>
              <p>ご不明な点やご不便な点がございましたら、</p>
              <p>下記のお客様相談窓口までお問い合わせください。</p>
            </div>

            <div className={styles.contactDetails}>
              <div className={styles.contactRow}>
                <span className={styles.label}>電話番号：</span>
                <span className={styles.value}>03-5809-8070</span>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.label}>FAX：</span>
                <span className={styles.value}>03-5809-8132</span>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.label}>受付時間：</span>
                <span className={styles.value}>9:00~17:00</span>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.label}>受付日：</span>
                <div className={styles.value}>
                  <p>月曜から金曜日（祝日および年末年始等</p>
                  <p>の休業期間を除く）</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Dialog.Close asChild>
              <CommonButton /* type="button" className={styles.closeButton} */>
                閉じる
              </CommonButton>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HelperDialog;
