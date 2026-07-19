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
import { PageResponse, ResourceStatus } from '@/src/shared/types/entity'
import StatusCard from '@/src/shared/components/ui/status-card/StatusCard'
import { useCurrentUser } from '@/src/shared/hooks/useCurrentUser'

const API_URL = process.env.NEXT_PUBLIC_API_URL


type Notification = {
    id: string
    title: string,
    description: string
}

type TargetNotification = {
    id: string
    name: string
}

export default function Notifications() {

    useRequireAuth()

    const [page, setPage] = useState(0)
    const size = 10

    const [pageData, setPageData] = useState<PageResponse<Notification> | null>(null)

    const [error, setError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState(false)
    const [targetNotification, setTargetNotification] = useState<TargetNotification | null>(null)

    const [loading, setLoading] = useState(false)

    const fetchNotifications = async (pageNumber: number) => {
        try
        {

            setLoading(true)
            const response = await api.get<PageResponse<Notification>>(
                '/notifications', {
                params: { pageNumber: page, size: size }
            })

            setPageData(response.data)

        } catch (error)
        {
            setError(normalizeCatchError(error))
        } finally
        {
            setLoading(false)
        }
    }

    const deleteNotification = async (id: string) => {
        try
        {
            console.log(id)
            await api.delete(`/notifications/${id}`)

            setTargetNotification(null)

            await fetchNotifications(page)

            setSuccess(true)
        } catch (error)
        {
            setError(normalizeCatchError(error))
        }
    }

    const grabTargetNotification = (id: string, name: string) => {
        setTargetNotification({
            id: id,
            name: name
        })
    }

    useEffect(() => {
        fetchNotifications(page)
    }, [page])

    const user = useCurrentUser()

    return (
        <>
            {error &&
                <GlobalError
                    message={mapApiError(error)}
                    onClose={() => setError(null)}
                />}

            {success &&
                <GlobalSuccess
                    message={"Notificação deletada."}
                    onClose={() => setSuccess(false)}
                />}

            {targetNotification &&
                <Confirmation
                    loading={loading}
                    message={`Deseja excluir a notificação ${targetNotification?.name}?`}
                    onConfirm={() => deleteNotification(targetNotification?.id)}
                    onCancel={() => setTargetNotification(null)}
                />}

            <div className={s.mainWrapper}>
                <SectionTitle target='/notifications' />

                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            {user?.role == "ROLE_ADMIN" &&
                                <th>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {pageData && pageData.content.map((notification, index) => {
                            return (
                                <tr key={notification.id}>
                                    <td>{notification.title}</td>
                                    <td>{notification.description}</td>
                                    {user?.role == "ROLE_ADMIN" &&
                                        <td>
                                            <Link href={`notifications/${notification.id}`} className={s.action} >{<SquarePen size={20} />}</Link>
                                            <button className={s.action} onClick={() => grabTargetNotification(notification.id, notification.title)}>{<Trash size={20} />}</button>
                                        </td>}
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