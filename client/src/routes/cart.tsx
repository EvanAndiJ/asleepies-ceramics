import { Link, useOutletContext, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import useCart from "../hooks/useCart";
import { CartItemProp, OutContext, SkuInfo } from "../types";

const Cart = () => {
  const nav = useNavigate()
  const context = useOutletContext<OutContext>()
  const {token}  = useToken()
  const {userInfo, setUserInfo, signOutUser} = useUser()
  const {cart, setCart} = useCart()

  const [items, setItems] = useState<SkuInfo[]>([])
  const [total, setTotal] = useState(cart ? cart.total : 0)

  useEffect(() => { 
    if (cart) {
      fetch('/api/getItems', {
        method: 'POST',
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({items: cart.items})
      })
      .then(res => {
        return res.json()  
      })
      .then(items => {
        setItems(items.items);
      })
      .catch(err => console.log(err))
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
    const imagePath = `https://i.ibb.co/${itemProp.images[0]}`

    return (
      
      <div className='cartItem'>
        <img  className="cartThumb" src={imagePath} />
            
        <div className="cartDesc">
          {itemProp.stock ? <>
          <Link to={`/shop/${itemProp.sku}`}  >
            <h6> {itemProp.title} </h6>
          </Link>
            <p> ${itemProp.price} </p> </>
          
        : <Link to={`/shop/${itemProp.sku}`} className="routeLink" >
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


  return (
    <div className="cartDiv">
      <h4>Cart</h4>
      
      {items.length ? <>
        {items.map((item: SkuInfo) => 
        <CartItem  itemProp={item} onRemove={onRemove} 
          key={`cartLine${item.sku}`}/>)}
            
          <div className="cartSummary">
            <h3>Total: ${`${total}`}</h3>
            <button className="checkoutLink" 
              onClick={()=>nav('/cart/checkout')}>
                Checkout</button> 

            <p>All transactions made with PayPal</p>

          </div>
        </>

        : <p>There's nothing in your cart yet.<br/> 
          Check out the <Link to="/shop">shop</Link>!</p>
      }
    </div>
  );
}

export default Cart;