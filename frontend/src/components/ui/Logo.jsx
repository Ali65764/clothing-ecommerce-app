import React from 'react'
import cx from './cx'
import { brand } from '../../config/brand'

const sizes = {
  sm: { text: 'text-base', mark: 18 },
  md: { text: 'text-lg', mark: 20 },
  lg: { text: 'text-xl', mark: 24 },
}

/** Wordmark with a small square mark. `tone='light'` is for dark backgrounds. */
const Logo = ({ className = '', size = 'md', markOnly = false, tone = 'dark' }) => {
  const s = sizes[size] || sizes.md
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

export default Logo
