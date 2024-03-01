import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import type * as PP from "@paypal/paypal-js";

import useToken from  './hooks/useToken'
import useUser from  './hooks/useUser'
import useCart from './hooks/useCart';

import NavBar from  './components/navBar'
// import UserMenu from './components/userMenu'
// import ModalSignOut from "./components/modalSignOut";

import { SkuInfo } from './types';
import WelcomeModal from './components/WelcomeModal';

function App() {
  const navigate = useNavigate()
  // const { userInfo, setUserInfo, signOutUser } = useUser();
  // const { token, setToken } = useToken();
  const { cart, setCart, removeCart } = useCart();
  const [cartCount, setCartCount] = useState(cart ? cart.items.length : 0)

  // const [alert, setAlert] = useState('')
  // const [showAlert, setShowAlert] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(userInfo ? true : false)
  
  // useEffect(() => {
    // if (userInfo && isLoggedIn) {
    //   if (Date.now() - userInfo.last > 86400000) {
    //     confirmSignOut()
    //   }
    // }
    // userInfo ? setIsLoggedIn(true) : setIsLoggedIn(false)
  // })
  
  const [modalTog, setModalTog] = useState(true)
  const toggleModal = () => setModalTog(!modalTog)


  // const signIn =  (data: UserLogin) => {
  //   const newInfo = {
  //     id: data.id,
  //     username: data.username,
  //     email: data.email,
  //     cart: data.cart,
  //     itemCount: data.itemCount,
  //     roles: data.roles,
  //     last: data.loggedIn
  //   }
  //   setUserInfo(newInfo)
  //   setToken(data.accessToken)
  //   setIsLoggedIn(true)
  // };
  // const confirmSignOut = () => {
  //   signOutUser()
  //   setIsLoggedIn(false)
  //   navigate('/')
  //   if (modalTog) { toggleModal() }
  // };

  // LOOK AT ME 
  const onPaid = (details: PP.OrderResponseBody, holdId: string) => {

    const body = {
      transactionId: details.id,
      total: parseInt(details.purchase_units[0].amount.value),
      items: cart.items,
      name: `${details.payer.name?.given_name} ${details.payer.name?.surname}`,
      holdId: holdId,
      // userId: userInfo ? userInfo.id : null
      // cartId: userInfo.cart,
    }

    fetch('/api/orders/make', {
        method: 'POST',
        headers: {
            'content-type':'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then( res => {
      removeCart()
      setCartCount(0)
      navigate(`/cart/checkout/${details.id}`)
    })
    .catch(err => console.log(err))
  };
  const onAddToCart = (item: SkuInfo) => {
    if (item.stock > 0) {
      if (cart) {
        if (!cart.items.includes(item.sku) || item.stock > 1) {
          setCart({ items: [...cart.items, item.sku], total: cart.total + item.price, holdId: cart.holdId})
          setCartCount(cartCount+1)
        }
      } else {
        setCart( {items: [item.sku], total: item.price, holdId: Math.random().toString(36).substring(2, 16)} )
        setCartCount(cartCount+1)
      }
    }
  };
  //@ts-expect-error
  const onRemoveFromCart = (newCart) => {
    setCartCount(cartCount - 1)
    setCart(newCart)
  };
  const removeAllFromCart = () => {
    setCartCount(0)
    removeCart()
  }
  
  const context = {
    // signIn,
    // confirmSignOut, 
    onAddToCart,
    onRemoveFromCart,
    removeAllFromCart,
    onPaid
  };
  
  return (
    <div id="appDiv">
      
      <Link to="./">
        <img id='logoHead' 
          src={`./img/asleepies.PNG` } />
      </Link>
      <h3>Handmade Ceramics</h3>

      <NavBar isLoggedIn={false} signOut={toggleModal} itemCount={cartCount}/>
      <Outlet context={context}/>
    
      <WelcomeModal show={modalTog} onHide={toggleModal} />
    </div>
  );
}


export default App;



