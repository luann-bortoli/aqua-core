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
import { useParams } from 'next/navigation'
import { treatmentGroupSchema, TreatmentGroupSchema } from '@/src/features/treatments/schema/treatmentGroup'


export default function UpdateTreatmentGroup() {

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
    } = useForm<TreatmentGroupSchema>({
        resolver: zodResolver(treatmentGroupSchema),
        mode: "onChange"
    })

    const fetchCurrent = async () => {

        const { data } = await api.get(`treatment/${param.id}`)

        reset({
            name: data.name
        })

    }

    useEffect(() => {
        fetchCurrent()
    }, [])


    const onSubmit = async (data: TreatmentGroupSchema) => {

        try
        {
            await api.patch(`/treatment-groups/${param.id}`, data)
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
            {success && <GlobalSuccess message='Grupo alterado' onClose={() => setSuccess(false)} />}

            <SectionTitle target='/treatment-groups' title='Alterar grupos' description='Altere os grupos dos tratamentos no sistema' />

            <form onSubmit={handleSubmit(onSubmit)} className={s.inputWrapper}>
                <div className={s.inputField}>
                    <Input
                        {...register("name")}
                        type='text'
                        id='title'
                        text='Nome'
                        placeholder='Água verde'
                        error={errors.name?.message}
                    />
                    {errors.name && <InputError message={errors.name?.message} />}
                </div>

                <SubmitButton text={"Alterar"} isValid={isValid} isSubmitting={isSubmitting} />
            </form>
        </div>
    )
}