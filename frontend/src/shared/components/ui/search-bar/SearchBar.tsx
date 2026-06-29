'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { Search, X } from 'lucide-react'
import s from './SearchBar.module.css'

type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    value: string
    onClear?: () => void
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
    ({ value, onClear, ...props }, ref) => {
        return (
            <div className={s.searchBar}>
                <Search
                    size={20}
                    className={s.icon}
                />

                <input
                    {...props}
                    ref={ref}
                    type="text"
                    value={value}
                    className={s.input}
                />

                {value && (
                    <button
                        type="button"
                        onClick={onClear}
                        className={s.clearButton}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        )
    }
)

SearchBar.displayName = 'SearchBar'

export default SearchBar