import { z } from "zod";
import {
  isValidKatakana,
  isValidPhoneNumber,
  isValidPostalCode,
  isValidEmail,
  hasFullWidthInPhone,
  hasFullWidthInPostal,
  hasFullWidthInEmail,
} from "@/utils/japaneseTextUtils";
import { validRelationshipOptions } from "@/constants/selectOptions";

export const userSchema = z.object({
  lastName: z.string().min(1, "姓を入力してください"),
  firstName: z.string().min(1, "名を入力してください"),
  lastNameKana: z
    .string()
    .min(1, "セイを入力してください")
    .refine(isValidKatakana, "カタカナで入力してください"),
  firstNameKana: z
    .string()
    .min(1, "メイを入力してください")
    .refine(isValidKatakana, "カタカナで入力してください"),
  gender: z.enum(["男性", "女性"], {
    required_error: "性別を選択してください",
  }),
  birthDate: z
    .string()
    .length(10, "生年月日を入力してください")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DDの形式で入力してください")
    .refine((val) => {
      const date = new Date(val);
      return date.getFullYear() >= 1925 && date.getFullYear() <= 2025;
    }, "1925年1月1日以降の日付を入力してください"),
  /* YYYY-MM-DD*/
  /*  .number()
    .int("整数で入力してください")
    .min(19000101, "1960年1月1日以降の日付を入力してください")
    .max(20251231, "2025年12月31日以前の日付を入力してください"), */
  // TODO: hardcoded date
  /* birthDate: z
    .string()
    .length(8, "生年月日を入力してください")
    .regex(/^\d{8}$/, "8桁の数字で入力してください"), */
  phoneNumber: z
    .string()
    .min(1, "電話番号を入力してください")
    .refine((val) => !hasFullWidthInPhone(val), "半角数字で入力してください")
    .refine(isValidPhoneNumber, "10桁または11桁の数字で入力してください"),
  email: z
    .string()
    // TODO: .email ?
    .min(1, "メールアドレスを入力してください")
    .refine((val) => !hasFullWidthInEmail(val), "半角英数字で入力してください")
    .refine(isValidEmail, "正しいメールアドレスを入力してください"),
});

// TODO:
// hasHalfWidthIn prefecture, city, address, building?
// but this is auto returned from backend?
// while users can manually update/input them?
// and for building field, it is subject to be written by users

export const addressSchema = z.object({
  postalCode: z
    .string()
    .min(1, "郵便番号を入力してください")
    .refine((val) => !hasFullWidthInPostal(val), "半角数字で入力してください")
    .refine(isValidPostalCode, "7桁の数字で入力してください"),
  prefecture: z.string().min(1, "都道府県を入力してください"),
  city: z.string().min(1, "市区町村を入力してください"),
  address: z.string().optional(),
  building: z.string().optional(),
});

export const relationshipSchema = z.enum(
  validRelationshipOptions as [string, ...string[]],
  {
    errorMap: () => ({ message: "有効な関係を選択してください" }),
  }
);

// Zod schema for insured person form validation
export const insuredFormSchema = userSchema.merge(addressSchema).merge(
  // TODO: good here or not?
  z.object({
    relationship: relationshipSchema,
  })
);

// TODO:
// compare string? 19000101 -> 20101231 ?
// format YYYYMMDD ?
// or seperated them?
// .min(1, "生年月日を入力してください")

export const beneficiaryFormSchema = insuredFormSchema.omit({
  gender: true,
  phoneNumber: true,
  email: true,
});

// Zod schema for beneficiary form validation
/* export const beneficiaryFormSchema = insuredFormSchema.extend({
  birthDate: z
    .string()
    .length(10, "生年月日を入力してください")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DDの形式で入力してください")
    .refine((val) => {
      const date = new Date(val);
      return date.getFullYear() >= 1925 && date.getFullYear() <= 2025;
    }, "1925年1月1日以降の日付を入力してください"), */
/*  birthDate: z.number().int("整数で入力してください"), */

/* 
    TODO: backend validation prefered?
    disable client side validation now
    
    .min(19600101, "1960年1月1日以降の日付を入力してください")
    .max(20101231, "2010年12月31日以前の日付を入力してください"), */
/* .string()
    .length(8, "生年月日を入力してください")
    .regex(/^\d{8}$/, "8桁の数字で入力してください")
    .min("19600101", "受取者は65歳以下である必要があります")
    .max("20101231", "受取者は15歳以上である必要があります"), */
/* .refine((date) => {
      // use lexigraphic order rather than date/numbers
      // REFACTOR: hardcoded date
      const minDate = "19600101"; // 100 years ago
      const maxDate = "20101231"; // 18 years ago (adjust as needed)
      return date >= minDate && date <= maxDate;
    }, "受取者の年齢は15歳以上65歳以下である必要があります"), */
/* }); */

// Combined schema for the entire pair
export const insuredBeneficiaryPairSchema = z
  .object({
    insured: insuredFormSchema,
    beneficiary: beneficiaryFormSchema,
    // Shared radio button states
    isInsuredSameAsApplicant: z.boolean(),
    isBeneficiarySameAsApplicant: z.boolean(),
  })
  .refine(
    (data) => {
      // Business rule: Cannot have both insured and beneficiary same as applicant
      return !(
        data.isInsuredSameAsApplicant && data.isBeneficiarySameAsApplicant
      );
    },
    {
      message:
        "契約者と被保険者が同じ場合、受取人は契約者と異なる必要があります",
      path: ["isBeneficiarySameAsApplicant"],
    }
  );
// TODO: check how many new applications insured person can be the same person
// as applicant
/*  .refine(
    (data) => {
      // Business logic: insured and beneficiary cannot be the same person
      return !(
        data.insured.lastName === data.beneficiary.lastName &&
        data.insured.firstName === data.beneficiary.firstName &&
        data.insured.birthDate === data.beneficiary.birthDate
      );
    },
    {
      message: "被保険者と受取人は同じ人物にできません",
      path: ["beneficiary"],
    }
  ); */

export type InsuredBeneficiaryPairFormData = z.infer<
  typeof insuredBeneficiaryPairSchema
>;
