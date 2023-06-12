import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { emptyCartAction } from '../actions/cartAction'
import CartProduct from '../components/CartProduct'

export default function Cart({ history }) {
    const { cartItem } = useSelector(state => state.cart)
    const { loginUser } = useSelector(state => state.loggedIn)
    const dispatch = useDispatch()
    const handleCheckout = e => {
        if (loginUser) {
            history.push("/summary")
        } else {
            history.push("/login")
        }
    }
    return (
        <div className='container'>
            <div className='d-flex justify-content-between mt-4'>
                <Link className="btn btn-light btn-sm" to="/">back</Link>
                <div>
                    {
                        cartItem.length > 0
                        && <div>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={e => dispatch(emptyCartAction())}
                            >Empty Cart</button>
                            <button
                                className="btn btn-success btn-lg mx-4"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className="row">
                {
                    cartItem.length > 0
                        ? cartItem.map(item => {
                            return <CartProduct item={item} />
                        })
                        : <h1>Cart is Epmty</h1>
                }
            </div>

        </div>
    )
}
