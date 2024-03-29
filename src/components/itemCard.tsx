import React, {useState, useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { ItemDetailProps } from '../types';
import '../App.css';

const ItemCard = ({info, onAdd}: ItemDetailProps) => {
  
  const item = info
  const [sku] = useState(item.sku)
  const [title] = useState(item.title)
  const [price] = useState(item.price)
  const [desc] = useState(item.desc.length > 20 ? 
    item.desc.slice(0, 30) + '...' : item.desc)

  const img1 = `./img/${sku}-1.png`
  const loc = useLocation()
  const isShop = loc.pathname.split('/').includes('shop') ? true : false
  const itemLink = `${isShop ? './' : './shop/'}${sku}`
  
  const [classes, setClasses] = useState('itemCard shadows')
  const itemDetail = () => {
    // setClasses('spinny itemCard shadows')
  }

  return (
    <Card className={classes} onClick={itemDetail}>
      <Link to={itemLink} key={sku} >
            <Card.Img variant="top" src={img1} className='img-front'/>
        <Card.Title> {title} </Card.Title>
        <Card.Text className="itemCardBody"> {desc} </Card.Text>
          <Card.Text className="itemCardBody">${price}</Card.Text>
      </Link> 
      <button onClick={()=>onAdd(item)} className='addToCart'>Add to Cart</button>
    </Card>
  );

}

export default ItemCard;



