import React from 'react'
import cx from './cx'

const base =
  'inline-flex items-center justify-center gap-2 rounded border font-semibold transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'border-brand-500 bg-brand-500 text-white shadow-sm hover:bg-brand-600 hover:border-brand-600',
  light: 'border-neutral-900 bg-neutral-900 text-white shadow-sm hover:bg-neutral-800',
  accent: 'border-brand-200 bg-brand-200 text-brand-700 shadow-sm hover:bg-brand-100',
  outline: 'border-neutral-300 bg-white text-neutral-900 hover:border-brand-500 hover:text-brand-500',
  surface: 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100',
  ghost: 'border-transparent text-neutral-600 hover:text-brand-500',
  danger: 'border-red-700 bg-red-700 text-white shadow-sm hover:bg-red-800',
  dangerQuiet: 'border-neutral-300 bg-white text-red-700 hover:bg-red-50',
}

const sizes = {
  xs: 'h-8 px-3 text-xs',
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
}

/**
 * `as` lets the same visual button render as a react-router <Link> or an <a>
 * without duplicating the class list at every call site.
 */
const Button = ({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  full = false,
  className = '',
  children,
  ...props
}) => (
  <Component
    className={cx(base, variants[variant], sizes[size], full && 'w-full', className)}
    {...props}
  >
    {children}
  </Component>
)

export default Button
