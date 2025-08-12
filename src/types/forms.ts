import { z } from "zod";
import { beneficiaryFormSchema, insuredFormSchema } from "@/schemas/forms";
import {
  accountFormSchema,
  loginFormSchema,
  passwordResetRequestSchema,
  passwordChangeSchema,
  passwordUpdateVerificationSchema,
  passwordUpdateNewPasswordSchema,
} from "@/schemas/auth";

// Form data types
// TODO:
// I do not need both BeneficiaryFormData and InsuredFormData.
// they are the same type
export type BeneficiaryFormData = z.infer<typeof beneficiaryFormSchema>;
export type InsuredFormData = z.infer<typeof insuredFormSchema>;
export type AccountFormData = z.infer<typeof accountFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type PasswordResetRequestData = z.infer<
  typeof passwordResetRequestSchema
>;
export type PasswordChangeData = z.infer<typeof passwordChangeSchema>;
export type PasswordUpdateVerificationData = z.infer<
  typeof passwordUpdateVerificationSchema
>;
export type PasswordUpdateNewPasswordData = z.infer<
  typeof passwordUpdateNewPasswordSchema
>;

// Unified type for insured-beneficiary pairs
// ! FIX:
// DB/BACKEND may not return these fields
// isInsuredSameAsApplicant and isBeneficiarySameAsApplicant
export interface InsuredBeneficiaryPairData {
  id: string;
  insured: InsuredFormData;
  isInsuredSameAsApplicant?: boolean;
  beneficiary: BeneficiaryFormData;
  isBeneficiarySameAsApplicant?: boolean;
  createdAt: string;
  updatedAt: string;
  status: "temp" | "draft" | "notified" | "submitted" | "approved" | "rejected";
  premium?: number;
  //Property 1: 告知済?
}

// Form field interface
export interface FormField {
  label: string;
  value: string;
  type?: "text" | "email" | "tel" | "date";
  required?: boolean;
  disabled?: boolean;
}

// Form card props
export interface FormCardProps {
  title: string;
  fields: FormField[];
}

// Form card component props
export interface InsuredFormCardProps {
  isReadOnly?: boolean;
  initialData?: InsuredFormData;
  isSameAsApplicant: boolean;
  onSameAsApplicantChange: (value: boolean) => void;
  disableSameAsApplicant?: boolean;
}

export interface BeneficiaryFormCardProps {
  isReadOnly?: boolean;
  initialData?: BeneficiaryFormData;
  isSameAsApplicant: boolean;
  onSameAsApplicantChange: (value: boolean) => void;
  disableSameAsApplicant?: boolean;
}

export const RELATIONSHIP_OPTIONS = [
  "本人",
  "配偶者",
  "父母",
  "子",
  "兄弟姉妹",
  "祖父母",
  "孫",
  "叔父叔母",
  "甥姪",
];

export type RelationshipType = (typeof RELATIONSHIP_OPTIONS)[number];
