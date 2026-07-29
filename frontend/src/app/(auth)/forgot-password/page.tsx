'use client'

import Link from 'next/link'
import s from './page.module.css'
import AuthInput from '@/src/shared/components/ui/auth-input/AuthInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from '@/src/shared/components/feedback/input-error/InputError'
import { LockKeyhole } from 'lucide-react'
import { forgotPasswordSchema, ForgotPasswordSchema } from './_features/schema/forgot-password.schema'
import { useState } from 'react'
import GlobalSuccess from '@/src/shared/components/feedback/global-succes/GlobalSuccess'
import { api } from '@/src/shared/lib/api'
import { normalizeCatchError } from '@/src/shared/utils/mapper'
import { ApiError } from '@/src/shared/types/error'
import GlobalError from '@/src/shared/components/feedback/global-error/GlobalError'

export default function forgotPassword() {

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<ApiError | null>(null)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid
        }
    } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange"
    })

    const onSubmit = async (data: ForgotPasswordSchema) => {

        try { 
            await api.post("/forgot-password", data.email)
            setSuccess(true)
        }

        catch (err) 
        {
            const apiError = normalizeCatchError(err)
            setError(apiError)
        }
    };

    return (
        <>
            <div className={s.bodyContainer}>

                {success && <GlobalSuccess
                    message={`Link enviado com sucesso.`}
                    onClose={() => setSuccess(false)}
                />}

                {error && <GlobalError 
                    message={"Link para redefinição de senha enviado."} 
                    onClose={() => setError(null)}
                    />}

                <form onSubmit={handleSubmit(onSubmit)} className={s.cardContainer}>

                    <LockKeyhole
                        size={48}
                    />

                    <p className={s.title}>Esqueceu sua senha?</p>
                    <p className={s.desc}>Insira seu e-mail e enviaremos um link com as instruções para redefinição.</p>

                    <div className={s.inputWrapper}>

                        <AuthInput
                            {...register("email")}
                            type='email'
                            id='email'
                            text='Digite seu email'
                            placeholder='dave@gmail.com'
                            error={errors.email?.message}
                            autoComplete='email'
                            autoCapitalize='none'
                        />

                        {errors.email && <InputError message={errors.email?.message} />}

                    </div>

                    <button
                        disabled={!isValid || isSubmitting}
                        type={"submit"}
                        className={s.submitButton}>{isSubmitting ? "Carregando..." : "Enviar link de recuperação"}</button>

                    <Link href={"/login"}>Voltar ao login</Link>

                </form>
            </div>
        </>
    )
}