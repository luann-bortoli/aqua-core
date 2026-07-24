'use client'

import Link from 'next/link'
import s from './page.module.css'
import AuthInput from '@/src/shared/components/ui/auth-input/AuthInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from '@/src/shared/components/feedback/input-error/InputError'
import { LockKeyhole } from 'lucide-react'
import { resetPasswordSchema, ResetPasswordSchema } from './_features/schema/reset-password.schema'
import { useState } from 'react'
import GlobalSuccess from '@/src/shared/components/feedback/global-succes/GlobalSuccess'

export default function ResetPassword() {

    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid
        }
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange"
    })

    const onSubmit = async (data: ResetPasswordSchema) => {
        setSuccess(true)
    };

    return (
        <>
            <div className={s.bodyContainer}>

                {success && <GlobalSuccess
                    message={`Link enviado com sucesso.`}
                    onClose={() => setSuccess(false)}
                />}

                <form onSubmit={handleSubmit(onSubmit)} className={s.cardContainer}>

                    <LockKeyhole
                        size={48}
                    />

                    <p className={s.title}>Redefinição de senha</p>
                    <p className={s.desc}>Insira sua nova senha para realizar a alteração.</p>

                    <div className={s.inputWrapper}>

                        <AuthInput
                            {...register("password")}
                            type='password'
                            id='password'
                            text='Digite sua nova senha'
                            error={errors.password?.message}
                            autoComplete='password'
                            autoCapitalize='none'
                        />

                        {errors.password && <InputError message={errors.password?.message} />}

                        <AuthInput
                            {...register("repeatedPassword")}
                            type='password'
                            id='repeatedPassword'
                            text='Digite a senha novamente'
                            error={errors.repeatedPassword?.message}
                            autoComplete='password'
                            autoCapitalize='none'
                        />

                        {errors.repeatedPassword && <InputError message={errors.repeatedPassword?.message} />}

                    </div>

                    <button
                        disabled={!isValid || isSubmitting}
                        type={"submit"}
                        className={s.submitButton}>{isSubmitting ? "Carregando..." : "Alterar senha"}</button>

                    <Link href={"/login"}>Voltar ao login</Link>

                </form>
            </div>
        </>
    )
}