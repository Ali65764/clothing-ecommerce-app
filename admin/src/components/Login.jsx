import React, { useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';
import { Button, Input, Logo } from './ui';
import { brand } from '../config/brand';
import { LockIcon } from './ui/Icons';

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.log(error);
            toast.error(err.message)
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center px-4 py-12'>
            <div className='w-full max-w-sm rounded border border-neutral-200 bg-white p-6 shadow-sm sm:p-8'>
                <Logo />

                <h1 className='mt-6 text-2xl font-bold text-neutral-900'>
                    {brand.name} Admin
                </h1>
                <p className='mt-1 text-sm text-neutral-600'>Sign in with your administrator credentials.</p>

                <form onSubmit={onSubmitHandler} className='mt-6'>
                    <div className='flex flex-col gap-4'>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name='email'
                            label='Email address'
                            type="email"
                            placeholder='your@email.com'
                            autoComplete='email'
                            required
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name='password'
                            label='Password'
                            type="password"
                            placeholder='Enter your password...'
                            autoComplete='current-password'
                            required
                        />
                    </div>

                    <Button type='submit' variant='primary' size='md' full className='mt-6'>
                        Login
                    </Button>
                </form>

                <p className='mt-4 flex items-center gap-1.5 text-xs text-neutral-500'>
                    <LockIcon size={13} />
                    Sessions are kept on this device only
                </p>
            </div>
        </div>
    )
}

export default Login
