import { api } from "../lib/api";
import { LoginSchema } from "../schema/login/schema";

export function login(data: LoginSchema) {
    return api.post("/auth/login", data);
}

export function logout() {
    return api.post("/auth/logout");
}