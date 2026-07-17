'use client'

import s from './AuthInput.module.css'
import { Eye, EyeOff } from 'lucide-react'
import {
    forwardRef,
    InputHTMLAttributes,
    useState
} from 'react'

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    text: string
    error?: string
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ type, id, text, placeholder, error, ...props }, ref) => {

        const [showPassword, setShowPassword] = useState(false)

        return (
            <div className={s.inputField} >
                <input
                    {...props}
                    ref={ref}
                    id={id}
                    type={
                        type === 'password'
                            ? showPassword
                                ? 'text'
                                : 'password'
                            : type
                    }
                    placeholder={type === 'password' ? "••••••••" : placeholder}
                />

                <label htmlFor={id}>
                    {text}
                </label>

                {type === 'password' && (
                    <button
                        type="button"
                        className={s.showPasswordButton}
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                )}
            </div >
        )
    }
)

AuthInput.displayName = 'AuthInput'

export default AuthInput