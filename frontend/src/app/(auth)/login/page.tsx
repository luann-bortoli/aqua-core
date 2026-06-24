'use client'

import Image from 'next/image'
import Link from 'next/link'
import s from './page.module.css'
import AuthInput from '@/src/shared/components/ui/AuthInput'
import { useState } from 'react'

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = () => {

    }

    return (
        <>
            <div className={s.bodyContainer}>
                <form onSubmit={handleSubmit} className={s.cardContainer}>
                    <Image
                        src={"/logo.png"}
                        alt='logo'
                        fill
                    />

                    <div className={s.inputWrapper}>

                        <AuthInput
                            type='email'
                            id='email'
                            text='Digite seu email'
                            placeholder='dave@gmail.com'
                        />

                        <AuthInput
                            type='password'
                            id='password'
                            text='Digite sua senha'
                            placeholder='••••••••'
                        />

                        <Link href={"/forgot-password"}>Esqueci a senha</Link>
                    </div>

                    <button
                        disabled={loading}
                        type={"submit"}
                        className={s.submitButton}>Acessar</button>

                    <p className={s.copyright}>© 2026 Quibenne. Todos os direitos reservados.</p>

                </form>
            </div>
        </>
    )
}