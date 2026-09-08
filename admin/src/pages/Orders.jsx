import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
  Badge, Card, EmptyState, PageHeader, Select, Skeleton, StatCard, cx,
} from '../components/ui'
import { PackageIcon, PinIcon, TrendIcon, WalletIcon } from '../components/ui/Icons'


const statusTone = (status = '') => {
  const key = status.toLowerCase().replace(/\s+/g, '')
  if (key === 'delivered') return 'mint'
  if (key === 'shipped' || key === 'outfordelivery') return 'softVolt'
  return 'neutral'
}

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.get(backendUrl + '/api/order', { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message)
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.put(backendUrl + '/api/order/' + orderId + '/status', { status: e.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])


  const revenue = orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0)
  const delivered = orders.filter((order) => String(order.status).toLowerCase().replace(/\s+/g, '') === 'delivered').length

  return (
    <>
      <PageHeader
        eyebrow='Fulfilment'
        title='Orders'
        description='Every order placed through the storefront, newest first.'
      />

      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard label='Total orders' value={loading ? '—' : orders.length} icon={<PackageIcon size={18} />} />
        <StatCard label='Delivered' value={loading ? '—' : delivered} icon={<TrendIcon size={18} />} />
        <StatCard label='Order value' value={loading ? '—' : `${currency}${revenue}`} icon={<WalletIcon size={18} />} />
      </div>

      {loading ? (
        <div className='mt-6 flex flex-col gap-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className='p-5'>
              <Skeleton className='h-3 w-1/3' />
              <Skeleton className='mt-4 h-3 w-1/2' />
              <Skeleton className='mt-4 h-3 w-1/4' />
            </Card>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <Card className='mt-6'>
          <EmptyState
            icon={<PackageIcon size={22} />}
            title='No orders yet'
            description='Orders placed on the storefront will appear here for fulfilment.'
          />
        </Card>
      ) : (
        <div className='mt-6 flex flex-col gap-4'>
          {orders.map((order, index) => (
            <Card key={index} className='p-4 sm:p-5'>
              <div className='grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr_auto] lg:gap-8'>

         
                <div className='flex min-w-0 gap-4'>
                  <span className='mt-0.5 shrink-0 text-neutral-400'>
                    <PackageIcon size={20} />
                  </span>

                  <div className='min-w-0'>
                    <ul className='flex flex-col gap-1'>
                      {order.items.map((item, i) => (
                        <li key={i} className='text-sm text-neutral-800'>
                          {item.name} <span className='text-neutral-500'>x {item.quantity}</span>{' '}
                          <span className='text-neutral-500'>{item.size}</span>
                        </li>
                      ))}
                    </ul>

                    <p className='mt-3 text-sm font-semibold text-neutral-900'>
                      {order.address.firstName + " " + order.address.lastName}
                    </p>

                    <div className='mt-1.5 flex gap-2 text-xs leading-relaxed text-neutral-500'>
                      <PinIcon size={14} className='mt-0.5 shrink-0 text-neutral-400' />
                      <span>
                        {order.address.street + ","}
                        <br />
                        {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                        <br />
                        {order.address.phone}
                      </span>
                    </div>
                  </div>
                </div>

          
                <dl className='flex flex-col gap-2 border-t border-neutral-200 pt-4 text-sm lg:border-0 lg:pt-0'>
                  <div className='flex justify-between gap-4'>
                    <dt className='text-neutral-500'>Items</dt>
                    <dd className='text-neutral-800'>{order.items.length}</dd>
                  </div>
                  <div className='flex justify-between gap-4'>
                    <dt className='text-neutral-500'>Method</dt>
                    <dd className='text-neutral-800'>{order.paymentMethod}</dd>
                  </div>
                  <div className='flex items-center justify-between gap-4'>
                    <dt className='text-neutral-500'>Payment</dt>
                    <dd>
                      <Badge variant={order.payment ? 'mint' : 'neutral'}>
                        {order.payment ? "Done" : "Pending"}
                      </Badge>
                    </dd>
                  </div>
                  <div className='flex justify-between gap-4'>
                    <dt className='text-neutral-500'>Date</dt>
                    <dd className='text-neutral-800'>{new Date(order.date).toLocaleDateString()}</dd>
                  </div>
                </dl>

               
                <div className='flex flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-4 lg:w-48 lg:flex-col lg:items-stretch lg:border-0 lg:pt-0'>
                  <div className='lg:text-right'>
                    <p className='text-sm text-neutral-500'>Amount</p>
                    <p className='mt-1 text-xl font-bold tabular-nums text-neutral-900'>
                      {currency}{order.amount}
                    </p>
                  </div>

                  <div className='w-44 lg:w-full'>
                    <Select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      aria-label='Order status'
                      className={cx(
                        statusTone(order.status) === 'mint' && 'border-green-400 text-green-800',
                        statusTone(order.status) === 'softVolt' && 'border-brand-200 text-brand-700'
                      )}
                    >
                      <option value="OrderPlaced">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}

export default Orders
