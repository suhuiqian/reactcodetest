// Insurance application schemas
export {
  userSchema,
  addressSchema,
  relationshipSchema,
  insuredFormSchema,
  beneficiaryFormSchema,
  insuredBeneficiaryPairSchema,
  type InsuredBeneficiaryPairFormData,
} from "./forms";

// Authentication schemas
export {
  accountFormSchema,
  loginFormSchema,
  mailFormSchema,
  emailSendSchema,
  passwordResetRequestSchema,
  passwordChangeSchema,
  passwordUpdateVerificationSchema,
  passwordUpdateNewPasswordSchema,
  type AccountFormData,
  type LoginFormData,
  type MailFormData,
  type EmailSendData,
  type PasswordResetRequestData,
  type PasswordChangeData,
  type PasswordUpdateVerificationData,
  type PasswordUpdateNewPasswordData,
  validatePasswordStrength,
} from "./auth";
