import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';

import Shop from './routes/shop'
import FeaturedItems from './components/FeaturedItems'
import ItemDetail from './routes/itemDetail'

// import User from './routes/user';
import Cart from './routes/cart'
import Checkout from './routes/checkout'
import OrderComplete from './routes/orderComplete'

// import Login from './routes/login'
// import Signup from './routes/signup'

import About from './routes/about'
import Contact from './routes/contact';

import Dashboard from './routes/dashboard'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/asleepies-ceramics" element={<App />} >
        <Route index element={<FeaturedItems />}/>
        <Route index element={<Shop />}/>

        <Route path="shop" >
          <Route index element={<Shop />}/>
          <Route path=":sku" element={<ItemDetail />}/>
        </Route>

        <Route path="cart" >
          <Route index element={<Cart />}/>
          <Route path="checkout">
            <Route index element={<Checkout />}/>
            <Route path=":transactionId" element={<OrderComplete />}/>
          </Route>
        </Route>

        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact />}/>

        <Route path="dashboard" >
          <Route index element={<Dashboard />}/>
          <Route path="edit" element={<Dashboard />}/>
          <Route path="add" element={<Dashboard />}/>
        </Route>
      </Route>

      <Route path="*" element={<h1>Oops, nothing here</h1>} />
    </Routes>

    </BrowserRouter>
);
