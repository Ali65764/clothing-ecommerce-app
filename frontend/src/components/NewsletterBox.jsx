import React from 'react'
import Button from './ui/Button'
import Container from './ui/Container'

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <section className='pb-14'>
      <Container>
        <div className='rounded bg-brand-500 px-6 py-12 text-center sm:px-12'>
          <h2 className='text-2xl font-bold text-white sm:text-3xl'>
            Subscribe now &amp; get 20% off
          </h2>

          <p className='mx-auto mt-3 max-w-md text-brand-200'>
            Be first to hear about new arrivals, restocks and seasonal edits.
            No noise &mdash; just the good stuff.
          </p>

          <form
            onSubmit={onSubmitHandler}
            className='mx-auto mt-7 flex w-full max-w-md flex-col gap-2 sm:flex-row'
          >
            <label htmlFor='newsletter-email' className='sr-only'>Email address</label>
            <input
              id='newsletter-email'
              type='email'
              placeholder='Enter your email'
              required
              className='h-11 w-full rounded border border-transparent bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-200 focus:outline-none sm:flex-1'
            />
            <Button type='submit' size='md' variant='accent'>
              Subscribe
            </Button>
          </form>

          <p className='mt-4 text-xs text-brand-200'>Unsubscribe at any time.</p>
        </div>
      </Container>
    </section>
  )
}

export default NewsletterBox
