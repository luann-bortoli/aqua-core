'use client'

import SectionTitle from '@/src/shared/components/layout/SectionTitle/SectionTitle'
import s from './page.module.css'
import Input from '@/src/shared/components/ui/input/Input'
import { useForm } from 'react-hook-form'
import { userSchema, UserSchema } from '@/src/shared/schema/user'
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

export default function AddUser() {

    const [formError, setFormError] = useState<ApiError | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    useRequireAuth()

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid
        }
    } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        mode: "onChange"
    })

    const onSubmit = async (data: UserSchema) => {

        try
        {
            await api.post("/users", data)
            setSuccess(true)

        } catch (error) 
        {
            setFormError(normalizeCatchError(error))
            sleep(3000)
        }

    }

    return (
        <div className={s.mainWrapper}>

            {formError && <GlobalError onClose={() => setFormError(null)} message={mapApiError(formError)} />}
            {success && <GlobalSuccess message='Usuário cadastrado' onClose={() => setSuccess(false)} />}

            <SectionTitle target='/users' title='Cadastrar usuário' description='Cadastre novos usuários do painel' />

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
                    <Input
                        {...register("password")}
                        type='password'
                        id='password'
                        text='Senha'
                        placeholder='••••••••'
                        error={errors.password?.message}
                    />
                    {errors.password && <InputError message={errors.password?.message} />}
                </div>

                <div className={s.inputField}>
                    <Select
                        options={[
                            { value: "ROLE_ADMIN", label: "Administrador" },
                            { value: "ROLE_COLLABORATOR", label: "Colaborador" }]}
                        {...register("role")}
                        text='Nível de permissões' />
                    {errors.role && <InputError message={errors.role?.message} />}
                </div>

                <SubmitButton isValid={isValid} isSubmitting={isSubmitting} />
            </form>
        </div>
    )
}