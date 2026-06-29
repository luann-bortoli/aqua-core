import { MessageCircleWarning } from 'lucide-react'
import s from './Confirmation.module.css'

type Props = {
    message: string
    onCancel: any
    onConfirm: any
    loading: boolean
}

export default function Confirmation({ message, onCancel, onConfirm, loading }: Props) {
    return (
        <div className={s.bodyWrapper}>
            <div className={s.mainWrapper}>
                <MessageCircleWarning />
                <p>{message}</p>
                <div className={s.actionWrapper}>
                    <button type='button' onClick={onCancel}>Cancelar</button>
                    <button type='button' onClick={onConfirm}>{loading ? "Carregando" : "Confirmar"}</button>
                </div>
            </div>
        </div>
    )
}