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
import { useState } from 'react'
import { ApiError } from '@/src/shared/types/error'
import GlobalError from '@/src/shared/components/feedback/global-error/GlobalError'
import { mapApiError } from '@/src/shared/lib/mapApiError'
import { sleep } from '@/src/shared/utils/async'
import GlobalSuccess from '@/src/shared/components/feedback/global-succes/GlobalSuccess'
import { useRequireAuth } from '@/src/shared/hooks/useRequireAuth'
import { productSchema, ProductSchema } from '@/src/shared/schema/product'
import { ResourceStatusArray, ResourceStatusLabel } from '@/src/shared/types/entity'


export default function AddProduct() {

    const [formError, setFormError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    useRequireAuth()

    const {
        watch,
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid,
        }
    } = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        mode: "onChange"
    })

    const image = watch("image")


    const onSubmit = async (data: ProductSchema) => {

        const formData = new FormData()

        formData.append("title", data.title);
        formData.append("status", data.status);
        formData.append("image", data.image[0]);

        try
        {
            await api.post("/products", formData)
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
            {success && <GlobalSuccess message='Produto cadastrado' onClose={() => setSuccess(false)} />}

            <SectionTitle target='/products' title='Cadastrar produtos' description='Cadastre novos produtos no sistema' />

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
                        fileName={image?.[0]?.name}
                    />
                    {errors.image && <InputError message={errors.image?.message} />}
                </div>

                <SubmitButton isValid={isValid} isSubmitting={isSubmitting} />
            </form>
        </div>
    )
}