import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Button, Container } from './ui'
import { ArrowUpRight, RefreshIcon, ShieldIcon, TruckIcon } from './ui/Icons'

const highlights = [
  { Icon: RefreshIcon, k: 'Returns', v: '7 days' },
  { Icon: TruckIcon, k: 'Support', v: '24/7' },
  { Icon: ShieldIcon, k: 'Exchange', v: 'Free' },
]

const Hero = () => {
  return (
    <>
      <section className='border-b border-neutral-200 bg-brand-50'>
        <Container className='py-14 lg:py-20'>
          <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>

            <div>
              <p className='flex items-center gap-2 text-sm font-semibold text-brand-500'>
                <span className='h-0.5 w-6 bg-brand-200' />
                New season drop
              </p>

              <h1 className='mt-4 text-4xl font-bold leading-tight text-brand-500 sm:text-5xl lg:text-6xl'>
                Built to be worn out.
              </h1>

              <p className='mt-5 max-w-md text-lg text-neutral-600'>
                Essentials cut from quality fabric, made to outlast the season.
                No seasonal churn, no filler &mdash; just the pieces you actually reach for.
              </p>

              <div className='mt-8 flex flex-wrap items-center gap-3'>
                <Button as={Link} to='/collection' size='lg' variant='primary'>
                  Shop the collection
                  <ArrowUpRight size={18} />
                </Button>
                <Button as={Link} to='/about' size='lg' variant='outline'>
                  Our story
                </Button>
              </div>
            </div>

            <div className='overflow-hidden rounded border border-neutral-200 bg-white shadow-sm'>
              <img
                src={assets.ecommerce}
                alt='New season collection'
                className='aspect-[4/3] w-full object-cover object-top lg:aspect-[4/5]'
              />
            </div>
          </div>
        </Container>
      </section>

      <div className='border-b border-neutral-200 bg-white'>
        <Container>
          <dl className='grid grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
            {highlights.map(({ Icon, k, v }) => (
              <div key={k} className='flex items-center gap-3 py-5 sm:justify-center'>
                <span className='flex h-10 w-10 items-center justify-center rounded bg-brand-50 text-brand-500'>
                  <Icon size={20} />
                </span>
                <div>
                  <dt className='text-sm text-neutral-500'>{k}</dt>
                  <dd className='font-semibold text-neutral-900'>{v}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </>
  )
}

export default Hero
