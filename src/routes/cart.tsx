//FIX IGNORES
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';

import useCart from "../hooks/useCart";
import { CartItemProp, OutContext, SkuInfo } from "../types";
import Spinner from 'react-bootstrap/Spinner';

//@ts-expect-error
import db from '../data/sample-data.js'

const Cart = () => {

  const nav = useNavigate()
  const context = useOutletContext<OutContext>()
  const {cart} = useCart()

  const [items, setItems] = useState<SkuInfo[]>([])
  const [total, setTotal] = useState(cart ? cart.total : 0)
  
  useEffect(() => { 
    if (cart) {
      //@ts-expect-error
      const cartItems = Object.values(db.products).filter((prod) => cart.items.includes(prod.sku))
      //@ts-expect-error
      setItems(cartItems)

    //   fetch('/api/getItems', {
    //     method: 'POST',
    //     headers: {
    //       'content-type':'application/json',
    //     },
    //     body: JSON.stringify({items: cart.items})
    //   })
    //   .then(res => {
    //     return res.json()  
    //   })
    //   .then(items => {
    //     setItems(items.items);
    //   })
    //   .catch(err => console.log(err))
    } 
    
  }, [])
  
  const onRemove = (item: SkuInfo) => {
    const newCart: {items:string[], total: number, holdId: string} = {items: [], total:   total, holdId: cart.holdId}
    const newDetails: SkuInfo[] = []
    for (let i=0, len=items.length; i < len; i++) {
      if (items[i].sku !== item.sku ) {
        newDetails.push(items[i])
        newCart.items.push(items[i].sku)
      } else {
        newCart.total -= items[i].price
        setTotal(newCart.total)
      }
      setItems(newDetails)
    }
    context.onRemoveFromCart(newCart)
  };
  const CartItem = ({itemProp, onRemove}: CartItemProp) => {
    const imagePath = `./img/${itemProp.sku}-1.png`

    return (
      
      <div className='cartItem'>
        <img  className="cartThumb" src={imagePath} />
            
        <div className="cartDesc">
          {itemProp.stock ? <>
          <Link to={`/asleepies-ceramics/shop/${itemProp.sku}`}  >
            <h6> {itemProp.title} </h6>
          </Link>
            <p> ${itemProp.price} </p> </>
          
        : <Link to={`/asleepies-ceramics/shop/${itemProp.sku}`} className="routeLink" >
            <p> Oh No! Item sold out </p>
          </Link> 
          }
        </div>
        <div className="cartRemove">
          <button onClick={ ()=> onRemove(itemProp) } > x </button>
        </div>
      </div>
    );
  };
  
  const [checkout, setCheckout] = useState(false);
  const onCheckout = () => {
    setCheckout(true)
    setTimeout(async ()=>{
      context.removeAllFromCart()
      setCheckout(false)
      nav(`/asleepies-ceramics/cart/checkout/${Math.random().toString(36).substring(2, 16)}`)
    },2000)
  }



  return (<>
    <div className="cart shadows">
      <h4>Your Cart</h4>    
      
      {items.length ? <>
        {items.map((item: SkuInfo) => 
        <CartItem  itemProp={item} onRemove={onRemove} 
          key={`cartLine${item.sku}`}/>)}
            
          
        </>

        : <p>There's nothing in your cart yet.<br/> 
          Check out the <Link to="/shop">shop</Link>!</p>
      }
    </div>
      {items.length ?
        <div className="cartSummary">
          <h3 className="text-shadow">Total: ${`${total}`}</h3>
          <button className="addToCart checkoutLink shadows" disabled={checkout}
            onClick={onCheckout}>
              {checkout ? <Spinner as='span' animation='border' size='sm'  role='status' /> : null  }
              Checkout
          </button> 

          {/* <p>All transactions made with PayPal</p> */}

        </div> : null}
        </>
  );
}

export default Cart;