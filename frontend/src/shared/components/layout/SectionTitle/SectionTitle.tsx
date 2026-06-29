import { modules } from '@/src/shared/constants/modules'
import s from './SectionTitle.module.css'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'

type Props = {
    target?:
    | "/dashboard"
    | "/users"
    | "/clients"
    | "/products"
    | "/pools"
    | "/treatments"
    | "/notifications"
    | "/profile"

    title?: string
    description?: string
}

export default function SectionTitle({ target, title, description }: Props) {

    const section = modules.find(module => module.href === target)

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
                        !title &&
                        target !== "/dashboard" &&
                        target !== "/profile" && (
                            <Link className={s.addWrapper} href={`${target}/add`}>
                                <p>Cadastrar</p> <Plus size={20} />
                            </Link>
                        )}

                    {target !== "/dashboard" && (
                        <Link className={s.addWrapper} href="/dashboard">
                            <p>Voltar</p> <ArrowLeft size={20} />
                        </Link>
                    )}

                </div>
            </div>

            <hr className={s.hr} />
        </>
    )
}