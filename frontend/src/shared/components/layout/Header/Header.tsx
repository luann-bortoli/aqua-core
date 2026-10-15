'use client'

import { useCurrentUser } from '@/src/shared/hooks/useCurrentUser'
import s from './Header.module.css'
import Image from 'next/image'

export default function Header() {

    const user = useCurrentUser()
    return (
        <header className={s.header}>

            <div className={s.imageContainer}>
                <Image
                    src={"/logo.png"}
                    alt='logo'
                    width={175}
                    height={75}
                    priority
                />
            </div>

            <div className={s.handleBorder}>
                <p>{user ? "Olá, " + user.name : "Carregando..."}</p>
            </div>

        </header>
    )
}