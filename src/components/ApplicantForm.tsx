import React, { useState } from "react";
import FloatingLabelInput from "@/components/FloatingLabelInput";
//import styles from "./ApplicantForm.module.css";
import styles from "./FormCard.module.css";
import TextTitle from "./TextTitle";
import CommonButton from "./CommonButton";

interface PrefilledData {
  name: string;
  kana: string;
  birthdate: string;
  gender: string;
  postalCode: string;
  prefecture: string;
  city: string;
  phone: string;
  email: string;
}

interface ApplicantFormProps {
  prefilledData?: PrefilledData;
  onSubmit?: (
    data: PrefilledData & { addressDetail: string; apartmentDetail: string }
  ) => void;
}

const MIN_LENGTH = 1;
const MAX_LENGTH = 30;

const FAKE_PREFILLED_DATA: PrefilledData = {
  name: "山田 太郎",
  kana: "ヤマダ タロウ",
  birthdate: "1990-01-01",
  gender: "男性",
  postalCode: "100-0001",
  prefecture: "東京都",
  city: "千代田区",
  phone: "090-1234-5678",
  email: "test@example.com",
};

const ApplicantForm: React.FC<ApplicantFormProps> = ({
  prefilledData = FAKE_PREFILLED_DATA,
  onSubmit = () => {
    alert("TOROKU");
  },
}) => {
  const [addressDetail, setAddressDetail] = useState("");
  const [apartmentDetail, setApartmentDetail] = useState("");
  const [addressError, setAddressError] = useState("");
  const [apartmentError, setApartmentError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (
      addressDetail.length < MIN_LENGTH ||
      addressDetail.length > MAX_LENGTH
    ) {
      setAddressError(
        `番地は${MIN_LENGTH}文字以上${MAX_LENGTH}文字以下で入力してください。`
      );
      valid = false;
    } else {
      setAddressError("");
    }
    if (apartmentDetail.length > MAX_LENGTH) {
      setApartmentError(
        `建物名・部屋番号等は${MAX_LENGTH}文字以下で入力してください。`
      );
      valid = false;
    } else {
      setApartmentError("");
    }
    if (!valid) return;
    onSubmit({ ...prefilledData, addressDetail, apartmentDetail });
  };

  return (
    <div className={styles.formCard}>
      <TextTitle text="契約者" />
      <form className={styles.applicantForm} onSubmit={handleSubmit}>
        <FloatingLabelInput
          name="name"
          label="氏名"
          value={prefilledData.name}
          disabled
        />
        <FloatingLabelInput
          name="kana"
          label="フリガナ"
          value={prefilledData.kana}
          disabled
        />
        <FloatingLabelInput
          name="birthdate"
          label="生年月日"
          value={prefilledData.birthdate}
          disabled
        />
        <FloatingLabelInput
          name="gender"
          label="性別"
          value={prefilledData.gender}
          disabled
        />
        <FloatingLabelInput
          name="postalCode"
          label="郵便番号"
          value={prefilledData.postalCode}
          disabled
        />
        <FloatingLabelInput
          name="prefecture"
          label="都道府県"
          value={prefilledData.prefecture}
          disabled
        />
        <FloatingLabelInput
          name="city"
          label="市区町村"
          value={prefilledData.city}
          disabled
        />
        <FloatingLabelInput
          name="addressDetail"
          label="番地 *"
          value={addressDetail}
          onChange={setAddressDetail}
          error={!!addressError}
          errorMessage={addressError}
          required
        />
        <FloatingLabelInput
          name="apartmentDetail"
          label="建物名・部屋番号等"
          value={apartmentDetail}
          onChange={setApartmentDetail}
          error={!!apartmentError}
          errorMessage={apartmentError}
          helpText="※ 例：〇〇マンション101号室"
        />
        <FloatingLabelInput
          name="phone"
          label="電話番号"
          value={prefilledData.phone}
          disabled
        />
        <FloatingLabelInput
          name="email"
          label="メールアドレス"
          value={prefilledData.email}
          disabled
        />
        <CommonButton
          type="submit"
          className={styles.fullWidthButton}
          variant="primary"
        >
          登録
        </CommonButton>
      </form>
    </div>
  );
};

export default ApplicantForm;
