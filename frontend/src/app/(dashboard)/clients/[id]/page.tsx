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
import { clientUpdateSchema, ClientUpdateSchema } from '@/src/features/clients/schema/client'
import { StatesArray } from '../page'
import { useParams } from 'next/navigation'
import { useHookFormMask } from "use-mask-input";

export default function UpdateClient() {

    const param = useParams()

    const [formError, setFormError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    useRequireAuth()

    const fetchUser = async () => {
        const { data } = await api.get(`/clients/${param.id}`)

        reset({
            name: data.name,
            email: data.email,
            address: { city: data.address.city, state: data.address.state },
            phone: data.phone
        })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const {
        reset,
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid
        }
    } = useForm<ClientUpdateSchema>({
        resolver: zodResolver(clientUpdateSchema),
        mode: "onChange"
    })

    const registerWithMask = useHookFormMask(register);

    const onSubmit = async (data: ClientUpdateSchema) => {
        try
        {
            await api.patch(`/clients/${param.id}`, data)
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
            {success && <GlobalSuccess message='Cliente editado' onClose={() => setSuccess(false)} />}

            <SectionTitle target='/clients' title='Editar cliente' description='Altere as informações dos clientes cadastrados' />

            <form onSubmit={handleSubmit(onSubmit)} className={s.inputWrapper}>
                <div className={s.inputField}>
                    <Input
                        {...register("name")}
                        type='text'
                        id='name'
                        text='Nome'
                        placeholder='Dave Smith'
                        error={errors.name?.message}
                    />
                    {errors.name && <InputError message={errors.name?.message} />}
                </div>

                <div className={s.inputField}>
                    <Input
                        {...register("email")}
                        type='email'
                        id='email'
                        text='E-mail'
                        placeholder='dave@gmail.com'
                        error={errors.email?.message}
                    />
                    {errors.email && <InputError message={errors.email?.message} />}
                </div>

                <div className={s.inputField}>
                    <Select

                        options={StatesArray.map((state) => {
                            return ({
                                value: state,
                                label: state
                            })
                        })}

                        {...register("address.state")}
                        text='Estado' />
                    {errors.address?.state && <InputError message={errors.address.state.message} />}
                </div>

                <div className={s.inputField}>
                    <Input
                        {...register("address.city")}
                        type='text'
                        id='city'
                        text='Cidade'
                        placeholder='Porto Alegre'
                        error={errors.email?.message}
                    />
                    {errors.address?.city && <InputError message={errors.address.city.message} />}
                </div>

                <div className={s.inputField}>
                    <Input
                        {...registerWithMask("phone", ["(99) 9999-9999", "(99) 9 9999-9999"])}
                        id='phone'
                        text='Telefone'
                        placeholder='(99) 99999-9999'
                        error={errors.phone?.message}
                    />
                    {errors.phone && <InputError message={errors.phone?.message} />}
                </div>

                <SubmitButton text={"Editar"} isValid={isValid} isSubmitting={isSubmitting} />
            </form>
        </div>
    )
}