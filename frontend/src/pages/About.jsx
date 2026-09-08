import React from 'react'
import { assets } from '../assets/assets.js'
import NewsletterBox from '../components/NewsletterBox'
import { Container, SectionHeading } from '../components/ui'
import { brand } from '../config/brand'

const pillars = [
  {
    title: 'Quality assurance',
    copy: 'We meticulously select and vet each product to ensure it meets our stringent quality standards.',
  },
  {
    title: 'Convenience',
    copy: 'With our user-friendly interface and hassle-free ordering process, shopping has never been easier.',
  },
  {
    title: 'Exceptional service',
    copy: 'Our team of dedicated professionals is here to assist you every step of the way.',
  },
]

const About = () => {
  return (
    <div>
      <Container className='py-10'>
        <header className='border-b border-neutral-200 pb-6'>
          <p className='flex items-center gap-2 text-sm font-semibold text-brand-500'><span className='h-0.5 w-6 bg-brand-200' />About us</p>
          <h1 className='mt-1 max-w-3xl text-3xl font-bold text-neutral-900 sm:text-4xl'>
            Built for people who care what they wear.
          </h1>
        </header>

        <div className='mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12'>
          <div className='aspect-[4/3] overflow-hidden rounded border border-neutral-200 bg-white shadow-sm lg:aspect-[4/5]'>
            <img src={assets.about} alt='Our store' className='h-full w-full object-cover' />
          </div>

          <div className='flex flex-col justify-center gap-4 text-neutral-600'>
            <p>{brand.name} was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p>Since our inception, we&apos;ve worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>

            <div className='mt-2 border-l-2 border-brand-500 pl-4'>
              <p className='font-semibold text-neutral-900'>Our mission</p>
              <p className='mt-2'>Our mission at {brand.name} is to empower customers with choice, convenience, and confidence. We&apos;re dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
            </div>
          </div>
        </div>
      </Container>

      <section className='border-y border-neutral-200 bg-white py-12'>
        <Container>
          <SectionHeading eyebrow='Why choose us' title='What we stand behind' />

          <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-3'>
            {pillars.map(({ title, copy }) => (
              <div key={title}>
                <h3 className='font-semibold text-neutral-900'>{title}</h3>
                <p className='mt-2 text-sm text-neutral-600'>{copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className='pt-12'>
        <NewsletterBox />
      </div>
    </div>
  )
}

export default About
