'use client'

import s from './Input.module.css'
import { Eye, EyeOff } from 'lucide-react'
import {
    forwardRef,
    InputHTMLAttributes,
    useState
} from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    text: string
    error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type, id, text, placeholder, error, ...props }, ref) => {

        const [showPassword, setShowPassword] = useState(false)

        return (
            <div className={s.inputField}>

                <label htmlFor={id}>
                    {text}
                </label>

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
                    placeholder={placeholder}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        className={s.showPasswordButton}
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                )}
            </div>
        )
    }
)

Input.displayName = 'AuthInput'

export default Input