import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()

  return (
    <div className='w-full'>
      <p className='font-semibold text-neutral-900'>Order summary</p>

      <dl className='mt-4 flex flex-col gap-3'>
        <div className='flex items-center justify-between text-sm'>
          <dt className='text-neutral-600'>Subtotal</dt>
          <dd className='tabular-nums text-neutral-900'>{currency} {subtotal}.00</dd>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <dt className='text-neutral-600'>Shipping fee</dt>
          <dd className='tabular-nums text-neutral-900'>{currency} {delivery_fee}.00</dd>
        </div>

        <div className='flex items-center justify-between border-t border-neutral-200 pt-3'>
          <dt className='font-semibold text-neutral-900'>Total</dt>
          <dd className='text-lg font-bold tabular-nums text-brand-500'>
            {currency} {subtotal === 0 ? 0 : subtotal + delivery_fee}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default CartTotal
