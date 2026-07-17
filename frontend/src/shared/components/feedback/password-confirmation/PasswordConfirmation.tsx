import { Eye, EyeOff, UserCheck } from 'lucide-react'
import s from './PasswordConfirmation.module.css'
import { InputHTMLAttributes, useState } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
    message: string
    onCancel: () => void
    onConfirm: (currentPassrod: string) => void
    loading: boolean
}

export default function PasswordConfirmation({ id, message, onCancel, onConfirm, loading }: Props) {

    const [showPassword, setShowPassword] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")

    return (
        <>
            <div className={s.bodyWrapper}>
                <div className={s.mainWrapper}>
                    <UserCheck />
                    <p>{message}</p>

                    <div className={s.inputField} >
                        <input
                            id={id}
                            type={showPassword ? "text" : "password"}
                            placeholder={'••••••••'}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <label htmlFor={id}>
                            Senha atual
                        </label>

                        <button
                            type="button"
                            className={s.showPasswordButton}
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                    </div >

                    <div className={s.actionWrapper}>
                        <button type='button' onClick={onCancel}>Cancelar</button>
                        <button type='button' onClick={() => onConfirm(currentPassword)}>{loading ? "Carregando" : "Confirmar"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}