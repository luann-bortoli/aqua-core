type PageResponse<T> = {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

type LoginResponse = {
    id: string
    name: string
    email: string
    role: 'ROLE_ADMIN' | 'ROLE_COLLABORATOR'
    message: string | null
}

type UserResponse = {
    name: string
    email: string
    role: 'ROLE_ADMIN' | 'ROLE_COLLABORATOR'
}