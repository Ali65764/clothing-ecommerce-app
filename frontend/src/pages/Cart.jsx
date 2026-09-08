import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import CartTotal from '../components/CartTotal'
import { Button, Container, EmptyState } from '../components/ui'
import { ArrowLeft, BagIcon, LockIcon, MinusIcon, PlusIcon, TrashIcon } from '../components/ui/Icons'
import cdn from '../utils/cdn'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <Container className='py-10'>
      <header className='flex flex-col gap-2 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='flex items-center gap-2 text-sm font-semibold text-brand-500'><span className='h-0.5 w-6 bg-brand-200' />Your bag</p>
          <h1 className='mt-1 text-3xl font-bold text-neutral-900 sm:text-4xl'>Shopping cart</h1>
        </div>
        <p className='text-sm text-neutral-500'>
          {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
        </p>
      </header>

      {cartData.length === 0 ? (
        <EmptyState
          icon={<BagIcon size={24} />}
          title='Your cart is empty'
          description='Once you add pieces to your bag they will show up here, ready for checkout.'
          action={<Button as={Link} to='/collection' variant='primary' size='md'>Browse the collection</Button>}
          className='mt-6 rounded border border-neutral-200 bg-white shadow-sm'
        />
      ) : (
        <div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]'>

          <div className='min-w-0'>
            <div className='rounded border border-neutral-200 bg-white shadow-sm'>
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id)
                console.log(productData)
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className='flex gap-4 border-b border-neutral-200 p-4 last:border-b-0'
                  >
                    <Link
                      to={`/product/${item._id}`}
                      className='aspect-square w-20 shrink-0 overflow-hidden rounded border border-neutral-200'
                    >
                      <img src={cdn(productData?.image, 200)} alt={productData.name} loading='lazy' className='h-full w-full object-cover' />
                    </Link>

                    <div className='flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                      <div className='min-w-0'>
                        <Link to={`/product/${item._id}`}>
                          <h3 className='truncate text-sm text-neutral-900 hover:text-brand-500'>
                            {productData.name}
                          </h3>
                        </Link>

                        <div className='mt-1 flex flex-wrap items-center gap-3 text-sm text-neutral-500'>
                          <span>{currency}{productData.price}</span>
                          <span>Size {item.size}</span>
                        </div>

                        <div className='mt-3 flex items-center gap-3'>
                          <div className='flex items-center rounded border border-neutral-300'>
                            <button
                              type='button'
                              aria-label='Decrease quantity'
                              disabled={item.quantity <= 1}
                              onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                              className='flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30'
                            >
                              <MinusIcon size={14} />
                            </button>
                            <input
                              key={`${item._id}-${item.size}-${item.quantity}`}
                              onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                              className='h-8 w-10 border-x border-neutral-300 bg-transparent text-center text-sm tabular-nums text-neutral-900 outline-none'
                              type="number"
                              min={1}
                              aria-label='Quantity'
                              defaultValue={item.quantity}
                            />
                            <button
                              type='button'
                              aria-label='Increase quantity'
                              onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                              className='flex h-8 w-8 items-center justify-center text-neutral-600 hover:bg-neutral-100'
                            >
                              <PlusIcon size={14} />
                            </button>
                          </div>

                          <button
                            type='button'
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            aria-label={`Remove ${productData.name} from cart`}
                            className='text-neutral-400 hover:text-red-700'
                          >
                            <TrashIcon size={17} />
                          </button>
                        </div>
                      </div>

                      <p className='shrink-0 font-semibold tabular-nums text-neutral-900 sm:text-right'>
                        {currency}{productData.price * item.quantity}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              to='/collection'
              className='mt-4 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900'
            >
              <ArrowLeft size={16} />
              Continue shopping
            </Link>
          </div>

          <aside>
            <div className='rounded border border-neutral-200 bg-white shadow-sm p-5'>
              <CartTotal />
              <Button
                onClick={() => navigate('/place-order')}
                size='md'
                variant='primary'
                full
                className='mt-5'
              >
                Proceed to checkout
              </Button>
              <p className='mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-500'>
                <LockIcon size={13} />
                Secure checkout
              </p>
            </div>
          </aside>
        </div>
      )}
    </Container>
  )
}

export default Cart
