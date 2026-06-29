'use client'

import s from './Select.module.css'
import {
    forwardRef,
    SelectHTMLAttributes
} from 'react'

type SelectOption = {
    value: string
    label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    text: string
    options: SelectOption[]
    error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ id, text, options, error, ...props }, ref) => {
        return (
            <div className={s.selectField}>

                <label htmlFor={id}>
                    {text}
                </label>

                <select
                    {...props}
                    ref={ref}
                    id={id}
                >
                    <option value="" disabled hidden>
                        {text}
                    </option>

                    {options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                {error && (
                    <span className={s.error}>
                        {error}
                    </span>
                )}
            </div>
        )
    }
)

Select.displayName = 'Select'

export default Select