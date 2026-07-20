'use client'

import { useRequireAuth } from '@/src/shared/hooks/useRequireAuth'
import s from './page.module.css'
import SectionTitle from '@/src/shared/components/layout/SectionTitle/SectionTitle'
import { useEffect, useState } from 'react'
import { api } from '@/src/shared/lib/api'
import { ChevronLeft, ChevronRight, SquarePen, Trash } from 'lucide-react'
import { ApiError } from '@/src/shared/types/error'
import GlobalError from '@/src/shared/components/feedback/global-error/GlobalError'
import { mapApiError } from '@/src/shared/lib/mapApiError'
import { normalizeCatchError } from '@/src/shared/utils/mapper'
import GlobalSuccess from '@/src/shared/components/feedback/global-succes/GlobalSuccess'
import Confirmation from '@/src/shared/components/feedback/confirmation/Confirmation'
import Link from 'next/link'
import { PageResponse } from '@/src/shared/types/entity'

type User = {
    id: string
    name: string
    role: 'ROLE_ADMIN' | 'ROLE_COLLABORATOR'
    email: string
}

type TargetUser = {
    id: string
    name: string
}

export default function Users() {

    useRequireAuth()

    const [page, setPage] = useState(0)
    const size = 10

    const [pageData, setPageData] = useState<PageResponse<User> | null>(null)

    const [error, setError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState(false)
    const [targetUser, setTargetUser] = useState<TargetUser | null>(null)

    const [loading, setLoading] = useState(false)

    const fetchUsers = async (pageNumber: number) => {
        try
        {

            setLoading(true)
            const response = await api.get<PageResponse<User>>(
                `/users?page=${pageNumber}&size=${size}`
            )
            setPageData(response.data)

        } catch (error)
        {
            setError(normalizeCatchError(error))
        } finally
        {
            setLoading(false)
        }
    }

    const deleteUser = async (id: string) => {
        try
        {
            await api.delete(`/users/${id}`)

            setTargetUser(null)

            await fetchUsers(page)

            setSuccess(true)
        } catch (error)
        {
            setError(normalizeCatchError(error))
        }
    }

    const grabTargetUser = (id: string, name: string) => {
        setTargetUser({
            id: id,
            name: name
        })
    }

    useEffect(() => {
        fetchUsers(page)
    }, [page])

    return (
        <>
            {error && <GlobalError message={mapApiError(error)} onClose={() => setError(null)} />}
            {success && <GlobalSuccess message={"Usuário deletado."} onClose={() => setSuccess(false)} />}
            {targetUser && <Confirmation loading={loading} message={`Deseja excluir o usuário ${targetUser?.name}?`} onConfirm={() => deleteUser(targetUser?.id)} onCancel={() => setTargetUser(null)} />}

            <div className={s.mainWrapper}>
                <SectionTitle
                    target='/users'
                    showCreateButton={true}
                />

                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Perfil</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageData && pageData.content.map((user, index) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role == "ROLE_ADMIN" ? "Administrador" : "Colaborador"}</td>
                                    <td>
                                        <Link href={`users/${user.id}`} className={s.action} >{<SquarePen size={20} />}</Link>
                                        <button className={s.action} onClick={() => grabTargetUser(user.id, user.name)}>{<Trash size={20} />}</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className={s.pagination}>
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        <ChevronLeft />
                    </button>

                    <span>
                        Página {page + 1} de {pageData?.totalPages ?? 1}
                    </span>

                    <button
                        disabled={pageData ? page + 1 >= pageData.totalPages : true}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </>
    )
}