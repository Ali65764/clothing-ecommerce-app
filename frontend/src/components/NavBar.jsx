import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { Container, Logo, cx } from './ui'
import { ArrowUpRight, BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from './ui/Icons'

const links = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
]

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, token, setToken, setCartItems, navigate } = useContext(ShopContext);
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    const logout = () => {
        navigate('/login')
        localStorage.removeItem("token")
        setToken("")
        setCartItems({})
    }

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])


    useEffect(() => { setVisible(false) }, [location.pathname])

    useEffect(() => {
        document.body.style.overflow = visible ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [visible])

    const cartCount = getCartCount()

    return (
        <>
            <header
                className={cx(
                    'sticky top-0 z-40 border-b border-neutral-200 bg-white',
                    scrolled && 'shadow-sm'
                )}
            >
                <Container>
                    <div className='flex h-[68px] items-center justify-between gap-4'>
                        <Link to="/" aria-label={`Home`} className='text-neutral-900'>
                            <Logo />
                        </Link>

                        <nav className='hidden items-center gap-7 md:flex'>
                            {links.map(({ to, label }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        cx(
                                            'border-b-2 py-1.5 text-sm transition-colors',
                                            isActive
                                                ? 'border-brand-500 font-semibold text-brand-500'
                                                : 'border-transparent text-neutral-600 hover:text-brand-500'
                                        )
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>

                        <div className='flex items-center gap-1'>
                            <button
                                type="button"
                                onClick={() => setShowSearch(true)}
                                aria-label="Search products"
                                className='flex h-9 w-9 items-center justify-center rounded text-neutral-600 hover:bg-brand-50 hover:text-brand-500'
                            >
                                <SearchIcon size={19} />
                            </button>

                            <div className='group relative'>
                                <button
                                    type="button"
                                    onClick={() => token ? null : navigate("/login")}
                                    aria-label={token ? 'Account menu' : 'Sign in'}
                                    className='flex h-9 w-9 items-center justify-center rounded text-neutral-600 hover:bg-brand-50 hover:text-brand-500'
                                >
                                    <UserIcon size={19} />
                                </button>
                                {token &&
                                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-2 z-50'>
                                        <div className='w-44 rounded border border-neutral-200 bg-white shadow-sm py-1'>
                                            <p className='cursor-pointer px-3 py-2 text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-500'>My Profile</p>
                                            <p onClick={() => navigate("/orders")} className='cursor-pointer px-3 py-2 text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-500'>Orders</p>
                                            <p onClick={logout} className='cursor-pointer px-3 py-2 text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-500'>Logout</p>
                                        </div>
                                    </div>}
                            </div>

                            <Link
                                to="/cart"
                                aria-label="Cart"
                                className='relative ml-1 flex h-9 items-center gap-2 rounded bg-brand-500 px-3 text-white hover:bg-brand-600'
                            >
                                <BagIcon size={18} />
                                <span className='min-w-4 text-center text-sm font-semibold tabular-nums'>{cartCount}</span>
                            </Link>

                            <button
                                type="button"
                                onClick={() => setVisible(true)}
                                aria-label="Open menu"
                                className='ml-1 flex h-9 w-9 items-center justify-center rounded text-neutral-600 hover:bg-brand-50 hover:text-brand-500 md:hidden'
                            >
                                <MenuIcon size={19} />
                            </button>
                        </div>
                    </div>
                </Container>
            </header>

            <div
                className={cx('fixed inset-0 z-50 md:hidden', visible ? 'pointer-events-auto' : 'pointer-events-none')}
                aria-hidden={!visible}
            >
                <div
                    onClick={() => setVisible(false)}
                    className={cx(
                        'absolute inset-0 bg-neutral-900/40 transition-opacity',
                        visible ? 'opacity-100' : 'opacity-0'
                    )}
                />
                <aside
                    className={cx(
                        'absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col bg-white transition-transform',
                        visible ? 'translate-x-0' : 'translate-x-full'
                    )}
                >
                    <div className='flex h-16 items-center justify-between border-b border-neutral-200 px-4'>
                        <Logo size="sm" />
                        <button
                            type="button"
                            onClick={() => setVisible(false)}
                            aria-label="Close menu"
                            className='flex h-9 w-9 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                        >
                            <CloseIcon size={19} />
                        </button>
                    </div>

                    <nav className='flex flex-col'>
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                onClick={() => setVisible(false)}
                                to={to}
                                className={({ isActive }) =>
                                    cx(
                                        'flex items-center justify-between border-b border-neutral-200 px-4 py-3.5 text-sm',
                                        isActive ? 'bg-brand-50 font-semibold text-brand-500' : 'text-neutral-700'
                                    )
                                }
                            >
                                {label}
                                <ArrowUpRight size={16} className='text-neutral-400' />
                            </NavLink>
                        ))}
                    </nav>

                    <div className='mt-auto border-t border-neutral-200 p-4'>
                        {token ? (
                            <div className='flex flex-col'>
                                <button
                                    onClick={() => { setVisible(false); navigate('/orders') }}
                                    className='py-2 text-left text-sm text-neutral-700 hover:text-neutral-900'
                                >
                                    My orders
                                </button>
                                <button
                                    onClick={() => { setVisible(false); logout() }}
                                    className='py-2 text-left text-sm text-neutral-700 hover:text-neutral-900'
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => { setVisible(false); navigate('/login') }}
                                className='w-full rounded bg-brand-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600'
                            >
                                Sign in
                            </button>
                        )}
                    </div>
                </aside>
            </div>
        </>
    )
}

export default NavBar
