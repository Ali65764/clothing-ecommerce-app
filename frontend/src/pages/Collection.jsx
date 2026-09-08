import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import { Button, Container, EmptyState, cx } from '../components/ui'
import { ProductCardSkeleton } from '../components/ui/Skeleton'
import { ChevronDown, CloseIcon, SearchIcon } from '../components/ui/Icons'

const CATEGORIES = ['Men', 'Women', 'Kids']
const TYPES = ['Topwear', 'Bottomwear', 'Winterwear']


const FilterPill = ({ value, checked, onChange }) => (
  <label className='flex cursor-pointer items-center gap-2 text-sm text-neutral-700'>
    <input
      type='checkbox'
      className='h-4 w-4 accent-brand-500'
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {value}
  </label>
)

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
        break;
      default:
        applyFilter();
        break;

    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  const clearAll = () => {
    setCategory([])
    setSubCategory([])
  }

  const activeCount = category.length + subCategory.length
  const loading = products.length === 0

  return (
    <Container className='py-10'>
      <header className='flex flex-col gap-2 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='flex items-center gap-2 text-sm font-semibold text-brand-500'><span className='h-0.5 w-6 bg-brand-200' />Shop</p>
          <h1 className='mt-1 text-3xl font-bold text-neutral-900 sm:text-4xl'>All collections</h1>
        </div>
        <p className='text-sm text-neutral-500'>
          {loading ? 'Loading products' : `${filterProducts.length} ${filterProducts.length === 1 ? 'product' : 'products'}`}
        </p>
      </header>

   
      <div className='mt-6 rounded border border-neutral-200 bg-white shadow-sm p-4'>
        <div className='flex items-center justify-between gap-4'>
          <button
            type='button'
            onClick={() => setShowFilter(!showFilter)}
            aria-expanded={showFilter}
            className='flex items-center gap-2 text-sm font-semibold text-neutral-900 lg:cursor-default'
          >
            Filters
            {activeCount > 0 && <span className='text-neutral-500'>({activeCount})</span>}
            <ChevronDown
              size={16}
              className={cx('text-neutral-500 lg:hidden', showFilter && 'rotate-180')}
            />
          </button>

          <div className='flex items-center gap-4'>
            {activeCount > 0 && (
              <button
                type='button'
                onClick={clearAll}
                className='text-sm text-neutral-500 hover:text-neutral-900'
              >
                Clear all
              </button>
            )}
            <select
              onChange={(e) => setSortType(e.target.value)}
              aria-label='Sort products'
              className='h-9 cursor-pointer rounded border border-neutral-300 bg-white px-2 text-sm text-neutral-700 focus:border-brand-500 focus:outline-none'
            >
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
        </div>

        <div className={cx('lg:block', showFilter ? 'block' : 'hidden')}>
          <div className='mt-4 flex flex-col gap-4 border-t border-neutral-200 pt-4 sm:flex-row sm:gap-12'>
            <div className='flex flex-wrap items-center gap-x-5 gap-y-2'>
              <span className='text-sm text-neutral-500'>Category</span>
              {CATEGORIES.map((value) => (
                <FilterPill key={value} value={value} checked={category.includes(value)} onChange={toggleCategory} />
              ))}
            </div>

            <div className='flex flex-wrap items-center gap-x-5 gap-y-2'>
              <span className='text-sm text-neutral-500'>Type</span>
              {TYPES.map((value) => (
                <FilterPill key={value} value={value} checked={subCategory.includes(value)} onChange={toggleSubCategory} />
              ))}
            </div>
          </div>
        </div>
      </div>

  
      {activeCount > 0 && (
        <div className='mt-4 flex flex-wrap items-center gap-2'>
          {[...category, ...subCategory].map((tag) => (
            <span
              key={tag}
              className='inline-flex items-center gap-1.5 rounded border border-neutral-300 bg-white py-1 pl-2.5 pr-1.5 text-xs text-neutral-700'
            >
              {tag}
              <button
                type='button'
                aria-label={`Remove ${tag} filter`}
                onClick={() => {
                  const e = { target: { value: tag } }
                  CATEGORIES.includes(tag) ? toggleCategory(e) : toggleSubCategory(e)
                }}
                className='text-neutral-400 hover:text-neutral-900'
              >
                <CloseIcon size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className='mt-8'>
        {loading ? (
          <div className='grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filterProducts.length === 0 ? (
          <EmptyState
            icon={<SearchIcon size={24} />}
            title='No products found'
            description='Nothing matches the current filters. Try removing a filter or adjusting your search.'
            action={activeCount > 0 && <Button onClick={clearAll} variant='outline' size='md'>Clear filters</Button>}
            className='rounded border border-neutral-200 bg-white shadow-sm'
          />
        ) : (
          <div className='grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 xl:grid-cols-4'>
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                image={item.image}
                price={item.price}
                bestseller={item.bestseller}
                category={item.category}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default Collection
