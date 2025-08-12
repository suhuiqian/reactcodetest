import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, tokenManager } from "../api";
import { type LoginFormData } from "@/schemas/auth";

// TODO:
// Need to write Request/Response schema/type to follow API Docs
// Than transfer to now custom-defined schema/type

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(data),
    onSuccess: () => {
      // After login, you might want to fetch user profile
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear all cached data after logout
      queryClient.clear();
    },
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    isAuthenticated: tokenManager.hasToken(),
  };
};
