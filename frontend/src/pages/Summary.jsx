import React from 'react'
import { useSelector } from "react-redux"
export default function Summary({ history }) {
    const { cartItem } = useSelector(state => state.cart)
    return (
        <div className='container'>
            <ul className="list-group mt-5">
                <div className=' mb-4 d-flex justify-content-end'>
                    <button onClick={e => history.push("/payment")} className="btn btn-success">Proceed To Pay</button>
                </div>
                {
                    cartItem.map(item => {
                        return <li className='list-group-item'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <img
                                    src={`${process.env.REACT_APP_URL}/${item.image}`}
                                    alt=""
                                    height={100}
                                    width={100}
                                />
                                <h2>{`${item.qty} X ${item.price}`}</h2>
                                <h2>{item.qty * item.price}</h2>
                            </div>
                        </li>
                    })
                }


            </ul>
        </div>
    )
}
