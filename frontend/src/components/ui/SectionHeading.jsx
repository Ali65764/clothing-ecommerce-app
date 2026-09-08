import React from 'react'
import cx from './cx'

/**
 * Section header: a small label over the section title, with an optional
 * trailing slot for controls (sort, "view all", etc).
 */
const SectionHeading = ({ eyebrow, title, description, action, align = 'left', className = '' }) => {
  const centered = align === 'center'

  return (
    <div
      className={cx(
        'flex w-full gap-4 border-b border-neutral-200 pb-6',
        centered
          ? 'flex-col items-center text-center'
          : 'flex-col items-start sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className={cx('max-w-2xl', centered && 'flex flex-col items-center')}>
        {eyebrow && (
          <span className='flex items-center gap-2 text-sm font-semibold text-brand-500'>
            <span className='h-0.5 w-6 bg-brand-200' />
            {eyebrow}
          </span>
        )}
        <h2 className='mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl'>{title}</h2>
        {description && (
          <p className={cx('mt-2 text-neutral-600', centered ? 'max-w-xl' : 'max-w-lg')}>
            {description}
          </p>
        )}
      </div>
      {action && <div className='shrink-0'>{action}</div>}
    </div>
  )
}

export default SectionHeading
