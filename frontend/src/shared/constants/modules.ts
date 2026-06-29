import { LucideIcon } from "lucide-react"
import { Bell, Droplet, LayoutGrid, Package, RefreshCw, User, UserCog, Users, } from 'lucide-react'
import { Url } from "next/dist/shared/lib/router/router"

type Module = {
    icon: LucideIcon
    title: string
    description: string
    href: string
    adminOnly?: boolean
}

export const modules: Module[] = [
    {
        icon: LayoutGrid,
        title: "Dashboard",
        description: "Visualize os módulos do sistema",
        href: "/dashboard"
    },
    {
        icon: User,
        title: "Usuários",
        description: "Gerencie os usuários do painel",
        href: "/users",
        adminOnly: true
    },
    {
        icon: Users,
        title: "Clientes",
        description: "Gerencie os clientes cadastrados",
        href: "/clients"
    },
    {
        icon: Package,
        title: "Produtos",
        description: "Gerencie os produtos cadastrados",
        href: "/products"
    },
    {
        icon: Droplet,
        title: "Piscinas",
        description: "Gerencie as piscinas cadastrados",
        href: "/pools"
    },
    {
        icon: RefreshCw,
        title: "Tratamentos",
        description: "Gerencie os tratamentos cadastrados",
        href: "/treatments"
    },
    {
        icon: Bell,
        title: "Notifications",
        description: "Envie novas notificações",
        href: "/notifications"
    },
    {
        icon: UserCog,
        title: "Meus dados",
        description: "Gerencie seus dados",
        href: "/profile"
    }
]