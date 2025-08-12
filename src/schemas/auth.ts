import { z } from "zod";

// ============================================================================
// VALIDATION PATTERNS & ERROR MESSAGES
// ============================================================================

// Password validation patterns
const PASSWORD_PATTERNS = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  DIGIT: /[0-9]/,
  SPECIAL: /[@$!%*#?&^+=/]/,
} as const;

export const VIBISLE_BASIC_ERROR_MESSAGES = {
  ACCOUNT_ID: {
    LENGTH: "アカウントIDは、8～16文字で設定してください。",
    PATTERN: "英大文字・英小文字・数字それぞれを最低1文字ずつ含む。",
  },
  PASSWORD: {
    LENGTH: "パスワードは8～12文字で設定してください。",
    PATTERN: "半角英小文字・大文字・数字それぞれを最低1文字ずつ含む。",
  },
};
// Error messages
export const ERROR_MESSAGES = {
  ACCOUNT_ID: {
    REQUIRED: "ユーザーIDを入力してください。",
    LENGTH:
      "ユーザーIDの文字数が正しくありません。文字数は8～16文字で設定してください。",
    PATTERN:
      "ユーザーIDは、英大文字・英小文字・数字を１文字ずつ使用してください。",
  },
  PASSWORD: {
    REQUIRED: "パスワードを入力してください。",
    LENGTH:
      "パスワードの文字数が正しくありません。文字数は8～12文字で設定してください。",
    PATTERN:
      "パスワードは、英大文字・英小文字・数字を１文字ずつ使用してください。",
    MISMATCH:
      "パスワードと確認用パスワードが一致しません。",
    NEW_MISMATCH: "新しいパスワードと確認パスワードが一致しません。",
  },
  EMAIL: {
    INVALID: "有効なメールアドレスを入力してください。",
  },
} as const;

// ============================================================================
// BASE SCHEMAS
// ============================================================================

// Basic account ID validation
const accountIdSchema = z
  .string()
  .min(1, ERROR_MESSAGES.ACCOUNT_ID.REQUIRED) 
  .min(8, ERROR_MESSAGES.ACCOUNT_ID.LENGTH)
  .max(16, ERROR_MESSAGES.ACCOUNT_ID.LENGTH)
  .regex(PASSWORD_PATTERNS.UPPERCASE, ERROR_MESSAGES.ACCOUNT_ID.PATTERN)
  .regex(PASSWORD_PATTERNS.LOWERCASE, ERROR_MESSAGES.ACCOUNT_ID.PATTERN)
  .regex(PASSWORD_PATTERNS.DIGIT, ERROR_MESSAGES.ACCOUNT_ID.PATTERN);

const simpleAccountIdSchema = z
  .string()
  .min(1, ERROR_MESSAGES.ACCOUNT_ID.REQUIRED);

// Basic password validation (for registration and password changes)
// TODO: add HANKAKU/ZENGAKU?
// !FIX: WHY TWO MIN HERE?
const strongPasswordSchema = z
  .string()
  .min(1, ERROR_MESSAGES.PASSWORD.REQUIRED)
  .min(8, ERROR_MESSAGES.PASSWORD.LENGTH)
  .max(12, ERROR_MESSAGES.PASSWORD.LENGTH)
  .regex(PASSWORD_PATTERNS.UPPERCASE, ERROR_MESSAGES.PASSWORD.PATTERN)
  .regex(PASSWORD_PATTERNS.LOWERCASE, ERROR_MESSAGES.PASSWORD.PATTERN)
  .regex(PASSWORD_PATTERNS.DIGIT, ERROR_MESSAGES.PASSWORD.PATTERN);
/*  .regex(PASSWORD_PATTERNS.SPECIAL, ERROR_MESSAGES.PASSWORD.PATTERN); */

// Simple password validation (for login)
const simplePasswordSchema = z
  .string()
  .min(1, ERROR_MESSAGES.PASSWORD.REQUIRED);

// ============================================================================
// COMPOSED SCHEMAS
// ============================================================================

