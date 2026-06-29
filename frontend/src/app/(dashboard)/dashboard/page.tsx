'use client'

import s from './page.module.css'
import { useRequireAuth } from "@/src/shared/hooks/useRequireAuth"
import Link from 'next/link'
import SectionTitle from '@/src/shared/components/layout/SectionTitle/SectionTitle'
import { modules } from '@/src/shared/constants/modules'
import { useCurrentUser } from '@/src/shared/hooks/useCurrentUser'

export default function Dashboard() {

    useRequireAuth()

    const current = useCurrentUser()

    const visibleModules = current?.role !== "ROLE_ADMIN" ? modules.filter((module) => module.adminOnly != true) : modules

    return (
        <div className={s.mainWrapper}>

            <SectionTitle target={"/dashboard"} />

            <div className={s.cardWrapper}>
                {visibleModules
                    .filter(module => module.title !== "Dashboard")

                    .map((card, index) => {
                        const Icon = card.icon

                        return (
                            <Link key={index} href={card.href}>
                                <div className={s.cardItem}>
                                    {<Icon size={32} />}
                                    <div className={s.infoWrapper}>
                                        <p className={s.title}>{card.title}</p>
                                        <p className={s.description}>{card.description}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
            </div>
        </div>
    )
}