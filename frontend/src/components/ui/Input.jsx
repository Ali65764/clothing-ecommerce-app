import React from 'react'
import cx from './cx'

export const fieldClass =
  'w-full h-11 rounded border border-neutral-300 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-brand-500 focus:outline-none'

const Input = React.forwardRef(({ label, hint, className = '', wrapClassName = '', id, ...props }, ref) => {
  const fieldId = id || props.name

  return (
    <label className={cx('block', wrapClassName)} htmlFor={fieldId}>
      {label && <span className='mb-1.5 block text-sm font-semibold text-neutral-700'>{label}</span>}
      <input ref={ref} id={fieldId} className={cx(fieldClass, className)} {...props} />
      {hint && <span className='mt-1 block text-xs text-neutral-500'>{hint}</span>}
    </label>
  )
})

Input.displayName = 'Input'

export default Input
