import React from 'react'
import cx from './cx'
import { ChevronDown } from './Icons'

export const controlClass =
  'w-full rounded border border-neutral-300 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-brand-500 focus:outline-none'

export const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={cx('mb-1.5 block text-sm font-semibold text-neutral-700', className)}>
    {children}
  </label>
)

export const Input = ({ label, className = '', wrapClassName = '', id, ...props }) => {
  const fieldId = id || props.name

  return (
    <div className={wrapClassName}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <input id={fieldId} className={cx(controlClass, 'h-11', className)} {...props} />
    </div>
  )
}

export const Textarea = ({ label, className = '', wrapClassName = '', id, ...props }) => {
  const fieldId = id || props.name

  return (
    <div className={wrapClassName}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <textarea id={fieldId} className={cx(controlClass, 'min-h-[110px] resize-y py-2.5', className)} {...props} />
    </div>
  )
}

export const Select = ({ label, className = '', wrapClassName = '', id, children, ...props }) => {
  const fieldId = id || props.name

  return (
    <div className={wrapClassName}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <div className="relative">
        <select
          id={fieldId}
          className={cx(controlClass, 'h-11 cursor-pointer appearance-none pr-9', className)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500" />
      </div>
    </div>
  )
}
