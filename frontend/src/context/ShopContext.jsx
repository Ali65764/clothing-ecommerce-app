import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$'
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please Select Product Size!", { autoClose: 1500 });
            return;
        }

        if (!token) {
            toast.error("Please sign in to add items to your cart", { autoClose: 1500 });
            navigate('/login')
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart', { itemId, size }, { headers: { token } })
                if (!response.data.success) {
                    toast.error(response.data.message, { autoClose: 1500 })
                }
            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || err.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (err) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        if (!token) {
            toast.error("Please sign in to update your cart", { autoClose: 1500 });
            navigate('/login')
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if (token) {
            try {
                const response = await axios.put(backendUrl + "/api/cart", { itemId, size, quantity }, { headers: { token } })
                if (!response.data.success) {
                    toast.error(response.data.message, { autoClose: 1500 })
                }
            } catch (err) {
                console.log(err.message)
                toast.error(err.response?.data?.message || err.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                }
                catch (err) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message, { autoClose: 1500 })
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    }

    const getUserCart = async (token) =>{
        try{
            const response = await axios.get(backendUrl + '/api/cart', {headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch(err) {
             console.log(err);
            toast.error(err.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])


    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }
    }, [])
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl,
        setToken, token, setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider