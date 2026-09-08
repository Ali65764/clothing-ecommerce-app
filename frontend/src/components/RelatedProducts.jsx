import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import SectionHeading from './ui/SectionHeading'

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            setRelated(productsCopy.slice(0, 5))
        }
    }, [products])

    if (related.length === 0) return null

    return (
        <section className='mt-16 border-t border-neutral-200 pt-10'>
            <SectionHeading
                eyebrow='You may also like'
                title='Related products'
            />

            <div className='mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5'>
                {related.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        bestseller={item.bestseller}
                        category={item.category}
                    />
                ))}
            </div>
        </section>
    )
}

export default RelatedProducts
