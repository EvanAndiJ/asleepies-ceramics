import { CheckoutItemProp, OutContext, SkuInfo } from "../types";

// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type {CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions} from "@paypal/paypal-js";

import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react';
//@ts-expect-error
import ppConfig from "../scripts/paypal.config.js";

// import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import useCart from "../hooks/useCart";

//@ts-expect-error
import db from '../data/sample-data.js'

const Checkout = () => {
  const context = useOutletContext<OutContext>()
  const {userInfo}= useUser()
  const {cart, setCart} = useCart()


  const [items, setItems] = useState([])
  const [total, setTotal] = useState(cart.total)
  const ppspOptions = {
    "client-id": ppConfig.clientId
  };

  useEffect(() => {
    if (cart && cart.items.length) {
      //@ts-expect-error
      const cartItems = Object.values(db.products).filter((prod) => cart.items.includes(prod.sku))
      //@ts-expect-error
      setItems(cartItems)
      
      // const body = {
      //   items: cart.items,
      //   holdId: cart.holdId,
      //   userId: userInfo ? userInfo.id : null
      // }
      // fetch('/api/orders/prep', {
      //   method: 'POST',
      //   headers: {
      //     'content-type':'application/json',
      //   },
      //   body: JSON.stringify(body)
      // })
      // .then( res => res.json() )
      // .then(res => {
      //   if ('message' in res) {
      //     console.log(res.message)
      //   } else {
      //     setItems(res.items);
      //     setCart({
      //       items:[...cart.items], 
      //       total: cart.total, 
      //       holdId: res.holdId
      //     })
      //   }
      // })
    } 
  }, [])
  
  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: total.toString()
                },
            },
        ],
    })
  }
  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    if (actions.order) {
      actions.order.capture()
      .then((details) => {
          context.onPaid(details, cart.holdId) // CART->ORDER CONVERSION
      })
    }
  }
  const CheckoutItem = ({itemProp}: CheckoutItemProp) => {
    const imageSrc = `../img/${itemProp.sku}-1.png`

    return (
      <div className='cartItem'>
        <img className="cartThumb" alt="item image" src={imageSrc} />
          
        <div className="cartDesc">
            <h6> {itemProp.title} </h6>
            <p> ${itemProp.price} </p>
        </div>
      </div>
    );
  };

  return (
    
    
    
    <div className='checkoutDiv'>
      {/* <PayPalScriptProvider options={ppspOptions}> */}
      <h3>Almost there!</h3>

      {items.length ? items.map((item: SkuInfo) => 
      <CheckoutItem itemProp={item} key={`cartLine${item.sku}`}/> ) 
      : null }

      {items.length ? <>
      <h3>Total: ${`${total}`}</h3> 
      <div style={{ width: '70%' }}>
        {/* <PayPalButtons style={{ layout: "horizontal"}}
            createOrder={createOrder} onApprove={onApprove} /> */}
      </div>
      </>
        : null }
    {/* </PayPalScriptProvider> */}
    </div>
  );
}


  export default Checkout;