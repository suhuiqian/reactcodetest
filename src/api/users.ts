import { apiClient } from "./client";

export const usersApi = {
  getUsers: () => apiClient.get("/users").then((res) => res.data),
  getUser: (id: string) =>
    apiClient.get(`/users/${id}`).then((res) => res.data),
  createUser: (userData: any) =>
    apiClient.post("/users", userData).then((res) => res.data),
  updateUser: ({ id, ...data }: any) =>
    apiClient.put(`/users/${id}`, data).then((res) => res.data),
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
};
