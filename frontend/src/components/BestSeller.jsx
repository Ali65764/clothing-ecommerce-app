import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import { Container, SectionHeading } from './ui'
import { ProductCardSkeleton } from './ui/Skeleton'

const BestSeller = () => {

    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct)
    }, [products])

    const loading = products.length === 0

    if (!loading && bestSeller.length === 0) return null

    return (
        <section className='border-y border-neutral-200 bg-white py-12'>
            <Container>
                <SectionHeading
                    eyebrow='Most loved'
                    title='Best sellers'
                    description='The pieces customers keep coming back for, ranked by what actually leaves the shelf.'
                />

                <div className='mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5'>
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
                        : bestSeller.map((item, index) => (
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
            </Container>
        </section>
    )
}

export default BestSeller
