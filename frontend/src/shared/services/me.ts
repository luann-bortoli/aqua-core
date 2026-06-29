import { api } from "../lib/api";

export async function getCurrentUser() {
    const { data } = await api.get<LoginResponse>("/auth/me");
    return data;
}