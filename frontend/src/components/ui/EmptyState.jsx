import React from 'react'
import cx from './cx'

const EmptyState = ({ icon, title, description, action, className = '' }) => (
  <div className={cx('flex flex-col items-center justify-center px-6 py-16 text-center', className)}>
    {icon && (
      <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500'>
        {icon}
      </div>
    )}
    <h3 className='text-lg font-semibold text-neutral-900'>{title}</h3>
    {description && <p className='mt-2 max-w-sm text-sm text-neutral-500'>{description}</p>}
    {action && <div className='mt-6'>{action}</div>}
  </div>
)

export default EmptyState
