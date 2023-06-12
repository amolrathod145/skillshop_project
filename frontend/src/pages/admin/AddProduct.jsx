import React, { useState } from 'react'
import axios from "axios";
export default function AddProduct() {
    const [name, setname] = useState()
    const [brand, setbrand] = useState()
    const [price, setprice] = useState()
    const [image, setimage] = useState()
    const [description, setdescription] = useState()
    const [stock, setstock] = useState()
    const [category, setcategory] = useState()

    const [preview, setpreview] = useState()
    const [isDisable, setisDisable] = useState(true)
    const handleImageUpload = e => {
        // console.log(e.target.files[0]);
        setimage(e.target.files[0])
        console.log(URL.createObjectURL(e.target.files[0]));
        setpreview(URL.createObjectURL(e.target.files[0]))

    }
    const handleAddProduct = async e => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("name", name)
        fd.append("brand", brand)
        fd.append("price", price)
        fd.append("image", image)
        fd.append("description", description)
        fd.append("stock", stock)
        fd.append("category", category)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/product/add-product`, fd, config)
        setpreview(null)
        e.target.reset()
    }
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card">
                            <div className="card-header">Add Product</div>
                            <div className="card-body">
                                <form onSubmit={handleAddProduct}>
                                    <input onChange={e => setname(e.target.value)} type="text" placeholder='name' className="form-control" />
                                    <br />
                                    <input onChange={e => setbrand(e.target.value)} type="text" placeholder='brand' className="form-control" />
                                    <br />
                                    <input onChange={e => setprice(e.target.value)} type="number" placeholder='price' className="form-control" />
                                    <br />
                                    <div className='d-flex' >
                                        <input onChange={handleImageUpload} type="file" placeholder='image' className="form-control" />
                                        <img src={preview} height="40" />
                                    </div>
                                    <br />
                                    <textarea onChange={e => setdescription(e.target.value)} type="text" placeholder='description' className="form-control" ></textarea>
                                    <br />
                                    <input onChange={e => setstock(e.target.value)} type="number" placeholder='stock' className="form-control" />
                                    <br />
                                    <input onChange={e => setcategory(e.target.value)} type="text" placeholder='category' className="form-control" />
                                    <br />
                                    {/* <button className="btn btn-success w-100" disabled={isDisable ? true : false}>Add Product</button> */}
                                    <button className="btn btn-success w-100" >Add Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
