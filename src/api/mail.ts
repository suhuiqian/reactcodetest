import { apiClient, tokenManager } from "./client";
import { type EmailSendData, type MailFormData } from "@/schemas/auth";
import { PRODUCTION_API_ENDPOINTS } from "@/constants/APIEndpoints";

// writing true implemention here is ok
// cause in development, we can catch the request and return the mock data
// by MSW

interface EmailResponse {
  message: string;
  token?: string;
  emailId?: string;
}

export const mailApi = {
  // Send general emails
  sendEmail: async (emailData: EmailSendData): Promise<EmailResponse> => {
    const response = await apiClient.post(
      PRODUCTION_API_ENDPOINTS.SEND_MAIL,
      emailData
    );

    // Save token if provided (for authentication emails)
    if (response.data.token) {
      tokenManager.setToken(response.data.token);
    }

    return response.data;
  },

  // Send verification code emails (legacy support)
  sendVerificationCode: async (
    mailData: MailFormData
  ): Promise<EmailResponse> => {
    const response = await apiClient.post(
      PRODUCTION_API_ENDPOINTS.SEND_MAIL_VERIFICATION,
      mailData
    );

    if (response.data.token) {
      tokenManager.setToken(response.data.token);
    }

    return response.data;
  },

  verifyCode: async (mailData: MailFormData): Promise<EmailResponse> => {
    const response = await apiClient.post(
      PRODUCTION_API_ENDPOINTS.VERIFY_CODE,
      mailData
    );

    if (response.data.token) {
      tokenManager.setToken(response.data.token);
    }

    return response.data;
  },
};
