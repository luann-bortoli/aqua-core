'use client'

import Link from 'next/link'
import s from './page.module.css'
import AuthInput from '@/src/shared/components/ui/AuthInput'

export default function Login() {

    const handleSubmit = () => {

    }

    return (
        <>
            <div className={s.bodyContainer}>
                <form onSubmit={handleSubmit} className={s.cardContainer}>
                    <img src="/logo.png" alt="logo" />

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

                        <Link href={"#"}>Esqueci a senha</Link>
                    </div>

                    <button type={"submit"} className={s.submitButton}>Acessar</button>

                    <p className={s.copyright}>© 2026 Quibenne. Todos os direitos reservados.</p>

                </form>
            </div>
        </>
    )
}