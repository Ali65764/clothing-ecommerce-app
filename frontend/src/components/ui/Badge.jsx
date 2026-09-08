import React from 'react'
import cx from './cx'

const variants = {
  neutral: 'border-neutral-300 bg-neutral-100 text-neutral-700',
  volt: 'border-brand-500 bg-brand-500 text-white',
  softVolt: 'border-brand-200 bg-brand-50 text-brand-500',
  mint: 'border-green-300 bg-green-50 text-green-800',
  iris: 'border-neutral-300 bg-neutral-100 text-neutral-700',
  ember: 'border-red-300 bg-red-50 text-red-800',
  solid: 'border-neutral-900 bg-neutral-900 text-white',
  outline: 'border-neutral-300 bg-white text-neutral-600',
}

const Badge = ({ variant = 'neutral', className = '', children, ...props }) => (
  <span
    className={cx(
      'inline-flex items-center gap-1.5 whitespace-nowrap rounded border px-2 py-0.5 text-xs font-semibold',
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </span>
)

export default Badge
