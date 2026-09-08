import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts';
import { Badge, Button, Container, cx } from '../components/ui'
import { BagIcon, ChevronRight, RefreshIcon, ShieldIcon, StarIcon, TruckIcon } from '../components/ui/Icons'
import cdn from '../utils/cdn'

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('')
  const [tab, setTab] = useState('description')

  const fetchProductData = async () => {
    products.find((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image)
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <Container className='py-10'>

      <nav aria-label='Breadcrumb' className='flex items-center gap-1.5 text-sm text-neutral-500'>
        <Link to='/' className='hover:text-neutral-900'>Home</Link>
        <ChevronRight size={13} />
        <Link to='/collection' className='hover:text-neutral-900'>Shop</Link>
        <ChevronRight size={13} />
        <span className='truncate text-neutral-700'>{productData.name}</span>
      </nav>

      <div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12'>

     
        <div className='relative aspect-[4/5] overflow-hidden rounded border border-neutral-200 bg-white shadow-sm'>
          <img src={cdn(image, 1000)} alt={productData.name} className='h-full w-full object-cover' />
          {productData.bestseller && (
            <Badge variant='volt' className='absolute left-3 top-3'>Bestseller</Badge>
          )}
        </div>

      
        <div>
          <div className='flex flex-wrap items-center gap-2 text-sm text-neutral-500'>
            <span>{productData.category}</span>
            <span>/</span>
            <span>{productData.subCategory}</span>
          </div>

          <h1 className='mt-2 text-3xl font-bold text-neutral-900'>
            {productData.name}
          </h1>

          <div className='mt-3 flex items-center gap-2'>
            <div className='flex items-center gap-0.5 text-brand-300'>
              <StarIcon size={15} filled />
              <StarIcon size={15} filled />
              <StarIcon size={15} filled />
              <StarIcon size={15} filled />
              <StarIcon size={15} className='text-neutral-300' />
            </div>
            <p className='text-sm text-neutral-500'>(122)</p>
          </div>

          <p className='mt-5 text-3xl font-bold text-brand-500'>
            {currency}{productData.price}
          </p>

          <p className='mt-5 max-w-prose text-neutral-600'>{productData.description}</p>

          <div className='mt-7'>
            <div className='flex items-baseline justify-between'>
              <p className='text-sm font-semibold text-neutral-900'>Select size</p>
              {size && <p className='text-sm text-neutral-500'>Selected: {size}</p>}
            </div>
            <div className='mt-3 flex flex-wrap gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  type='button'
                  aria-pressed={item === size}
                  className={cx(
                    'h-10 min-w-[3rem] rounded border px-4 text-sm',
                    item === size
                      ? 'border-brand-500 bg-brand-50 font-semibold text-brand-700'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => addToCart(productData._id, size)}
            size='lg'
            variant='primary'
            className='mt-7 w-full sm:w-auto'
          >
            <BagIcon size={18} />
            Add to cart
          </Button>

          <ul className='mt-7 flex flex-col gap-2 border-t border-neutral-200 pt-5'>
            {[
              { Icon: ShieldIcon, text: '100% original product.' },
              { Icon: TruckIcon, text: 'Cash on delivery is available on this product.' },
              { Icon: RefreshIcon, text: 'Easy return and exchange policy within 7 days.' },
            ].map(({ Icon, text }) => (
              <li key={text} className='flex items-center gap-2.5 text-sm text-neutral-600'>
                <Icon size={17} className='shrink-0 text-neutral-400' />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mt-14'>
        <div className='flex gap-6 border-b border-neutral-200'>
          {[
            { id: 'description', label: 'Description' },
            { id: 'reviews', label: 'Reviews (122)' },
          ].map(({ id, label }) => (
            <button
              key={id}
              type='button'
              onClick={() => setTab(id)}
              className={cx(
                '-mb-px border-b-2 pb-3 text-sm',
                tab === id
                  ? 'border-brand-500 font-semibold text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className='mt-5'>
          {tab === 'description' ? (
            <div className='flex max-w-prose flex-col gap-4 text-sm text-neutral-600'>
              <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
              <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
            </div>
          ) : (
            <p className='max-w-prose text-sm text-neutral-600'>
              Customer reviews for this product will appear here once they have been submitted.
            </p>
          )}
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </Container>
  ) : <div className='opacity-0'></div>;
}

export default Product
