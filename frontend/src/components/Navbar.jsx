import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { logoutAction } from '../actions/authAction'
export default function Navbar() {
    const { cartItem } = useSelector(state => state.cart)
    const { loginUser } = useSelector(state => state.loggedIn)
    const history = useHistory()
    const dispatch = useDispatch()
    const handleLogout = e => {
        dispatch(logoutAction())
        history.push("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to={"/"}>SKILLSHOP</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarID"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarID">
                        <div className="navbar-nav">
                            <Link className="nav-link active" to={"/signup"}>Signup</Link>
                            <Link className="nav-link " to={"/dashboard"}>Dashboard</Link>
                            <Link className="nav-link " to={"/add-product"}>Add Product</Link>
                            {
                                loginUser?.name
                                    ? <li className="nav-item dropdown ">
                                        <a
                                            className="nav-link dropdown-toggle active"
                                            type="button"
                                            data-bs-toggle="dropdown" >
                                            Welcome {loginUser.name}
                                        </a>
                                        <ul className="dropdown-menu" >
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/profile">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/order-history
                                                        ">
                                                    Order History</Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    onClick={handleLogout}>
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    : <Link className="nav-link " to={"/login"}>Login</Link>
                            }

                            <Link className="nav-link " to={"/cart"}>
                                Cart
                                {/* <span className="badge bg-dark">{cartItem.length}</span> */}
                                <span className="badge bg-dark">{cartItem.reduce((sum, item) => sum + item.qty, 0)}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
