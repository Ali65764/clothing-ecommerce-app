import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import Badge from './ui/Badge'

const ProductItem = ({ id, image, name, price, bestseller, category, sizes }) => {
  const { currency, } = useContext(ShopContext)

  return (
    <Link to={`/product/${id}`} className='group block'>
      <div className='relative aspect-[4/5] overflow-hidden rounded border border-neutral-200 bg-white shadow-sm transition-colors group-hover:border-brand-200'>
        {image && (
          <img
            src={image}
            alt={name}
            loading='lazy'
            className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        )}

        {bestseller && (
          <Badge variant='volt' className='absolute left-2 top-2'>Bestseller</Badge>
        )}

        {Array.isArray(sizes) && sizes.length > 0 && (
          <div className='pointer-events-none absolute inset-x-2 bottom-2 hidden flex-wrap items-center gap-1 sm:flex'>
            {sizes.map((s) => (
              <span key={s} className='rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-xs text-neutral-600'>
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className='mt-3 flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          {category && <p className='text-xs text-neutral-500'>{category}</p>}
          <h3 className='truncate text-sm text-neutral-800 group-hover:text-brand-500'>{name}</h3>
        </div>
        <span className='shrink-0 text-sm font-bold tabular-nums text-brand-500'>
          {currency}{price}
        </span>
      </div>
    </Link>
  )
}

export default ProductItem
