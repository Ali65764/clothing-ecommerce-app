import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Container from '../components/ui/Container'

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success');
    const orderId = searchParams.get("orderId");

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendUrl + '/api/order/stripe/verify', { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItems({})
                navigate("/orders")
            } else {
                navigate("/cart")
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || err.message, { autoClose: 1500 })
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <Container className='flex min-h-[60vh] flex-col items-center justify-center py-20 text-center'>
            <span className='h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-brand-500' />
            <h1 className='mt-6 text-2xl font-bold text-neutral-900'>
                Confirming your payment
            </h1>
            <p className='mt-2 max-w-sm text-sm text-neutral-600'>
                Hold tight while we verify the transaction. You will be redirected automatically.
            </p>
        </Container>
    )
}

export default Verify
