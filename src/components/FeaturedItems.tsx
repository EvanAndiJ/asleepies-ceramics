import { Link, Outlet } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import Shop from '../routes/shop';

export default function FeaturedItems() {

    const items = ['bwl001', 'pot001', 'vas001']

    return (<>
        <Carousel interval={3500} className='shadows'>
           {items.map(item=> 
            <Carousel.Item key={item} >
                <Link to={`./shop/${item}`}>
                    <div className='featured-img-con'>
                        <img src={`./img/${item}-1.png`} className='featured-img'/>
                    </div>
                </Link>
                {/* <Carousel.Caption>
                    <h3>{db.products[item].title} </h3>
                    <p>{db.products[item].desc}</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            )}
        </Carousel>
        <Shop/>
        </>
    )
}

