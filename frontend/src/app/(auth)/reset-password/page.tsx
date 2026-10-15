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
import { useSearchParams } from 'next/navigation'
import { api } from '@/src/shared/lib/api'
import GlobalSuccess from '@/src/shared/components/feedback/global-succes/GlobalSuccess'
import GlobalError from '@/src/shared/components/feedback/global-error/GlobalError'

export default function ResetPassword() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

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
        mode: 'onChange'
    })

    const onSubmit = async (data: ResetPasswordSchema) => {
        setSuccess(false)
        setError(false)

        if (!token)
        {
            setError(true)
            return
        }

        try
        {
            await api.post('/auth/reset-password', {
                token,
                newPassword: data.password
            })

            setSuccess(true)
        } catch
        {
            setError(true)
        }
    }

    return (
        <>
            <div className={s.bodyContainer}>

                {success && (
                    <GlobalSuccess
                        message="Senha redefinida com sucesso. Você já pode entrar com sua nova senha."
                        onClose={() => setSuccess(false)}
                    />
                )}

                {error && (
                    <GlobalError
                        message="Não foi possível redefinir a senha. O link pode ter expirado ou ser inválido."
                        onClose={() => setError(false)}
                    />
                )}

                <form onSubmit={handleSubmit(onSubmit)} className={s.cardContainer}>

                    <LockKeyhole size={48} />

                    <p className={s.title}>Redefinição de senha</p>
                    <p className={s.desc}>Insira sua nova senha para realizar a alteração.</p>

                    <div className={s.inputWrapper}>

                        <AuthInput
                            {...register('password')}
                            type="password"
                            id="password"
                            text="Digite sua nova senha"
                            error={errors.password?.message}
                            autoComplete="new-password"
                            autoCapitalize="none"
                        />

                        {errors.password && (
                            <InputError message={errors.password.message} />
                        )}

                        <AuthInput
                            {...register('repeatedPassword')}
                            type="password"
                            id="repeatedPassword"
                            text="Digite a senha novamente"
                            error={errors.repeatedPassword?.message}
                            autoComplete="new-password"
                            autoCapitalize="none"
                        />

                        {errors.repeatedPassword && (
                            <InputError message={errors.repeatedPassword.message} />
                        )}

                    </div>

                    <button
                        disabled={!isValid || isSubmitting || success}
                        type="submit"
                        className={s.submitButton}
                    >
                        {isSubmitting ? 'Carregando...' : 'Alterar senha'}
                    </button>

                    <Link href="/login">Voltar ao login</Link>

                </form>
            </div>
        </>
    )
}