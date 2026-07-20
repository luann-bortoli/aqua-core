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
import { useParams, usePathname } from 'next/navigation'

export default function TreatmentSubGroups() {

    const { groupId } = useParams()
    const currentPath = usePathname()

    useRequireAuth()

    type TreatmentSubGroup = {
        id: string
        name: string
        treatments: string[]
    }

    type TargetTreatmentSubGroup = {
        id: string
        name: string
    }

    type GroupData = {
        id: string
        name: string
        subGroups: string[]
    }

    const [page, setPage] = useState(0)
    const size = 10

    const [pageData, setPageData] = useState<PageResponse<TreatmentSubGroup> | null>(null)

    const [error, setError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState(false)
    const [targetTreatmentSubGroup, setTargetTreatmentSubGroup] = useState<TargetTreatmentSubGroup | null>(null)
    const [groupLoading, setGroupLoading] = useState(false)

    const [loading, setLoading] = useState(false)

    const [groupData, setGroupData] = useState<GroupData>()

    const fetchGroup = async () => {

        setGroupLoading(true)

        const response = await api.get(`/treatment-groups/${groupId}`)

        setGroupData(response.data)
        setGroupLoading(false)
    }

    const fetchTreatmentSubGroups = async (pageNumber: number) => {
        try
        {

            setLoading(true)
            const response = await api.get<PageResponse<TreatmentSubGroup>>(
                `/treatment-sub-groups/group/${groupId}`, {
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

    const deleteTreatmentSubGroup = async (id: string) => {
        try
        {
            await api.delete(`/treatment-sub-groups/${id}`)

            setTargetTreatmentSubGroup(null)

            await fetchTreatmentSubGroups(page)

            setSuccess(true)
        } catch (error)
        {
            setError(normalizeCatchError(error))
        }
    }

    const grabTargetTreatmentSubGroup = (id: string, name: string) => {
        setTargetTreatmentSubGroup({
            id: id,
            name: name
        })
    }

    useEffect(() => {
        fetchTreatmentSubGroups(page)
        fetchGroup()
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
                    message={"Sub-grupo de tratamento deletado."}
                    onClose={() => setSuccess(false)}
                />}

            {targetTreatmentSubGroup &&
                <Confirmation
                    loading={loading}
                    message={`Deseja excluir o sub-grupo de tratamento ${targetTreatmentSubGroup?.name}?`}
                    onConfirm={() => deleteTreatmentSubGroup(targetTreatmentSubGroup?.id)}
                    onCancel={() => setTargetTreatmentSubGroup(null)}
                />}

            <div className={s.mainWrapper}>
                <SectionTitle
                    target='/treatment-groups'
                    title={groupLoading ? 'Carregando' : groupData ? groupData.name : 'Sub-grupos dos tratamentos.'}
                    description='Gerencie os sub-grupos dos tratamentos cadastrados'
                    showCreateButton={true}
                    customPush={`${currentPath}/add`}
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
                        {pageData && pageData.content.map((treatmentSubGroup) => {
                            return (
                                <tr key={treatmentSubGroup.id}>
                                    <td>{treatmentSubGroup.name}</td>
                                    {user?.role == "ROLE_ADMIN" &&
                                        <td>
                                            <Link
                                                href={`treatment-sub-groups/${treatmentSubGroup.id}`}
                                                className={s.action} >
                                                {<SquarePen size={20} />}
                                            </Link>

                                            <button
                                                className={s.action}
                                                onClick={() => grabTargetTreatmentSubGroup(treatmentSubGroup.id, treatmentSubGroup.name)}>
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