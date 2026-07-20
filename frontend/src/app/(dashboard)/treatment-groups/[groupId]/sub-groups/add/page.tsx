
'use client'

import SectionTitle from '@/src/shared/components/layout/SectionTitle/SectionTitle'
import s from './page.module.css'
import Input from '@/src/shared/components/ui/input/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from '@/src/shared/components/feedback/input-error/InputError'
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
import { treatmentSubGroupSchema, TreatmentSubGroupSchema } from '@/src/features/treatments/schema/treatmentSubGroup'
import { useParams } from 'next/navigation'


export default function UpdateTreatmentSubGroup() {

    const [formError, setFormError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    useRequireAuth()

    const { groupId } = useParams()

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid,
        }
    } = useForm<TreatmentSubGroupSchema>({
        resolver: zodResolver(treatmentSubGroupSchema),
        mode: "onChange"
    })


    const onSubmit = async (data: TreatmentSubGroupSchema) => {

        try
        {
            await api.post("/treatment-sub-groups", {
                name: data.name,
                groupId: groupId
            })
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
            {success && <GlobalSuccess message='Sub-grupo de tratamento cadastrado' onClose={() => setSuccess(false)} />}

            <SectionTitle target='/treatment-groups' title='Cadastrar sub-grupos' description='Cadastre novos sub-grupos dos tratamentos' />

            <form onSubmit={handleSubmit(onSubmit)} className={s.inputWrapper}>
                <div className={s.inputField}>
                    <Input
                        {...register("name")}
                        type='text'
                        id='name'
                        text='Nome'
                        placeholder='Algas'
                        error={errors.name?.message}
                    />
                    {errors.name && <InputError message={errors.name?.message} />}
                </div>

                <SubmitButton isValid={isValid} isSubmitting={isSubmitting} />
            </form>
        </div>
    )
}