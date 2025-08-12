import axios from "axios";

// Create axios instance
export const apiClient = axios.create({
  /* baseURL: import.meta.env.VITE_API_URL || "/", */
  baseURL: "/",
  timeout: 10000,
});

// Token management utilities
export const tokenManager = {
  getToken: () => localStorage.getItem("auth_token"),
  setToken: (token: string) => localStorage.setItem("auth_token", token),
  removeToken: () => localStorage.removeItem("auth_token"),
  hasToken: () => !!localStorage.getItem("auth_token"),
};

// Request interceptor - automatically add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      tokenManager.removeToken();
      // Redirect to login or trigger auth refresh
      // TODO: navigate ?
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
