import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { orderAction } from '../actions/orderAction'
import Address from '../components/Address'
import axios from "axios"
import { useHistory } from 'react-router-dom'
export default function Payment() {
    const { loginUser } = useSelector(state => state.loggedIn)
    const { cartItem } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const history = useHistory()
    // razorpay
    const handleRazorpay = async () => {
        const config = {
            headers: {
                Authorization: loginUser.token,
            },
        };
        const formData = cartItem.map(item => { return { id: item._id, qty: item.qty } })
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/order/payment`, {
            products: formData
        }, config)
        if (!data.order) {
            return alert("Error ala")
        }
        const { id, currency, amount } = data.order
        const option = {
            key: process.env.REACT_APP_RAZORPAY_ID,
            currency,
            amount: amount.toString(),
            name: "SKILLHUB",
            description: "test payment",
            order_id: id,
            prefill: {
                name: "john bhai",
                email: "john@gmail.com",
                contact: "9898989898"
            },
            handler: async function (response) {
                // console.table(response)
                const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/order/payment/verify`, { ...response, orderCreationId: id }, config)
                // console.table(data);
                /*
                            orderId
                            paymentId
                            mode
                */
                // dispatch(orderAction({
                //     orderId: data.orderId,
                //     paymentId: data.paymentId,
                //     mode: "online"
                // }))

                // history.push("/success")

            }
        }
        const paymentobject = new window.Razorpay(option)
        paymentobject.open()
    }

    return (
        <div className='container'>
            {
                loginUser.address
                    ? <div className='mt-5'>
                        <input
                            type="radio"
                            id='cod'
                            className='form-check-input'
                            checked />
                        <label
                            className='form-check-label'
                            htmlFor="cod">
                            Pay Cash On Delivery
                        </label>

                        <br />
                        <button
                            className='btn btn-success btn-lg mt-4'
                            // onClick={e => dispatch(orderAction())}
                            onClick={handleRazorpay}
                        >
                            Place Order
                        </button>
                    </div>
                    : <Address />
            }


        </div>
    )
}
