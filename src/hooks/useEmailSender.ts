import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mailApi } from "@/api/mail";
import { type EmailSendData, type MailFormData } from "@/schemas/auth";
import { useNavigate } from "react-router-dom";
interface UseEmailOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for email sending functionality
 *
 * @example
 * const { sendEmail, isSending, error } = useEmailSender({
 *   onSuccess: () => console.log('Email sent!'),
 *   onError: (error) => console.error('Failed:', error)
 * });
 *
 * // Send email
 * sendEmail({
 *   to: "user@example.com",
 *   subject: "Welcome!",
 *   content: "Thank you for signing up",
 *   type: "notification"
 * });
 */
export const useEmailSender = (options?: UseEmailOptions) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const emailMutation = useMutation({
    mutationFn: (emailData: EmailSendData) => mailApi.sendEmail(emailData),
    onSuccess: (data) => {
      // Invalidate any email-related queries if needed
      queryClient.invalidateQueries({ queryKey: ["emails"] });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error("Email sending failed:", error);
      options?.onError?.(error);
    },
  });

  const verificationMutation = useMutation({
    mutationFn: (mailData: MailFormData) =>
      mailApi.sendVerificationCode(mailData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["verification"] });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error("Verification email failed:", error);
      options?.onError?.(error);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: (mailData: MailFormData) => mailApi.verifyCode(mailData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["verification"] });
      options?.onSuccess?.(data);
      navigate("/applications");
    },
    onError: (error: Error) => {
      console.error("Verification code failed:", error);
      options?.onError?.(error);
    },
  });

  return {
    // General email sending
    sendEmail: emailMutation.mutate,
    sendEmailAsync: emailMutation.mutateAsync,
    isSending: emailMutation.isPending,
    emailError: emailMutation.error,

    // Verification code sending
    sendVerificationCode: verificationMutation.mutate,
    sendVerificationAsync: verificationMutation.mutateAsync,
    isSendingVerification: verificationMutation.isPending,
    verificationError: verificationMutation.error,

    // Verification code verification
    verifyCode: verifyCodeMutation.mutate,
    verifyCodeAsync: verifyCodeMutation.mutateAsync,
    isVerifyingCode: verifyCodeMutation.isPending,
    verifyCodeError: verifyCodeMutation.error,

    // Combined states
    isAnyPending: emailMutation.isPending || verificationMutation.isPending,
    lastError: emailMutation.error || verificationMutation.error,
  };
};

/**
 * Simple email sender hook for basic use cases
 *
 * @example
 * const sendEmail = useSimpleEmailSender();
 *
 * const handleSend = async () => {
 *   try {
 *     await sendEmail({
 *       to: "user@example.com",
 *       subject: "Hello",
 *       content: "World!"
 *     });
 *     console.log('Sent successfully!');
 *   } catch (error) {
 *     console.error('Failed to send:', error);
 *   }
 * };
 */
export const useSimpleEmailSender = () => {
  const { sendEmailAsync } = useEmailSender();
  return sendEmailAsync;
};
