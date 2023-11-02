import { useEffect, useState } from "react"
//@ts-expect-error
import http from '../scripts/http.js'

interface OrderHistory { 
    email: string
}
const OrderHistory = ({email}: OrderHistory) => {
    const [orders, setOrders] = useState([])

    useEffect( () => {
        fetch('/api/users/orderHistory', {
            method: 'POST',
            headers: {
              'content-type':'application/json',
            },
            body: JSON.stringify({email})
          })
        .then(res => res.json())
        .then(res=> setOrders(res.orders))
    },[])

    return (
        <div>
           Order History:
           <button onClick={()=>console.log(orders)}>orders</button>
           <div>
           {orders.map(order => (
            <div style={{margin:'1em'}} key={//@ts-ignore
                order.transactionId}> 

                {//@ts-ignore
                order.transactionId}
                ---
                {//@ts-ignore
                order.createdAt}
                ---
                 ${//@ts-ignore
                order.total}

            </div>
           ))}
           </div>
        </div>
    )
}

export default OrderHistory;