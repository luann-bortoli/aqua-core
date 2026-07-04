'use client'

import SectionTitle from '@/src/shared/components/layout/SectionTitle/SectionTitle'
import s from './page.module.css'
import Input from '@/src/shared/components/ui/input/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from '@/src/shared/components/feedback/input-error/InputError'
import Select from '@/src/shared/components/ui/select/Select'
import SubmitButton from '@/src/shared/components/ui/submit-button/SubmitButton'
import { api } from '@/src/shared/lib/api'
import { normalizeCatchError } from '@/src/shared/utils/mapper'
import { useEffect, useState } from 'react'
import { ApiError } from '@/src/shared/types/error'
import GlobalError from '@/src/shared/components/feedback/global-error/GlobalError'
import { mapApiError } from '@/src/shared/lib/mapApiError'
import { sleep } from '@/src/shared/utils/async'
import GlobalSuccess from '@/src/shared/components/feedback/global-succes/GlobalSuccess'
import { useRequireAuth } from '@/src/shared/hooks/useRequireAuth'
import { productUpdateSchema, ProductUpdateSchema } from '@/src/shared/schema/product'
import { ResourceStatusArray, ResourceStatusLabel } from '@/src/shared/types/entity'
import { useParams } from 'next/navigation'


export default function UpdateProduct() {

    const param = useParams()

    const [formError, setFormError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const [currentImage, setCurrentImage] = useState("")

    useRequireAuth()

    const fetchCurrent = async () => {

        const { data } = await api.get(`/products/${param.id}`)

        reset({
            title: data.title,
            status: data.status,
        })

        setCurrentImage(data.image)

    }

    useEffect(() => {
        fetchCurrent()
    }, [])

    const {
        watch,
        reset,
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid,
        }
    } = useForm<ProductUpdateSchema>({
        resolver: zodResolver(productUpdateSchema),
        mode: "onChange"
    })

    const image = watch("image")

    const onSubmit = async (data: ProductUpdateSchema) => {

        const formData = new FormData()

        formData.append("title", data.title);
        formData.append("status", data.status);
        data.image?.length && formData.append("image", data.image[0]);

        try
        {
            await api.patch(`/products/${param.id}`, formData)
            setSuccess(true)

        } catch (error: any) 
        {
            console.log(error)
            setFormError(normalizeCatchError(error))
            await sleep(3000)
        }

    }

    return (
        <div className={s.mainWrapper}>

            {formError && <GlobalError onClose={() => setFormError(null)} message={mapApiError(formError)} />}
            {success && <GlobalSuccess message='Produto editado' onClose={() => setSuccess(false)} />}

            <SectionTitle target='/products' title='Editar produtos' description='Altere os produtos cadastrados no sistema' />

            <form onSubmit={handleSubmit(onSubmit)} className={s.inputWrapper}>
                <div className={s.inputField}>
                    <Input
                        {...register("title")}
                        type='text'
                        id='title'
                        text='Nome'
                        placeholder='Cloro Granulado Premium'
                        error={errors.title?.message}
                    />
                    {errors.title && <InputError message={errors.title?.message} />}
                </div>

                <div className={s.inputField}>
                    <Select
                        {...register("status")}
                        options={ResourceStatusArray.map((status, index) => {
                            return (
                                {
                                    value: status,
                                    label: ResourceStatusLabel[status]
                                }
                            )
                        })}
                        id='status'
                        text='Status'
                        error={errors.status?.message}
                    />
                    {errors.status && <InputError message={errors.status?.message} />}
                </div>

                <div className={s.inputField}>
                    <Input
                        {...register("image")}
                        type='file'
                        id='image'
                        text='Imagem'
                        accept='image/*'
                        error={errors.image?.message}
                        fileName={image?.[0]?.name ?? currentImage.split("/").pop() ?? ""}
                    />
                    {errors.image && <InputError message={errors.image?.message} />}
                </div>

                <SubmitButton text={"Editar"} isValid={isValid} isSubmitting={isSubmitting} />
            </form>
        </div>
    )
}