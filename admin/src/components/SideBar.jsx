import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cx, Logo } from './ui'
import { CloseIcon, ListIcon, LogoutIcon, PackageIcon, PlusIcon } from './ui/Icons'

const nav = [
  { to: '/add', label: 'Add items', hint: 'Create a product', Icon: PlusIcon },
  { to: '/list', label: 'List items', hint: 'Manage catalogue', Icon: ListIcon },
  { to: '/orders', label: 'Orders', hint: 'Track fulfilment', Icon: PackageIcon },
]

const SideBar = ({ open = false, onClose = () => { }, setToken }) => {
  const location = useLocation()

  useEffect(() => { onClose() }, [location.pathname])

  const content = (
    <>
      <div className='flex h-[68px] items-center justify-between border-b border-neutral-200 px-4'>
        <Logo />
        <button
          type='button'
          onClick={onClose}
          aria-label='Close menu'
          className='flex h-8 w-8 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 lg:hidden'
        >
          <CloseIcon size={18} />
        </button>
      </div>

      <p className='px-4 pb-2 pt-4 text-sm text-neutral-500'>Admin panel</p>

      <nav className='flex flex-col px-2'>
        {nav.map(({ to, label, hint, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cx(
                'flex items-center gap-3 rounded border-l-2 px-3 py-2.5 transition-colors',
                isActive
                  ? 'border-brand-500 bg-brand-50 text-brand-500'
                  : 'border-transparent text-neutral-700 hover:bg-neutral-100'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={cx('shrink-0', isActive ? 'text-brand-500' : 'text-neutral-400')} />
                <span className='min-w-0'>
                  <span className='block text-sm font-semibold'>{label}</span>
                  <span className='mt-0.5 block text-xs text-neutral-500'>{hint}</span>
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className='mt-auto border-t border-neutral-200 p-4'>
        <button
          onClick={() => setToken("")}
          className='flex w-full items-center justify-center gap-2 rounded border border-neutral-300 py-2 text-sm text-neutral-700 hover:bg-neutral-100 lg:hidden'
        >
          <LogoutIcon size={16} />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <>
      <aside className='fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-neutral-200 bg-white lg:flex'>
        {content}
      </aside>

      <div
        className={cx('fixed inset-0 z-50 lg:hidden', open ? 'pointer-events-auto' : 'pointer-events-none')}
        aria-hidden={!open}
      >
        <div
          onClick={onClose}
          className={cx(
            'absolute inset-0 bg-neutral-900/40 transition-opacity',
            open ? 'opacity-100' : 'opacity-0'
          )}
        />
        <aside
          className={cx(
            'absolute inset-y-0 left-0 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {content}
        </aside>
      </div>
    </>
  )
}

export default SideBar
