import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function OrderSuccess() {
    const { placedOrder } = useSelector(state => state.placedOrder)
    return (
        <>
            <div className="container">
                <h1>Your order is successfull</h1>
                <p>Your Order Id is {placedOrder?.orderId} </p>
                <Link className='btn btn-success' to={"/order-history"}>Manage Order</Link>
            </div>
        </>
    )
}
