import s from './SubmitButton.module.css'

type Props = {
    text?: String
    isValid: boolean
    isSubmitting: boolean
}

export default function SubmitButton({ text = "Cadastrar", isValid, isSubmitting }: Props) {
    return (
        <>
            <button disabled={!isValid || isSubmitting} className={s.button} type='submit'>
                {isSubmitting ? "Carregando" : text}
            </button>
        </>
    )
}