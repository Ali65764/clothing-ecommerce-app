import React from 'react'
import cx from './cx'

/** Neutral loading block. Never renders data - only occupies the eventual layout. */
const Skeleton = ({ className = '' }) => (
  <div className={cx('rounded bg-neutral-200', className)} />
)

export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="aspect-[4/5] w-full" />
    <Skeleton className="h-3 w-3/4" />
    <Skeleton className="h-3 w-1/4" />
  </div>
)

export default Skeleton
