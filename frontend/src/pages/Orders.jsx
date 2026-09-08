import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { Badge, Button, Container, EmptyState } from '../components/ui'
import { PackageIcon, RefreshIcon, UserIcon } from '../components/ui/Icons'
import cdn from '../utils/cdn'


const statusTone = (status = '') => {
  const key = status.toLowerCase().replace(/\s+/g, '')
  if (key === 'delivered') return 'mint'
  if (key === 'shipped' || key === 'outfordelivery') return 'softVolt'
  return 'neutral'
}

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.get(backendUrl + '/api/order/user', { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (err) {

    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <Container className='py-10'>
      <header className='flex flex-col gap-3 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='flex items-center gap-2 text-sm font-semibold text-brand-500'><span className='h-0.5 w-6 bg-brand-200' />Your account</p>
          <h1 className='mt-1 text-3xl font-bold text-neutral-900 sm:text-4xl'>My orders</h1>
        </div>
        {orderData.length > 0 && (
          <Button onClick={loadOrderData} variant='outline' size='sm'>
            <RefreshIcon size={15} />
            Refresh
          </Button>
        )}
      </header>

      {!token ? (
        <EmptyState
          icon={<UserIcon size={24} />}
          title='Sign in to view your orders'
          description='Your order history lives in your account. Sign in to track deliveries and review past purchases.'
          action={<Button as={Link} to='/login' variant='primary' size='md'>Sign in</Button>}
          className='mt-6 rounded border border-neutral-200 bg-white shadow-sm'
        />
      ) : orderData.length === 0 ? (
        <EmptyState
          icon={<PackageIcon size={24} />}
          title='No orders yet'
          description='When you place an order it will appear here, along with its delivery status.'
          action={<Button as={Link} to='/collection' variant='primary' size='md'>Start shopping</Button>}
          className='mt-6 rounded border border-neutral-200 bg-white shadow-sm'
        />
      ) : (
        <div className='mt-6 rounded border border-neutral-200 bg-white shadow-sm'>
          {orderData.map((item, index) => (
            <article
              key={index}
              className='border-b border-neutral-200 p-4 last:border-b-0 sm:p-5'
            >
              <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>

                <div className='flex min-w-0 items-start gap-4'>
                  <div className='aspect-square w-16 shrink-0 overflow-hidden rounded border border-neutral-200'>
                    <img src={cdn(item.image, 160)} alt={item.name} loading='lazy' className='h-full w-full object-cover' />
                  </div>

                  <div className='min-w-0'>
                    <h2 className='text-sm font-semibold text-neutral-900'>{item.name}</h2>

                    <div className='mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600'>
                      <span>{currency}{item.price}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Size: {item.size}</span>
                    </div>

                    <dl className='mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-neutral-500'>
                      <div className='flex gap-1'>
                        <dt>Date:</dt>
                        <dd>{new Date(item.date).toDateString()}</dd>
                      </div>
                      <div className='flex gap-1'>
                        <dt>Payment:</dt>
                        <dd>{item.paymentMethod}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className='flex items-center justify-between gap-4 lg:shrink-0'>
                  <Badge variant={statusTone(item.status)}>{item.status}</Badge>

                  <Button onClick={loadOrderData} variant='outline' size='sm'>
                    Track order
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Container>
  )
}

export default Orders
