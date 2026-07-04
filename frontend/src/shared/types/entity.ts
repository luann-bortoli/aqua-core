export type PageResponse<T> = {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export type LoginResponse = {
    id: string
    name: string
    email: string
    role: 'ROLE_ADMIN' | 'ROLE_COLLABORATOR'
    message: string | null
}

export type UserResponse = {
    name: string
    email: string
    role: 'ROLE_ADMIN' | 'ROLE_COLLABORATOR'
}

export type ResourceStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "DRAFT"

export const ResourceStatusArray: ResourceStatus[] = [
    "ACTIVE"
    , "INACTIVE"
    , "DRAFT"]

export const ResourceStatusLabel = {
    "ACTIVE": "Ativo",
    "INACTIVE": "Inativo",
    "DRAFT": "Rascunho"
}