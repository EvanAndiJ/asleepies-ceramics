import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';

import Shop from './routes/shop'
import ItemDetail from './routes/itemDetail'

import User from './routes/user';
import Cart from './routes/cart'
import Checkout from './routes/checkout'
import OrderComplete from './routes/orderComplete'

import Login from './routes/login'
import Signup from './routes/signup'

import Contact from './routes/contact';

import Dashboard from './routes/dashboard'
import DevTests from './components/devTests';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
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

        <Route path="user" >
          <Route index element={<User />}/>
        </Route>
        
        <Route path="contact" element={<Contact />}/>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="dashboard" >
          <Route index element={<Dashboard />}/>
          <Route path="edit" element={<Dashboard />}/>
          <Route path="add" element={<Dashboard />}/>
        </Route>
      </Route>

      <Route path="*" element={<h1>Oops, nothing here</h1>} />
    <Route path="/tests" element={<DevTests />} ></Route>
    </Routes>

    </BrowserRouter>
);
