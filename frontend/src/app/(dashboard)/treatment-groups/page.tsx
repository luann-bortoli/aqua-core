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
import { useCurrentUser } from '@/src/shared/hooks/useCurrentUser'

export default function TreatmentGroup() {

    useRequireAuth()

    type TreatmentGroup = {
        id: string
        name: string
        subGroups: string[]
    }

    type TargetTreatmentGroup = {
        id: string
        name: string
    }

    const [page, setPage] = useState(0)
    const size = 10

    const [pageData, setPageData] = useState<PageResponse<TreatmentGroup> | null>(null)

    const [error, setError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState(false)
    const [targetTreatmentGroup, setTargetTreatmentGroup] = useState<TargetTreatmentGroup | null>(null)

    const [loading, setLoading] = useState(false)

    const fetchTreatmentGroups = async (pageNumber: number) => {
        try
        {

            setLoading(true)
            const response = await api.get<PageResponse<TreatmentGroup>>(
                '/treatment-groups', {
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

    const deleteTreatmentGroup = async (id: string) => {
        try
        {
            await api.delete(`/treatment-groups/${id}`)

            setTargetTreatmentGroup(null)

            await fetchTreatmentGroups(page)

            setSuccess(true)
        } catch (error)
        {
            setError(normalizeCatchError(error))
        }
    }

    const grabTargetTreatmentGroup = (id: string, name: string) => {
        setTargetTreatmentGroup({
            id: id,
            name: name
        })
    }

    useEffect(() => {
        fetchTreatmentGroups(page)
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
                    message={"Grupo de tratamento deletado."}
                    onClose={() => setSuccess(false)}
                />}

            {targetTreatmentGroup &&
                <Confirmation
                    loading={loading}
                    message={`Deseja excluir o grupo de tratamento ${targetTreatmentGroup?.name}?`}
                    onConfirm={() => deleteTreatmentGroup(targetTreatmentGroup?.id)}
                    onCancel={() => setTargetTreatmentGroup(null)}
                />}

            <div className={s.mainWrapper}>
                <SectionTitle
                    target='/treatment-groups'
                    title='Grupo dos tratamentos'
                    description='Gerencie os grupos dos tratamentos cadastrados.'
                    showCreateButton={true}
                />

                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            {user?.role == "ROLE_ADMIN" &&
                                <th>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {pageData && pageData.content.map((treatmentGroup) => {
                            return (
                                <tr key={treatmentGroup.id}>
                                    <td>
                                        <Link href={`treatment-groups/${treatmentGroup.id}/sub-groups`}>
                                            {treatmentGroup.name}
                                        </Link>
                                    </td>

                                    {user?.role == "ROLE_ADMIN" &&
                                        <td>
                                            <Link
                                                href={`treatment-groups/${treatmentGroup.id}`}
                                                className={s.action} >
                                                {<SquarePen size={20} />}
                                            </Link>

                                            <button
                                                className={s.action}
                                                onClick={() => grabTargetTreatmentGroup(treatmentGroup.id, treatmentGroup.name)}>
                                                {<Trash size={20} />}
                                            </button>
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