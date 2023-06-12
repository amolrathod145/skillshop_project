import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addAddressAction } from '../actions/userAction';
export default function Address() {
    const dispatch = useDispatch()
    const [address, setaddress] = useState({
        house: "",
        street: "",
        city: "",
        pin: ""
    })
    const handleAddAddress = e => {
        e.preventDefault()
        dispatch(addAddressAction(address))
        e.target.reset()
    }
    return (
        <div className='card'>

            <div className="card-body">
                <form onSubmit={handleAddAddress}>
                    <input onChange={e => setaddress({ ...address, house: e.target.value })} placeholder='house' type="text" className="form-control" />
                    <br />
                    <input onChange={e => setaddress({ ...address, street: e.target.value })} placeholder='street' type="text" className="form-control" />
                    <br />
                    <input onChange={e => setaddress({ ...address, city: e.target.value })} placeholder='city' type="text" className="form-control" />
                    <br />
                    <input onChange={e => setaddress({ ...address, pin: e.target.value })} placeholder='pin' type="text" className="form-control" />
                    <br />
                    <button className="btn btn-success w-100">Add Address</button>
                </form>
            </div>
        </div>
    )
}
