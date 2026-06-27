import s from './InputError.module.css'

type InputErrorProps = {
    message?: string
}

export default function InputError({ message }: InputErrorProps) {
    return (
        <>
            <div className={s.messageWrapper}>
                <p>{message}</p>
            </div>
        </>
    )
}