'use client'

import s from './AuthInput.module.css'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from "react";

type InputFieldProps =
    {
        type: 'text' | 'email' | 'password'
        id: string
        text: string
        placeholder: string
    }

export default function InputField({ type, id, text, placeholder }: InputFieldProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <>
            <div className={s.inputField}>
                <input id={id} name={id} type={showPassword ? "text" : "password"} placeholder={placeholder} />
                <label htmlFor={id}>{text}</label>
                {type === 'password' && (
                    <button
                        type='button'
                        onClick={() => setShowPassword(prevState => !prevState)}
                        className={s.showPasswordButton}>
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                )}
            </div>
        </>
    )
}