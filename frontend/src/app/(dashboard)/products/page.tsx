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


type Product = {
    id: string
    title: string,
    status: ResourceStatus
    image: string
}

type TargetProduct = {
    id: string
    name: string
}

export default function Products() {

    useRequireAuth()

    const [page, setPage] = useState(0)
    const size = 10

    const [pageData, setPageData] = useState<PageResponse<Product> | null>(null)

    const [error, setError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState(false)
    const [targetProduct, setTargetProduct] = useState<TargetProduct | null>(null)

    const [loading, setLoading] = useState(false)

    const fetchProducts = async (pageNumber: number) => {
        try
        {

            setLoading(true)
            const response = await api.get<PageResponse<Product>>(
                '/products', {
                params: {
                    pageNumber: page, size: size
                }
            }
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

    const deleteProduct = async (id: string) => {
        try
        {
            await api.delete(`/products/${id}`)

            setTargetProduct(null)

            await fetchProducts(page)

            setSuccess(true)
        } catch (error)
        {
            setError(normalizeCatchError(error))
        }
    }

    const grabTargetProduct = (id: string, name: string) => {
        setTargetProduct({
            id: id,
            name: name
        })
    }

    useEffect(() => {
        fetchProducts(page)
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
                    message={"Produto deletado."}
                    onClose={() => setSuccess(false)}
                />}

            {targetProduct &&
                <Confirmation
                    loading={loading}
                    message={`Deseja excluir o produto ${targetProduct?.name}?`}
                    onConfirm={() => deleteProduct(targetProduct?.id)}
                    onCancel={() => setTargetProduct(null)}
                />}

            <div className={s.mainWrapper}>
                <SectionTitle
                    target='/products'
                    showCreateButton={true}
                />

                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Status</th>
                            {user?.role == "ROLE_ADMIN" &&
                                <th>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {pageData && pageData.content.map((product, index) => {
                            return (
                                <tr key={product.id}>
                                    <td>
                                        <div style={{ backgroundImage: `url(${API_URL}/${product.image})` }} className={s.imageContainer}>
                                        </div>
                                    </td>
                                    <td>{product.title}</td>
                                    <td><StatusCard status={product.status} /></td>
                                    {user?.role == "ROLE_ADMIN" &&
                                        <td>
                                            <Link href={`products/${product.id}`} className={s.action} >{<SquarePen size={20} />}</Link>
                                            <button className={s.action} onClick={() => grabTargetProduct(product.id, product.title)}>{<Trash size={20} />}</button>
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