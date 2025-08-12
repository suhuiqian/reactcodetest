import type { InsuredFormData } from "@/types";

// Default values for insured form
export const insuredFormDefaultValues: InsuredFormData = {
  lastName: "佐藤",
  firstName: "次郎",
  lastNameKana: "サトウ",
  firstNameKana: "ジロウ",
  birthDate: "1992-11-25",
  gender: "男性",
  relationship: "配偶者",
  postalCode: "0510011",
  prefecture: "北海道",
  city: "室蘭市中央町",
  address: "2-3-1",
  building: "301",
  phoneNumber: "05051000001",
  email: "test@example.com",
};

// Read-only fields data (when "same as applicant" is selected)
export const insuredReadOnlyFields = [
  { label: "氏名（姓）", value: "佐藤", type: "text" as const },
  { label: "氏名（名）", value: "太郎", type: "text" as const },
  { label: "フリガナ（セイ）", value: "サトウ", type: "text" as const },
  { label: "フリガナ（メイ）", value: "タロウ", type: "text" as const },
  { label: "生年月日", value: 19900511, type: "date" as const },
  { label: "性別", value: "男性", type: "text" as const },
  { label: "郵便番号", value: "0510011", type: "text" as const },
  { label: "都道府県", value: "北海道", type: "text" as const },
  { label: "市区町村", value: "室蘭市中央町", type: "text" as const },
  { label: "番地など", value: "2-3-1", type: "text" as const },
  { label: "建物名・部屋番号等", value: "301", type: "text" as const },
  { label: "電話番号", value: "05051000001", type: "tel" as const },
];
