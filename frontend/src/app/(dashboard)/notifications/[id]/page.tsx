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
import { notificationSchema, NotificationSchema } from '@/src/features/notifications/schema/notification'
import { useParams } from 'next/navigation'


export default function UpdateNotification() {

    const [formError, setFormError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const param = useParams()

    useRequireAuth()

    const {
        reset,
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid,
        }
    } = useForm<NotificationSchema>({
        resolver: zodResolver(notificationSchema),
        mode: "onChange"
    })

    const fetchCurrent = async () => {

        const { data } = await api.get(`notifications/${param.id}`)

        reset({
            title: data.title,
            description: data.description
        })

    }

    useEffect(() => {
        fetchCurrent()
    }, [])


    const onSubmit = async (data: NotificationSchema) => {

        try
        {
            await api.patch(`/notifications/${param.id}`, data)
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
            {success && <GlobalSuccess message='Notificação alterada' onClose={() => setSuccess(false)} />}

            <SectionTitle target='/notifications' title='Alterar notificações' description='Altere as notificações cadastradas no sistema' />

            <form onSubmit={handleSubmit(onSubmit)} className={s.inputWrapper}>
                <div className={s.inputField}>
                    <Input
                        {...register("title")}
                        type='text'
                        id='title'
                        text='Nome'
                        placeholder='Novas ofertas'
                        error={errors.title?.message}
                    />
                    {errors.title && <InputError message={errors.title?.message} />}
                </div>

                <div className={s.inputField}>
                    <Input
                        {...register("description")}
                        type='text'
                        id='description'
                        text='Descrição'
                        placeholder='Venha acompanhar as novas ofertas'
                        error={errors.description?.message}
                    />
                    {errors.description && <InputError message={errors.description?.message} />}
                </div>

                <SubmitButton text={"Alterar"} isValid={isValid} isSubmitting={isSubmitting} />
            </form>
        </div>
    )
}