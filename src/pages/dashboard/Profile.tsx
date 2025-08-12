import React from "react";
import FormCard from "@/components/FormCard";
import CommonButton from "@/components/CommonButton";
import styles from "./Profile.module.css";

const profileData = [
  { label: "氏名", value: "山田一二三" },
  { label: "フリガナ", value: "ヤマダヒフミ" },
  { label: "生年月日", value: "1900/05/11" },
  { label: "性別", value: "男性" },
  { label: "住所", value: "〒0510011\n北海道中央町2-3-13" },
  { label: "電話番号", value: "0510000001" },
  { label: "メールアドレス", value: "tanaka112@mailto.plus" },
  { label: "パスワード", value: "********" },
];

const Profile: React.FC = () => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <div className={styles.content}>
          <FormCard
            title="アカウント情報"
            fields={profileData.map((f) => ({
              ...f,
              type: "text",
              disabled: true,
            }))}
          />
          <div className={styles.buttonContainer}>
            <CommonButton variant="outline" to="/password-change">
              パスワード変更
            </CommonButton>
          </div>
          <div className={styles.backButtonContainer}>
            <CommonButton variant="primary" to="/dashboard">
              TOPに戻る
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
