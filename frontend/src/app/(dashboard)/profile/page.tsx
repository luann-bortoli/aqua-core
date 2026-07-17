'use client'

import { useRequireAuth } from '@/src/shared/hooks/useRequireAuth'
import s from './page.module.css'
import SectionTitle from '@/src/shared/components/layout/SectionTitle/SectionTitle'
import { useEffect, useState } from 'react'
import { ApiError } from '@/src/shared/types/error'
import GlobalError from '@/src/shared/components/feedback/global-error/GlobalError'
import { mapApiError } from '@/src/shared/lib/mapApiError'
import { useCurrentUser } from '@/src/shared/hooks/useCurrentUser'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfileSchema, profileSchema } from '@/src/features/profile/schema/profile'
import InputError from '@/src/shared/components/feedback/input-error/InputError'
import Input from '@/src/shared/components/ui/input/Input'
import SubmitButton from '@/src/shared/components/ui/submit-button/SubmitButton'
import PasswordConfirmation from '@/src/shared/components/feedback/password-confirmation/PasswordConfirmation'
import { api } from '@/src/shared/lib/api'

type Profile = {
    id: string
    name: string,
    email: string
    newPassword: string
    currentPassword: string
}

export default function Profile() {

    useRequireAuth()

    const [error, setError] = useState<ApiError | null>(null)
    const [confirmation, setConfirmation] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState<ProfileSchema | null>(null)

    const openConfirmation = (data: ProfileSchema) => {
        setFormData(data)
        setConfirmation(true)
    }

    const current = useCurrentUser()

    const fillCurrentData = () => {

        reset({
            name: current?.name,
            email: current?.email
        })

    }

    useEffect(() => {
        fillCurrentData()
    }, [current])

    const {
        reset,
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid,
        }
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        mode: "onChange"
    })

    const updateProfile = async (currentPassword: string) => {

        if (!formData) return;

        try
        {

            setLoading(true);

            await api.patch("/users/me", {
                name: formData.name,
                newPassword: formData.newPassword,
                currentPassword
            })

            setConfirmation(false);

        } catch (err)
        {

            setError(err as ApiError);

        } finally
        {

            setLoading(false);

        }

    }

    return (
        <>
            {confirmation &&
                <PasswordConfirmation
                    message='Digite sua senha para confirmar as alterações:'
                    onCancel={() => setConfirmation(false)}
                    loading={loading}
                    onConfirm={updateProfile} />
            }

            {error &&
                <GlobalError
                    message={mapApiError(error)}
                    onClose={() => setError(null)}
                />}

            <div className={s.mainWrapper}>
                <SectionTitle target='/profile' />

                <form onSubmit={handleSubmit(openConfirmation)} className={s.inputWrapper}>

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
                            readOnly={true}
                            placeholder='dave@gmail.com'
                            error={errors.email?.message}
                        />
                    </div>

                    <div className={s.inputField}>
                        <Input
                            {...register("newPassword")}
                            type='password'
                            id='newPassword'
                            text='Nova senha'
                            error={errors.newPassword?.message}
                        />
                        {errors.newPassword && <InputError message={errors.newPassword?.message} />}
                    </div>

                    <SubmitButton text={"Alterar"} isValid={isValid} isSubmitting={isSubmitting} />


                </form>

            </div>
        </>
    )
}