import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';
import Container from './ui/Container';
import { CloseIcon, SearchIcon } from './ui/Icons';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();
    const inputRef = useRef(null)

    useEffect(() => {
        if (location.pathname.includes("collection")) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])

 
    useEffect(() => {
        if (showSearch && visible) {
            inputRef.current?.focus()
        }
    }, [showSearch, visible])

    const onKeyDown = (e) => {
        if (e.key === 'Escape') setShowSearch(false)
    }

    return showSearch && visible ? (
        <div className='border-b border-neutral-200 bg-white'>
            <Container>
                <div className='flex items-center gap-3 py-3'>
                    <SearchIcon size={18} className='shrink-0 text-neutral-400' />
                    <input
                        ref={inputRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={onKeyDown}
                        type='text'
                        placeholder='Search for a product'
                        aria-label='Search products'
                        className='h-9 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400'
                    />
                    {search && (
                        <button
                            type='button'
                            onClick={() => setSearch('')}
                            className='shrink-0 text-sm text-neutral-500 hover:text-neutral-900'
                        >
                            Clear
                        </button>
                    )}
                    <button
                        type='button'
                        onClick={() => setShowSearch(false)}
                        aria-label='Close search'
                        className='flex h-8 w-8 shrink-0 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
                    >
                        <CloseIcon size={17} />
                    </button>
                </div>
            </Container>
        </div>
    ) : null
}

export default SearchBar
