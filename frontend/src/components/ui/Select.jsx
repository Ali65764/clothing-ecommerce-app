import React from 'react'
import cx from './cx'
import { ChevronDown } from './Icons'

/** Native <select> kept intact for accessibility; only the chrome is restyled. */
const Select = ({ label, className = '', wrapClassName = '', id, children, ...props }) => {
  const fieldId = id || props.name

  return (
    <div className={cx('relative', wrapClassName)}>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={fieldId}
          className={cx(
            'h-11 w-full cursor-pointer appearance-none rounded border border-neutral-300 bg-white pl-3 pr-9 text-sm text-neutral-900 transition-colors focus:border-brand-500 focus:outline-none',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
        />
      </div>
    </div>
  )
}

export default Select
