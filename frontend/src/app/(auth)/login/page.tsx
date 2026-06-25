'use client'

import Image from 'next/image'
import Link from 'next/link'
import s from './page.module.css'
import AuthInput from '@/src/shared/components/ui/AuthInput'
import { useState } from 'react'

type FormProps = {
    email: string,
    password: string
}

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false)

    const [form, setForm] = useState<FormProps>(
        {
            email: "",
            password: ""
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = () => {

    }

    return (
        <>
            <div className={s.bodyContainer}>
                <form onSubmit={handleSubmit} className={s.cardContainer}>
                    <Image
                        src={"/logo.png"}
                        alt='logo'
                        width={157}
                        height={78}
                    />

                    <div className={s.inputWrapper}>

                        <AuthInput
                            onChange={handleChange}
                            value={form.email}
                            type='email'
                            id='email'
                            text='Digite seu email'
                            placeholder='dave@gmail.com'
                        />

                        <AuthInput
                            onChange={handleChange}
                            value={form.password}
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