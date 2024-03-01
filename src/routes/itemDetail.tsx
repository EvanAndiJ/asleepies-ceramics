import React, {useState, useEffect} from 'react';
import { useParams, useOutletContext } from "react-router-dom";

import ItemGallery from '../components/ItemGallery';
import { OutContext } from '../types';

//@ts-expect-error
import db from '../data/sample-data.js'

const ItemDetail = () => {
    const context = useOutletContext<OutContext>();
    
    const [skuInfo, setSkuInfo] = useState(null)
    const params = useParams()
    
    const [sku, setSku] = useState(params.sku)
    const [title, setTitle] = useState('Title detail page')
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState('soon')
    const [images, setImages] = useState([])

    useEffect(() => {
      const getItemDetails = () => {
        fetch('/api/getItem', {
          method: 'POST',
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify({prodId: params.sku})
        }).then(res => res.json())
        .then(res => {
            setSkuInfo(res.prod)
            setSku(res.prod.sku)
            setPrice(res.prod.price)
            setTitle(res.prod.title)
            setDesc(res.prod.desc)
        })
      }
      const getImages = () => {
        fetch(`/api/images/${sku}`, {
          method: 'POST',
          headers: {
            'content-type':'application/json',
          }
        }).then(res => res.json())
        .then(res => setImages(res.images))
      }
      // getItemDetails()
      // getImages()

      const item = db.products[params.sku]
      setSkuInfo(item)
      setSku(item.sku)
      setPrice(item.price)
      setTitle(item.title)
      setDesc(item.desc)
      setImages(item.img)
    }, [])

  return (
    <div className="itemDetail shadows">
        {sku ? <>
            
            {images.length ? <ItemGallery sku={sku} images={images}/> : null}
           <div id='itemInfo' className=''> 
             <h3>{`${title}`}</h3>
             <p>{desc}</p>
             <h5>{`$${price}`}</h5>

            </div>
              <button onClick={()=>{if (skuInfo) {context.onAddToCart(skuInfo)}}} 
                className="addToCart">Add to Cart</button>

        </>

        : null}

    </div>
  );

}

export default ItemDetail;


