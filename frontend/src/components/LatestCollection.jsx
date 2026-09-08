import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from "../context/ShopContext"
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem';
import { Button, Container, SectionHeading } from './ui'
import { ProductCardSkeleton } from './ui/Skeleton'

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])

    const loading = products.length === 0

    return (
        <section className='py-12'>
            <Container>
                <SectionHeading
                    eyebrow='New in'
                    title='Latest drops'
                    description='The most recent additions to the shelf, refreshed as new stock lands.'
                    action={
                        <Button as={Link} to='/collection' variant='outline' size='sm' className='hidden sm:inline-flex'>
                            View all
                        </Button>
                    }
                />

                <div className='mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5'>
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
                        : latestProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                bestseller={item.bestseller}
                                category={item.category}
                            />
                        ))}
                </div>

                <div className='mt-8 sm:hidden'>
                    <Button as={Link} to='/collection' variant='outline' size='md' full>
                        View all products
                    </Button>
                </div>
            </Container>
        </section>
    )
}

export default LatestCollection
