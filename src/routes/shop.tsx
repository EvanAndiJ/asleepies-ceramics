import '../App.css';
import React, {useState, useEffect} from 'react';
import { useOutletContext } from "react-router-dom";
import ItemCard from '../components/itemCard';
import { OutContext, SkuInfo } from '../types';

//@ts-expect-error
import db from '../data/sample-data.js'

const Shop = () => {
  
  const context = useOutletContext<OutContext>()
  const [items, setItems] = useState<SkuInfo[]>(Object.values(db.products));

  useEffect(() => {
    // fetch('/api/shop', {
    //       method: 'POST',
    //       headers: {
    //         'content-type':'application/json'
    //       },
    //       body: JSON.stringify({op: 'shop'})
    //     }
    //   )
    //   .then((res) => res.json())
    //   .then(data => setItems(data.rows))
  },[]);
  
  return (
    <div id='shopDiv'>
      {items ? 

        items.map((sku: SkuInfo) => 
        <ItemCard info={sku} onAdd={context.onAddToCart} key={sku.sku}/>) 

        : <p style={{margin: 'auto'}}>"loading"</p>}

    </div>
  );

}

export default Shop;


