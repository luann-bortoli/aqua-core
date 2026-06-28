import { ApiError } from "../types/error"

export function normalizeCatchError(error: any) {
    return error as ApiError
}