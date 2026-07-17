import { api } from "../lib/api";
import { LoginResponse } from "../types/entity";

export async function getCurrentUser() {
    const { data } = await api.get<LoginResponse>("/auth/me");
    return data;
}