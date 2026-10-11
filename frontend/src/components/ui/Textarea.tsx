import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
}

export default function Textarea({
  label,
  id,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <textarea
        id={id}
        className={`
          w-full
          resize-none
          rounded-lg
          border
          border-slate-300
          bg-white
          px-3
          py-2.5
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-100
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          disabled:text-slate-500
          ${className}
        `}
        {...props}
      />
    </div>
  )
}