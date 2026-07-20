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

export const StatesArray: States[] = [
    "AC", "AL", "AP"
    , "AM", "BA", "CE"
    , "DF", "ES", "GO"
    , "MA", "MT", "MS"
    , "MG", "PA", "PB"
    , "PR", "PE", "PI"
    , "RJ", "RN", "RS"
    , "RO", "RR", "SC"
    , "SP", "SE", "TO"]

export type States =
    | "AC" | "AL" | "AP"
    | "AM" | "BA" | "CE"
    | "DF" | "ES" | "GO"
    | "MA" | "MT" | "MS"
    | "MG" | "PA" | "PB"
    | "PR" | "PE" | "PI"
    | "RJ" | "RN" | "RS"
    | "RO" | "RR" | "SC"
    | "SP" | "SE" | "TO";

export type Address =
    {
        state: States,
        city: string
    }

type Client = {
    id: string
    name: string
    email: string
    address: Address
    phone: string
}

type TargetClient = {
    id: string
    name: string
}

export default function Clients() {

    const user = useCurrentUser()

    useRequireAuth()

    const [page, setPage] = useState(0)
    const size = 10

    const [pageData, setPageData] = useState<PageResponse<Client> | null>(null)

    const [error, setError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState(false)
    const [targetClient, setTargetClient] = useState<TargetClient | null>(null)

    const [loading, setLoading] = useState(false)

    const fetchClients = async (pageNumber: number) => {
        try
        {

            setLoading(true)
            const response = await api.get<PageResponse<Client>>(
                `/clients?page=${pageNumber}&size=${size}`
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

    const deleteClient = async (id: string) => {
        try
        {
            await api.delete(`/clients/${id}`)

            setTargetClient(null)

            await fetchClients(page)

            setSuccess(true)
        } catch (error)
        {
            setError(normalizeCatchError(error))
        }
    }

    const grabTargetClient = (id: string, name: string) => {
        setTargetClient({
            id: id,
            name: name
        })
    }

    useEffect(() => {
        fetchClients(page)
    }, [page])

    return (
        <>
            {error &&
                <GlobalError
                    message={mapApiError(error)}
                    onClose={() => setError(null)}
                />}

            {success &&
                <GlobalSuccess
                    message={"Usuário deletado."}
                    onClose={() => setSuccess(false)}
                />}

            {targetClient &&
                <Confirmation
                    loading={loading}
                    message={`Deseja excluir o usuário ${targetClient?.name}?`}
                    onConfirm={() => deleteClient(targetClient?.id)}
                    onCancel={() => setTargetClient(null)}
                />}

            <div className={s.mainWrapper}>
                <SectionTitle
                    target='/clients'
                    showCreateButton={true}
                />

                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Local</th>
                            <th>Telefone</th>
                            {user?.role == "ROLE_ADMIN" &&
                                <th>Ações</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {pageData && pageData.content.map((client, index) => {
                            return (
                                <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.address.state + " - " + client.address.city}</td>
                                    <td>{client.phone}</td>
                                    {user?.role == "ROLE_ADMIN" &&
                                        <td>
                                            <Link href={`clients/${client.id}`} className={s.action} >{<SquarePen size={20} />}</Link>
                                            <button className={s.action} onClick={() => grabTargetClient(client.id, client.name)}>{<Trash size={20} />}</button>
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