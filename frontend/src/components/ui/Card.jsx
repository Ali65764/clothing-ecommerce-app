import React from 'react'
import cx from './cx'

const Card = ({ className = '', children, ...props }) => (
  <div className={cx('rounded border border-neutral-200 bg-white shadow-sm', className)} {...props}>
    {children}
  </div>
)

export default Card
