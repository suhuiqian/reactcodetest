import { beneficiaryFormSchema, insuredFormSchema } from "@/schemas/forms";
import type { BeneficiaryFormData, InsuredFormData } from "@/types/forms";

// Re-export types for backward compatibility
export type { BeneficiaryFormData, InsuredFormData };
export { beneficiaryFormSchema, insuredFormSchema };

// Helper function to convert date format from YYYY/MM/DD to YYYY-MM-DD
export const convertDateFormat = (dateString: string) => {
  return dateString.replace(/\//g, "-");
};

export const policyholderFields = [
  { label: "氏名", value: "佐藤太郎", type: "text" as const },
  { label: "フリガナ", value: "サトウタロウ", type: "text" as const },
  {
    label: "生年月日",
    value: convertDateFormat("1990/05/11"),
    type: "date" as const,
  },
  { label: "性別", value: "男性", type: "text" as const },
  /*  { label: "続柄", value: "本人", type: "text" as const }, */
  { label: "郵便番号", value: "〒0510011", type: "text" as const },
  // TODO: how to place postcode and address?
  { label: "都道府県", value: "北海道", type: "text" as const },
  { label: "市区町村", value: "室蘭市中央町", type: "text" as const },
  { label: "番地など", value: "2-3-1", type: "text" as const },
  {
    label: "建物名・部屋番号等",
    value: "ABアパート301号室",
    type: "text" as const,
  },
  /* {
    label: "住所",
    value: "〒0510011北海道中央町2-3-13 301",
    type: "text" as const,
  }, */
  { label: "電話番号", value: "0510000001", type: "tel" as const },
  {
    label: "メールアドレス",
    value: "tanaka112@mailto.plus",
    type: "email" as const,
  },
] as const;

export const coverageFields = [
  {
    label: "商品名称",
    value: "12疾病保障付災害保障保険",
    type: "text" as const,
  },
  { label: "加入者番号", value: "PL1234567890", type: "text" as const },
  { label: "加入日", value: "2025/05/01", type: "text" as const },
  { label: "責任開始日", value: "2025/06/01", type: "text" as const },
  { label: "保険期間", value: "1年", type: "text" as const },
  { label: "保障期間", value: "3年", type: "text" as const },
  { label: "更新日", value: "毎年10月1日", type: "text" as const },
];

export const premiumFields = [
  { label: "保険料（月払）", value: "1,345円", type: "text" as const },
];

// Read-only fields data
export const readOnlyFields = [
  { label: "氏名（姓）", value: "佐藤", type: "text" as const },
  { label: "氏名（名）", value: "太郎", type: "text" as const },
  { label: "フリガナ（セイ）", value: "サトウ", type: "text" as const },
  { label: "フリガナ（メイ）", value: "タロウ", type: "text" as const },
  { label: "生年月日", value: "1990-05-11", type: "date" as const },
  { label: "性別", value: "男性", type: "text" as const },
  { label: "郵便番号", value: "0510011", type: "text" as const },
  { label: "都道府県", value: "北海道", type: "text" as const },
  { label: "市区町村", value: "室蘭市中央町", type: "text" as const },
  { label: "番地など", value: "2-3-1", type: "text" as const },
  { label: "建物名・部屋番号等", value: "301", type: "text" as const },
  { label: "電話番号", value: "05051000001", type: "tel" as const },
];

// for insured person check their detail insurance information

export const checkApplication = {
  applicant: [
    {
      label: "氏名",
      value: "佐藤太郎",
      type: "text" as const,
    },

    {
      label: "生年月日",
      value: convertDateFormat("1990/05/11"),
      type: "date" as const,
    },
    {
      label: "性別",
      value: "男性",
      type: "text" as const,
    },
    {
      label: "住所",
      value: "〒0510011北海道中央町2-3-13 301",
      type: "text" as const,
    },
    { label: "電話番号", value: "05051000001", type: "tel" as const },
    {
      label: "メールアドレス",
      value: "tanaka112@mailto.plus",
      type: "email" as const,
    },
  ],

  insured: [
    {
      label: "氏名",
      value: "佐藤太郎",
      type: "text" as const,
    },
    {
      label: "生年月日",
      value: convertDateFormat("1990/05/11"),
      type: "date" as const,
    },
    {
      label: "性別",
      value: "男性",
      type: "text" as const,
    },
    {
      label: "住所",
      value: "北海道室蘭市中央町2-3-1",
      type: "text" as const,
    },
    {
      label: "電話番号",
      value: "0510000001",
      type: "tel" as const,
    },
    {
      label: "メールアドレス",
      value: "tanaka112@mailto.plus",
      type: "email" as const,
    },
  ],

  beneficiary: [
    {
      label: "氏名",
      value: "佐藤太郎",
      type: "text" as const,
    },
    {
      label: "フリガナ",
      value: "サトウタロウ",
    },
    {
      label: "生年月日",
      value: convertDateFormat("1990/05/11"),
      type: "date" as const,
    },
    {
      label: "続柄（被保険者から見た死亡保険金受取人の続柄）",
      value: "本人",
      type: "text" as const,
    },
  ],

  content: [
    {
      label: "商品名称",
      value: "12疾病保障付災害保障保険",
      type: "text" as const,
    },
    {
      label: "保険期間",
      value: "1年",
      type: "text" as const,
    },
  ],
};

  export const checkConfirmationApplication = {
    insured: [
     
    ],
  };