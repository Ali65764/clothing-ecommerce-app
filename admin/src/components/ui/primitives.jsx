import React from 'react'
import cx from './cx'
import { brand } from '../../config/brand'

/* ------------------------------------------------------------------ Button */

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded border font-semibold transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none'

const buttonVariants = {
  primary: 'border-brand-500 bg-brand-500 text-white shadow-sm hover:bg-brand-600 hover:border-brand-600',
  light: 'border-neutral-900 bg-neutral-900 text-white shadow-sm hover:bg-neutral-800',
  accent: 'border-brand-200 bg-brand-200 text-brand-700 shadow-sm hover:bg-brand-100',
  outline: 'border-neutral-300 bg-white text-neutral-900 hover:border-brand-500 hover:text-brand-500',
  surface: 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100',
  ghost: 'border-transparent text-neutral-600 hover:text-brand-500',
  danger: 'border-red-700 bg-red-700 text-white shadow-sm hover:bg-red-800',
  dangerQuiet: 'border-neutral-300 bg-white text-red-700 hover:bg-red-50',
}

const buttonSizes = {
  xs: 'h-8 px-3 text-xs',
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
}

export const Button = ({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  full = false,
  className = '',
  children,
  ...props
}) => (
  <Component
    className={cx(buttonBase, buttonVariants[variant], buttonSizes[size], full && 'w-full', className)}
    {...props}
  >
    {children}
  </Component>
)

/* ------------------------------------------------------------------- Badge */

const badgeVariants = {
  neutral: 'border-neutral-300 bg-neutral-100 text-neutral-700',
  volt: 'border-brand-500 bg-brand-500 text-white',
  softVolt: 'border-brand-200 bg-brand-50 text-brand-500',
  mint: 'border-green-300 bg-green-50 text-green-800',
  iris: 'border-neutral-300 bg-neutral-100 text-neutral-700',
  ember: 'border-red-300 bg-red-50 text-red-800',
  solid: 'border-neutral-900 bg-neutral-900 text-white',
  outline: 'border-neutral-300 bg-white text-neutral-600',
}

export const Badge = ({ variant = 'neutral', className = '', children, ...props }) => (
  <span
    className={cx(
      'inline-flex items-center gap-1.5 whitespace-nowrap rounded border px-2 py-0.5 text-xs font-semibold',
      badgeVariants[variant],
      className
    )}
    {...props}
  >
    {children}
  </span>
)

/* -------------------------------------------------------------------- Card */

export const Card = ({ className = '', children, ...props }) => (
  <div className={cx('rounded border border-neutral-200 bg-white shadow-sm', className)} {...props}>
    {children}
  </div>
)

/* -------------------------------------------------------------- EmptyState */

export const EmptyState = ({ icon, title, description, action, className = '' }) => (
  <div className={cx('flex flex-col items-center justify-center px-6 py-14 text-center', className)}>
    {icon && (
      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-500'>
        {icon}
      </div>
    )}
    <h3 className='font-semibold text-neutral-900'>{title}</h3>
    {description && <p className='mt-2 max-w-sm text-sm text-neutral-500'>{description}</p>}
    {action && <div className='mt-5'>{action}</div>}
  </div>
)

/* -------------------------------------------------------------------- Logo */

const logoSizes = {
  sm: { text: 'text-base', mark: 18 },
  md: { text: 'text-lg', mark: 20 },
  lg: { text: 'text-xl', mark: 24 },
}

export const Logo = ({ className = '', size = 'md', markOnly = false, tone = 'dark' }) => {
  const s = logoSizes[size] || logoSizes.md
  const light = tone === 'light'

  const mark = (
    <svg width={s.mark} height={s.mark} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="22" height="22" rx="3" className={light ? 'fill-white' : 'fill-brand-500'} />
      <path d="M6 7h3l3 8 3-8h3l-4.5 11h-3L6 7Z" className={light ? 'fill-brand-500' : 'fill-white'} />
    </svg>
  )

  if (markOnly) return mark

  return (
    <span className={cx('inline-flex items-center gap-2', light && 'text-white', className)}>
      {mark}
      <span className={cx('font-bold leading-none', s.text)}>{brand.wordmark}</span>
    </span>
  )
}

/* ---------------------------------------------------------------- Skeleton */

export const Skeleton = ({ className = '' }) => (
  <div className={cx('rounded bg-neutral-200', className)} />
)

/* -------------------------------------------------------------- PageHeader */

export const PageHeader = ({ eyebrow, title, description, action }) => (
  <div className="flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow && (
        <span className="flex items-center gap-2 text-sm font-semibold text-brand-500">
          <span className="h-0.5 w-6 bg-brand-200" />
          {eyebrow}
        </span>
      )}
      <h1 className="mt-2 text-2xl font-bold text-neutral-900">{title}</h1>
      {description && <p className="mt-1 max-w-xl text-sm text-neutral-500">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
)

/* ---------------------------------------------------------------- StatCard */

/** Small metric tile. Values are always derived from data already fetched. */
export const StatCard = ({ label, value, icon }) => (
  <div className="flex items-center justify-between gap-4 rounded border border-neutral-200 bg-white px-5 py-4 shadow-sm">
    <div>
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-brand-500">{value}</p>
    </div>
    {icon && (
      <span className="flex h-10 w-10 items-center justify-center rounded bg-brand-50 text-brand-500">
        {icon}
      </span>
    )}
  </div>
)
