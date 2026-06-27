'use client'

import { useEffect } from 'react'
import s from './GlobalError.module.css'
import { MessageCircleWarning } from 'lucide-react'

type GlobalErrorProps = {
    message: string
    onClose: () => void
}

export default function GlobalError({ message, onClose }: GlobalErrorProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)
    }, [onClose])

    return (
        <>
            <MessageCircleWarning />

            <p>{message}</p>
        </>
    )
}