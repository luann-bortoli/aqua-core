'use client'

import { logout } from '@/src/shared/services/auth'
import s from './Sidebar.module.css'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { modules } from '@/src/shared/constants/modules'
import { LogOut } from 'lucide-react'
import { useCurrentUser } from '@/src/shared/hooks/useCurrentUser'

export default function Sidebar() {

    const pathName = usePathname()
    const router = useRouter()

    const current = useCurrentUser()
    const visibleModules = current?.role !== "ROLE_ADMIN" ? modules.filter(module => module.adminOnly !== true) : modules

    const handleLogout = async () => {

        await logout()

        router.replace("/login")

    }

    return (
        <aside>
            <nav className={s.nav}>
                {visibleModules && visibleModules.map((item, index) => {

                    const Icon = item.icon

                    return (
                        <div key={index} className={`${s.sidebarItem} ${pathName.startsWith(item.href) ? s.active : ""
                            }`}>
                            <Link
                                href={item.href}
                            >
                                {<Icon />}
                                <p>{item.title}</p>
                            </Link>
                        </div>
                    )
                })}
                <div className={s.sidebarItem}>
                    <button onClick={handleLogout}>
                        <LogOut />
                        <p>Sair</p>
                    </button>
                </div>
            </nav>
        </aside>
    )
}