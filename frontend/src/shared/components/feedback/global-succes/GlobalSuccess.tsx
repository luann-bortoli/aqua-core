'use client'

import { useEffect } from 'react'
import s from './GlobalSuccess.module.css'
import { MessageCircleCheck, MessageCircleWarning } from 'lucide-react'

type GlobalSuccessProps = {
    message: string
    onClose: () => void
}

export default function GlobalSuccess({ message, onClose }: GlobalSuccessProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 5000)
    }, [onClose])

    return (
        <>
            <div className={s.contentWrapper}>
                <MessageCircleCheck />

                <p>{message}</p>
            </div>
        </>
    )
}