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

export default function Treatment() {

    const { groupId } = useParams()
    const { subGroupId } = useParams()

    useRequireAuth()

    type Treatment = {
        id: string
        name: string
        treatments: string[]
    }

    type TargetTreatment = {
        id: string
        name: string
    }

    type GroupData = {
        id: string
        name: string
        subGroups: string[]
    }

    type SubGroupData = {
        id: string
        name: string
        treatments: string[]
    }

    const [page, setPage] = useState(0)
    const size = 10

    const [pageData, setPageData] = useState<PageResponse<Treatment> | null>(null)

    const [error, setError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState(false)
    const [targetTreatment, setTargetTreatment] = useState<TargetTreatment | null>(null)
    const [groupLoading, setGroupLoading] = useState(false)

    const [loading, setLoading] = useState(false)

    const [groupData, setGroupData] = useState<GroupData>()
    const [subGroupData, setSubGroupData] = useState<SubGroupData>()

    const fetchGroup = async () => {

        setGroupLoading(true)

        const group = await api.get(`/treatment-groups/${groupId}`)
        setGroupData(group.data)

        const subGroup = await api.get(`/treatment-sub-groups/${subGroupId}`)
        setSubGroupData(subGroup.data)

        setGroupLoading(false)
    }

    const fetchTreatments = async (pageNumber: number) => {
        try
        {
            setLoading(true)
            const response = await api.get<PageResponse<Treatment>>(
                `/treatments/${subGroupId}`, {
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

    const deleteTreatment = async (id: string) => {
        try
        {
            await api.delete(`/treatment/${id}`)

            setTargetTreatment(null)

            await fetchTreatments(page)

            setSuccess(true)
        } catch (error)
        {
            setError(normalizeCatchError(error))
        }
    }

    const grabTargetTreatment = (id: string, name: string) => {
        setTargetTreatment({
            id: id,
            name: name
        })
    }

    useEffect(() => {
        fetchTreatments(page)
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
                    message={"Tratamento deletado."}
                    onClose={() => setSuccess(false)}
                />}

            {targetTreatment &&
                <Confirmation
                    loading={loading}
                    message={`Deseja excluir o tratamento ${targetTreatment?.name}?`}
                    onConfirm={() => deleteTreatment(targetTreatment?.id)}
                    onCancel={() => setTargetTreatment(null)}
                />}

            <div className={s.mainWrapper}>
                <SectionTitle
                    target='/treatment-groups'
                    title={groupLoading ? 'Carregando' : groupData && (groupData && subGroupData) ? (groupData.name + " > " + subGroupData.name) : 'Tratamentos.'}
                    description='Gerencie os tratamentos cadastrados'
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
                        {pageData && pageData.content.map((treatment) => {
                            return (
                                <tr key={treatment.id}>
                                    <td>{treatment.name}</td>
                                    {user?.role == "ROLE_ADMIN" &&
                                        <td>
                                            <Link
                                                href={`sub-groups/${treatment.id}`}
                                                className={s.action} >
                                                {<SquarePen size={20} />}
                                            </Link>

                                            <button
                                                className={s.action}
                                                onClick={() => grabTargetTreatment(treatment.id, treatment.name)}>
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