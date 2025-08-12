import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, tokenManager } from "../api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
    // Only fetch if user is authenticated
    enabled: tokenManager.hasToken(),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
