import { apiClient, tokenManager } from "./client";
import { type LoginFormData } from "@/schemas/auth";

export const authApi = {
  login: async (credentials: LoginFormData) => {
    // const response = await apiClient.post("/auth/login", credentials);

    // // Save token after successful login
    // if (response.data.token) {
    //   tokenManager.setToken(response.data.token);
    // }

    // return response.data;
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      // Always remove token, even if logout request fails
      tokenManager.removeToken();
    }
  },

  refreshToken: async () => {
    const response = await apiClient.post("/auth/refresh");
    if (response.data.token) {
      tokenManager.setToken(response.data.token);
    }
    return response.data;
  },
};
