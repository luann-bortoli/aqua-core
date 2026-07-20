import { modules } from '@/src/shared/constants/modules'
import s from './SectionTitle.module.css'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { useCurrentUser } from '@/src/shared/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'

type Props = {
    target?:
    | "/dashboard"
    | "/users"
    | "/clients"
    | "/products"
    | "/pools"
    | "/treatment-groups"
    | "/notifications"
    | "/profile"

    title?: string
    description?: string
    showCreateButton?: boolean
    customPush?: string
}

export default function SectionTitle
    ({
        target, title, description,
        showCreateButton = false,
        customPush = undefined
    }: Props) {

    const router = useRouter()

    const section = modules.find(module => module.href === target)

    const user = useCurrentUser()

    if (!section) return null

    const Icon = section.icon

    return (
        <>
            <div className={s.sectionWrapper}>
                <div className={s.startWrapper}>
                    <Icon size={48} />

                    <div className={s.infoWrapper}>
                        <p className={s.title}>{title ? title : section.title}</p>
                        <p className={s.description}>{description ? description : section.description}</p>
                    </div>
                </div>

                <div className={s.actionWrapper}>

                    {
                        showCreateButton &&
                        user?.role === "ROLE_ADMIN" && (
                            <Link className={s.addWrapper} href={customPush ?? `${target}/add`}>
                                <p>Cadastrar</p> <Plus size={20} />
                            </Link>
                        )}


                    {target !== "/dashboard" && (
                        <button className={s.addWrapper} onClick={() => title ? router.back() : router.push("/dashboard")} >
                            <p>Voltar</p> <ArrowLeft size={20} />
                        </button>
                    )}

                </div>
            </div>

            <hr className={s.hr} />
        </>
    )
}