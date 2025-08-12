import { http, HttpResponse } from "msw";
import { PRODUCTION_API_ENDPOINTS } from "@/constants/APIEndpoints";

export const mailHandlers = [
  // General email sending
  http.post(PRODUCTION_API_ENDPOINTS.SEND_MAIL, async ({ request }) => {
    console.log("🎯 MSW intercepted send email request:", request.url);

    const emailData = await request.json();
    console.log("📧 Email data:", emailData);

    // Simulate some processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json({
      message: "Email sent successfully",
      emailId: `email_${Date.now()}`,
    });
  }),

  // Verification code sending (legacy support)
  http.post(
    PRODUCTION_API_ENDPOINTS.SEND_MAIL_VERIFICATION,
    async ({ request }) => {
      console.log(
        "🎯 MSW intercepted verification email request:",
        request.url
      );

      const verificationData = await request.json();
      console.log("🔐 Verification data:", verificationData);

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return HttpResponse.json({
        message: "Verification code sent successfully",
        emailId: `verify_${Date.now()}`,
      });
    }
  ),

  http.post(PRODUCTION_API_ENDPOINTS.VERIFY_CODE, async ({ request }) => {
    console.log("🎯 MSW intercepted verify code request:", request.url);

    const verifyData = await request.json();
    console.log("🔐 Verify data:", verifyData);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json({
      message: "Verification code verified successfully",
      emailId: `verify_${Date.now()}`,
    });
  }),
];
