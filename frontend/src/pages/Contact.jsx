import React from 'react'
import { assets } from '../assets/assets.js'
import NewsletterBox from '../components/NewsletterBox.jsx'
import { Button, Container } from '../components/ui'
import { brand } from '../config/brand'
import { MailIcon, PhoneIcon, PinIcon } from '../components/ui/Icons'

const Contact = () => {
  const details = [
    {
      Icon: PinIcon,
      label: 'Our store',
      lines: ['Baku, Azerbaijan', 'Xirdalan, Azerbaijan'],
    },
    {
      Icon: PhoneIcon,
      label: 'Telephone',
      lines: ['(415) 555-0132'],
    },
    {
      Icon: MailIcon,
      label: 'Email',
      lines: [brand.email],
    },
  ]

  return (
    <div>
      <Container className='py-10'>
        <header className='border-b border-neutral-200 pb-6'>
          <p className='flex items-center gap-2 text-sm font-semibold text-brand-500'><span className='h-0.5 w-6 bg-brand-200' />Contact us</p>
          <h1 className='mt-1 max-w-2xl text-3xl font-bold text-neutral-900 sm:text-4xl'>
            We&apos;d love to hear from you.
          </h1>
        </header>

        <div className='mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12'>
          <div className='aspect-[4/3] overflow-hidden rounded border border-neutral-200 bg-white shadow-sm'>
            <img src={assets.contact} alt='Our store' className='h-full w-full object-cover' />
          </div>

          <div className='flex flex-col justify-center'>
            <div className='flex flex-col gap-5'>
              {details.map(({ Icon, label, lines }) => (
                <div key={label} className='flex gap-3'>
                  <Icon size={18} className='mt-0.5 shrink-0 text-neutral-400' />
                  <div>
                    <p className='text-sm font-semibold text-neutral-900'>{label}</p>
                    <div className='mt-1 text-sm text-neutral-600'>
                      {lines.map((l) => <p key={l}>{l}</p>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-8 border-t border-neutral-200 pt-6'>
              <h2 className='text-lg font-semibold text-neutral-900'>
                Careers at {brand.name}
              </h2>
              <p className='mt-2 max-w-md text-sm text-neutral-600'>
                Learn more about our teams and job openings.
              </p>
              <Button variant='outline' size='md' className='mt-4'>
                Explore jobs
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <div className='pt-6'>
        <NewsletterBox />
      </div>
    </div>
  )
}

export default Contact
