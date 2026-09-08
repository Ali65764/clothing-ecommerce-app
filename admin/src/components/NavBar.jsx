import { useLocation } from 'react-router-dom'
import { Button, Logo } from './ui'
import { LogoutIcon, MenuIcon } from './ui/Icons'

const titles = {
  '/add': 'Add product',
  '/list': 'Products',
  '/orders': 'Orders',
}

const NavBar = ({ setToken, onMenu = () => { } }) => {
  const { pathname } = useLocation()

  return (
    <header className='sticky top-0 z-20 border-b border-neutral-200 bg-white shadow-sm'>
      <div className='flex h-[68px] items-center justify-between gap-4 px-4 sm:px-6'>
        <div className='flex min-w-0 items-center gap-3'>
          <button
            type='button'
            onClick={onMenu}
            aria-label='Open menu'
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 lg:hidden'
          >
            <MenuIcon size={19} />
          </button>

          <span className='lg:hidden'>
            <Logo size='sm' />
          </span>

          <p className='hidden truncate font-semibold text-neutral-900 lg:block'>
            {titles[pathname] || 'Dashboard'}
          </p>
        </div>

        <Button onClick={() => setToken("")} variant='outline' size='sm'>
          <LogoutIcon size={15} />
          <span className='hidden sm:inline'>Logout</span>
        </Button>
      </div>
    </header>
  )
}

export default NavBar
