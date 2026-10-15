'use client'

import Image from 'next/image'
import Link from 'next/link'
import s from './page.module.css'
import AuthInput from '@/src/shared/components/ui/auth-input/AuthInput'
import { login } from '@/src/shared/services/auth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { loginSchema, LoginSchema } from '@/src/features/auth/login/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { sleep } from '@/src/shared/utils/async'
import InputError from '@/src/shared/components/feedback/input-error/InputError'
import { getCurrentYear } from '@/src/shared/utils/date'
import GlobalError from '@/src/shared/components/feedback/global-error/GlobalError'
import { useState } from 'react'
import { ApiError } from '@/src/shared/types/error'
import { normalizeCatchError } from '@/src/shared/utils/mapper'
import { mapApiError } from '@/src/shared/lib/mapApiError'

export default function Login() {

    const [loginError, setLoginError] = useState<ApiError | null>(null)

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isValid
        }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    })

    const onSubmit = async (data: LoginSchema) => {

        try
        {
            await login(data);
            router.push("/dashboard")

        } catch (error)
        {
            let apiError = normalizeCatchError(error)

            setLoginError(apiError ?? null)
        }
    };

    return (
        <>
            <div className={s.bodyContainer}>

                {loginError != null && <GlobalError message={mapApiError(loginError)} onClose={() => setLoginError(null)} />}

                <form onSubmit={handleSubmit(onSubmit)} className={s.cardContainer}>
                    <Image
                        src={"/logo.png"}
                        alt='logo'
                        width={280}
                        height={120}
                        priority
                    />

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

                        <AuthInput
                            {...register("password")}
                            type='password'
                            id='password'
                            text='Digite sua senha'
                            placeholder='••••••••'
                            error={errors.password?.message}
                            autoComplete='current-password'
                        />

                        {errors.password && <InputError message={errors.password?.message} />}

                        <Link href={"/forgot-password"}>Esqueci a senha</Link>
                    </div>

                    <button
                        disabled={!isValid || isSubmitting}
                        type={"submit"}
                        className={s.submitButton}>{isSubmitting ? "Carregando..." : "Acessar"}</button>

                    <p className={s.copyright}>© {getCurrentYear()} Quibenne. Todos os direitos reservados.</p>

                </form>
            </div>
        </>
    )
}