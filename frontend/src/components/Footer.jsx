import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Logo } from './ui'
import { brand } from '../config/brand'
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, TwitterIcon } from './ui/Icons'

const company = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/collection' },
    { label: 'About us', to: '/about' },
    { label: 'Contact', to: '/contact' },
]

const support = ['Delivery', 'Returns & exchanges', 'Privacy policy', 'Terms of service']

const socials = [
    { label: 'Instagram', Icon: InstagramIcon },
    { label: 'Twitter', Icon: TwitterIcon },
    { label: 'Facebook', Icon: FacebookIcon },
]

const Footer = () => {
    return (
        <footer className='mt-auto bg-brand-500 text-white'>
            <Container className='py-14'>
                <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'>
                    <div>
                        <Logo tone='light' />
                        <p className='mt-4 max-w-sm text-sm text-brand-200'>
                            {brand.tagline} A considered edit of everyday essentials across
                            men&apos;s, women&apos;s and kids&apos; wear, delivered with care.
                        </p>
                        <div className='mt-5 flex items-center gap-2'>
                            {socials.map(({ label, Icon }) => (
                                <span
                                    key={label}
                                    aria-label={label}
                                    className='flex h-9 w-9 items-center justify-center rounded border border-white/25 text-brand-200 hover:border-brand-200 hover:text-white'
                                >
                                    <Icon size={17} />
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className='text-sm font-semibold text-white'>Company</p>
                        <ul className='mt-3 flex flex-col gap-2'>
                            {company.map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className='text-sm text-brand-200 hover:text-white'>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className='text-sm font-semibold text-white'>Support</p>
                        <ul className='mt-3 flex flex-col gap-2'>
                            {support.map((label) => (
                                <li key={label} className='text-sm text-brand-200'>{label}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className='text-sm font-semibold text-white'>Get in touch</p>
                        <ul className='mt-3 flex flex-col gap-2'>
                            <li className='flex items-center gap-2 text-sm text-brand-200'>
                                <PhoneIcon size={16} />
                                {brand.phone}
                            </li>
                            <li className='flex items-center gap-2 text-sm text-brand-200'>
                                <MailIcon size={16} />
                                {brand.email}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/20 pt-6 sm:flex-row'>
                    <p className='text-sm text-brand-200'>
                        Copyright {brand.copyrightYear} @ {brand.domain} &mdash; All Rights Reserved.
                    </p>
                    <p className='text-sm text-brand-200'>{brand.city}</p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
