import React from 'react'
import cx from './cx'

const Container = ({ as: Component = 'div', className = '', children, ...props }) => (
  <Component className={cx('mx-auto w-full max-w-6xl px-4 sm:px-6', className)} {...props}>
    {children}
  </Component>
)

export default Container