// Login schema (basic accountId + password)
export const loginFormSchema = z.object({
  userId: accountIdSchema,
  password: strongPasswordSchema,
});

// Registration schema (login + rePassword validation)
// request strong password schema?
export const accountFormSchema = z
  .object({
    userId: accountIdSchema,
    password: strongPasswordSchema,
    rePassword: strongPasswordSchema,
    // TODO: add verifyCode schema (by backend team?)
    verifyCode: z.string().min(1, "認証コードを入力してください。"),
    email: z.string().email(ERROR_MESSAGES.EMAIL.INVALID),
  })
  .refine((data) => data.password === data.rePassword, {
    message: ERROR_MESSAGES.PASSWORD.MISMATCH,
    path: ["rePassword"],
  });

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  userId: accountIdSchema,
  email: z.string().email(ERROR_MESSAGES.EMAIL.INVALID),
});

// Mail form schema for sending verification codes
export const mailFormSchema = z.object({
  verifyCode: z.string().min(1, "認証コードを入力してください。"),
  email: z.string().email(ERROR_MESSAGES.EMAIL.INVALID),
});

// General email sending schema
export const emailSendSchema = z.object({
  to: z.string().email("有効なメールアドレスを入力してください。"),
  subject: z.string().min(1, "件名を入力してください。"),
  content: z.string().min(1, "本文を入力してください。"),
  from: z.string().email("有効なメールアドレスを入力してください。").optional(),
  type: z.enum(["verification", "notification", "support"]).optional(),
});

// ============================================================================
// TWO-STEP PASSWORD UPDATE SCHEMAS
// ============================================================================

// Step 1: Verify current password only (user is already authenticated)
export const passwordUpdateVerificationSchema = z.object({
  currentPassword: simplePasswordSchema,
});

// Step 2: Set new password
export const passwordUpdateNewPasswordSchema = z
  .object({
    newPassword: strongPasswordSchema,
    confirmNewPassword: strongPasswordSchema, //z.string(), // z.string or the same strongPasswordSchema?
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: ERROR_MESSAGES.PASSWORD.NEW_MISMATCH,
    path: ["confirmNewPassword"],
  });

// Combined password update schema (if you want to keep the old approach)
export const passwordChangeSchema = loginFormSchema
  .extend({
    newPassword: strongPasswordSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: ERROR_MESSAGES.PASSWORD.NEW_MISMATCH,
    path: ["newPassword"],
  });

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type MailFormData = z.infer<typeof mailFormSchema>;
export type EmailSendData = z.infer<typeof emailSendSchema>;
export type AccountFormData = z.infer<typeof accountFormSchema>;
export type PasswordResetRequestData = z.infer<
  typeof passwordResetRequestSchema
>;

// PASSWORD-RESET in forget-password workflow can also use this schema/type

export type PasswordUpdateVerificationData = z.infer<
  typeof passwordUpdateVerificationSchema
>;

export type PasswordUpdateNewPasswordData = z.infer<
  typeof passwordUpdateNewPasswordSchema
>;

export type PasswordChangeData = z.infer<typeof passwordChangeSchema>;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Helper to validate password strength
export const validatePasswordStrength = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) errors.push(ERROR_MESSAGES.PASSWORD.LENGTH);
  if (!PASSWORD_PATTERNS.UPPERCASE.test(password))
    errors.push(ERROR_MESSAGES.PASSWORD.PATTERN);
  if (!PASSWORD_PATTERNS.LOWERCASE.test(password))
    errors.push(ERROR_MESSAGES.PASSWORD.PATTERN);
  if (!PASSWORD_PATTERNS.DIGIT.test(password))
    errors.push(ERROR_MESSAGES.PASSWORD.PATTERN);
  if (!PASSWORD_PATTERNS.SPECIAL.test(password))
    errors.push(ERROR_MESSAGES.PASSWORD.PATTERN);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const forgotPasswordSchema = z.object({
  userId: accountIdSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
