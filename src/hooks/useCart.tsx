import { useState } from 'react'
import useToken from './useToken'
import type { User } from '../types'

const useCart = () => {

    const getCart = () => {
        const cartString: string | null = localStorage.getItem('asleepiesCart')
        if (typeof cartString === 'string') {
            return JSON.parse(cartString)       
        } else {
            return null
        }
    }

    const [cart, setCart] = useState(getCart())

    //@ts-ignore
    const saveCart = (cart) => {
        localStorage.setItem('asleepiesCart', JSON.stringify(cart))
        setCart(cart)
    }

    const removeCart = () => {
        localStorage.removeItem('asleepiesCart')
        setCart(null)
    }

    return {
        cart: cart,
        setCart: saveCart,
        removeCart: removeCart
    }
}

export default useCart;