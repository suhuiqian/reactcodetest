import { http, HttpResponse } from "msw";
import { PRODUCTION_API_ENDPOINTS } from "@/constants/APIEndpoints";
console.log("🔐 Loading auth handlers...");

export const authHandlers = [
  // Simple test endpoint to verify MSW is working
  /*  http.get("/test", ({ request }) => {
    console.log("🧪 MSW test endpoint hit!", request.url);
    return HttpResponse.json({ message: "MSW is working!" });
  }), */

  http.post(PRODUCTION_API_ENDPOINTS.LOGIN, async ({ request }) => {
    console.log("🎯 MSW intercepted login request:", request.url);

    try {
      const body = await request.json();
      console.log("📝 Login request body:", body);

      // Simulate validation
      const { userId, password } = body as { userId: string; password: string };

      if (!userId || !password) {
        return HttpResponse.json(
          { error: "Missing credentials" },
          { status: 400 }
        );
      }

      // For demo - accept any credentials
      console.log("✅ MSW returning successful login response");

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            HttpResponse.json({
              token: "mock-jwt-token-12345",
              user: {
                id: 1,
                name: "Test User",
                userId: userId,
              },
              message: "Login successful",
            })
          );
        }, 500);
      });
    } catch (error) {
      console.error("❌ MSW auth handler error:", error);
      return HttpResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }
  }),

  // Catch-all to see what requests are NOT being handled
  /* http.all("*", ({ request }) => {
    console.log(`🔍 MSW catch-all triggered: ${request.method} ${request.url}`);

    if (request.url.includes("auth") || request.url.includes("login")) {
      console.log(
        `🚨 UNHANDLED AUTH REQUEST: ${request.method} ${request.url}`
      );
    }

    // Don't return a response - let it pass through
  }), */
];

/* console.log("✅ Auth handlers created:", authHandlers.length) */
