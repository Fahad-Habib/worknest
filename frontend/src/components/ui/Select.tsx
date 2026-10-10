import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'

type Option = {
  label: string
  value: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: Option[]
}

export default function Select({
  label,
  options,
  id,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          className={`
            w-full
            appearance-none
            rounded-lg
            border
            border-slate-300
            bg-white
            px-3
            py-2.5
            pr-10
            text-slate-900
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-100
            ${className}
          `}
          {...props}
        >
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />
      </div>
    </div>
  )
}