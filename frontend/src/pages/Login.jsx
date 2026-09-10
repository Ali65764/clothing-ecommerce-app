import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Container, Input } from '../components/ui';
import { LockIcon } from '../components/ui/Icons';

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          toast.success("Account created, please sign in",{autoClose:1500})
          setCurrentState("Login")
          setName("")
          setEmail("")
          setPassword("")
        } else {
          toast.error(response.data.message, { autoClose: 1500 })
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        } else {
          toast.error(response.data.message, { autoClose: 1500 });
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }

  const isSignUp = currentState === "Sign Up"

  return (
    <Container className='min-h-screen flex items-center justify-center'>
      <form onSubmit={onSubmitHandler} className='mx-auto w-full max-w-sm rounded border border-neutral-200 bg-white shadow-sm p-6 sm:p-8'>
        <h1 className='text-2xl font-bold text-neutral-900'>{currentState}</h1>
        <p className='mt-1 text-sm text-neutral-600'>
          {isSignUp
            ? 'Create your account in a few seconds.'
            : 'Sign in to continue to your account.'}
        </p>

        <div className='mt-6 flex flex-col gap-4'>
          {currentState === "Login" ? '' : (
            <Input
              type="text"
              name='name'
              label='Name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Your full name'
              autoComplete='name'
              required
            />
          )}
          <Input
            type="email"
            name='email'
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='you@example.com'
            autoComplete='email'
            required
          />
          <Input
            type="password"
            name='password'
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Enter your password'
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            required
          />
        </div>

        <div className='mt-4 flex items-center justify-between text-sm'>
          <p className='cursor-pointer text-neutral-500 hover:text-neutral-900'>Forgot your password?</p>
          {
            currentState === "Login"
              ? <p onClick={() => setCurrentState("Sign Up")} className='cursor-pointer text-brand-500 hover:text-brand-600'>Create account</p>
              : <p onClick={() => setCurrentState("Login")} className='cursor-pointer text-brand-500 hover:text-brand-600'>Login Here</p>
          }
        </div>

        <Button type='submit' size='md' variant='primary' full className='mt-6'>
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </Button>

        <p className='mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-500'>
          <LockIcon size={13} />
          Your connection to this store is encrypted
        </p>
      </form>
    </Container>
  )
}

export default Login
