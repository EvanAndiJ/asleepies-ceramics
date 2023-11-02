import {  useParams } from "react-router-dom"
import {useEffect, useState} from 'react'

export default function OrderComplete() {
    const params = useParams()
    return (
        <div id="orderComplete">
            <h3>Thank You!</h3>
            <p>Your order has been placed<br/> 
            Thank you for supporting small artists</p>
            <p>order ID: {params.transactionId} </p>
        </div>
    )
}