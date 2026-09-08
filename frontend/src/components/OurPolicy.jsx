import React from 'react'
import Container from './ui/Container'
import { HeadsetIcon, RefreshIcon, ShieldIcon } from './ui/Icons'

const policies = [
  {
    Icon: RefreshIcon,
    title: 'Easy exchange policy',
    copy: 'We offer a hassle free exchange policy on every order.',
  },
  {
    Icon: ShieldIcon,
    title: '7 days return policy',
    copy: 'Changed your mind? Return within seven days, free of charge.',
  },
  {
    Icon: HeadsetIcon,
    title: 'Best customer support',
    copy: 'Our team is on hand around the clock, every day of the week.',
  },
]

const OurPolicy = () => {
  return (
    <section className='py-14'>
      <Container>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
          {policies.map(({ Icon, title, copy }) => (
            <div
              key={title}
              className='rounded border border-neutral-200 bg-white shadow-sm p-6 transition-colors hover:border-brand-200'
            >
              <span className='flex h-11 w-11 items-center justify-center rounded bg-brand-50 text-brand-500'>
                <Icon size={22} />
              </span>
              <h3 className='mt-4 font-semibold text-neutral-900'>{title}</h3>
              <p className='mt-2 text-sm text-neutral-600'>{copy}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default OurPolicy
