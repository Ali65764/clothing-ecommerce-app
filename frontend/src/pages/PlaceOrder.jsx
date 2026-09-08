import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Button, Container, Input, cx } from '../components/ui'
import { LockIcon } from '../components/ui/Icons'

const PaymentOption = ({ value, method, setMethod, children }) => (
  <div
    onClick={() => setMethod(value)}
    role='radio'
    aria-checked={method === value}
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMethod(value) } }}
    className={cx(
      'flex cursor-pointer items-center gap-3 rounded border px-4 py-3',
      method === value ? 'border-brand-500 bg-brand-50' : 'border-neutral-300 bg-white hover:border-neutral-400'
    )}
  >
    <span
      className={cx(
        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
        method === value ? 'border-brand-500' : 'border-neutral-400'
      )}
    >
      {method === value && <span className='h-2 w-2 rounded-full bg-brand-500' />}
    </span>
    {children}
  </div>
)

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value

    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate("/orders")
          } else {
            toast.error(response.data.message)
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err.message)
      toast.error(err.message, { autoClose: 1500 })
    }
  }

  return (
    <Container className='py-10'>
      <header className='border-b border-neutral-200 pb-6'>
        <p className='flex items-center gap-2 text-sm font-semibold text-brand-500'><span className='h-0.5 w-6 bg-brand-200' />Checkout</p>
        <h1 className='mt-1 text-3xl font-bold text-neutral-900 sm:text-4xl'>Complete your order</h1>
      </header>

      <form onSubmit={onSubmitHandler} className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]'>

       
        <div className='flex min-w-0 flex-col gap-6'>
          <div className='rounded border border-neutral-200 bg-white shadow-sm p-5 sm:p-6'>
            <h2 className='font-semibold text-neutral-900'>1. Delivery information</h2>

            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <Input required onChange={onChangeHandler} name="firstName" value={formData.firstName} label='First name' type="text" placeholder='First name' autoComplete='given-name' />
              <Input required onChange={onChangeHandler} name="lastName" value={formData.lastName} label='Last name' type="text" placeholder='Last name' autoComplete='family-name' />
              <Input required onChange={onChangeHandler} name="email" value={formData.email} label='Email address' type="email" placeholder='Email address' autoComplete='email' wrapClassName='sm:col-span-2' />
              <Input required onChange={onChangeHandler} name="street" value={formData.street} label='Street' type="text" placeholder='Street' autoComplete='street-address' wrapClassName='sm:col-span-2' />
              <Input required onChange={onChangeHandler} name="city" value={formData.city} label='City' type="text" placeholder='City' autoComplete='address-level2' />
              <Input required onChange={onChangeHandler} name="state" value={formData.state} label='State' type="text" placeholder='State' autoComplete='address-level1' />
              <Input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} label='Zipcode' type="number" placeholder='Zipcode' autoComplete='postal-code' />
              <Input required onChange={onChangeHandler} name="country" value={formData.country} label='Country' type="text" placeholder='Country' autoComplete='country-name' />
              <Input required onChange={onChangeHandler} name="phone" value={formData.phone} label='Phone' type="number" placeholder='Phone' autoComplete='tel' wrapClassName='sm:col-span-2' />
            </div>
          </div>

          <div className='rounded border border-neutral-200 bg-white shadow-sm p-5 sm:p-6'>
            <h2 className='font-semibold text-neutral-900'>2. Payment method</h2>

            <div className='mt-5 flex flex-col gap-2' role='radiogroup' aria-label='Payment method'>
              <PaymentOption value='stripe' method={method} setMethod={setMethod}>
                <img src={assets.stripe_logo} alt="Stripe" className='h-5' />
                <span className='ml-auto text-xs text-neutral-500'>Pay securely by card</span>
              </PaymentOption>

              <PaymentOption value='cod' method={method} setMethod={setMethod}>
                <span className='text-sm text-neutral-900'>Cash on delivery</span>
                <span className='ml-auto text-xs text-neutral-500'>Pay when it arrives</span>
              </PaymentOption>
            </div>
          </div>
        </div>

  
        <aside>
          <div className='rounded border border-neutral-200 bg-white shadow-sm p-5'>
            <CartTotal />

            <Button type='submit' size='md' variant='primary' full className='mt-5'>
              Place order
            </Button>

            <p className='mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-500'>
              <LockIcon size={13} />
              Encrypted and secure
            </p>
          </div>
        </aside>
      </form>
    </Container>
  )
}

export default PlaceOrder
