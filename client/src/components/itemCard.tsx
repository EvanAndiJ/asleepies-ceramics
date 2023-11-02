import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
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

  const imagePath = `https://i.ibb.co/${item.images[0]}`
  
  return (
    <Card className='itemCard'>
      <Link to={`/shop/${sku}`} key={sku} >
        <Card.Img variant="top" src={imagePath} className="itemCardImg"/>
          <Card.Title> {title} </Card.Title>
          <Card.Text className="itemCardBody"> {desc} </Card.Text>
      </Link>
          <Card.Text className="itemCardBody">${price}</Card.Text>
      <button onClick={()=>onAdd(item)} className='addToCart'>Add to Cart</button>
    </Card>
  );

}

export default ItemCard;



