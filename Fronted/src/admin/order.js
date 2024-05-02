
import React, { useState, useEffect } from 'react';
import AdminHeader from './adminheader';
import axios from 'axios';
import './order.css'; 

const AdminOrder = () => {
    const [order, updateOrder] = useState([]);
    const [animationLoaded, setAnimationLoaded] = useState(false);

    const getOrders = () => {
        axios.get("http://localhost:1234/order")
            .then(response => {
                if (response.data.length > 0) {
                    updateOrder(response.data.reverse());
                }
            })
    }

    useEffect(() => {
        getOrders();
        setAnimationLoaded(true);
    }, []);

    return (
        <>
            <AdminHeader />
            <div className={`container mt-5 ${animationLoaded ? 'animation-loaded' : ''}`}>
                <div className="row">
                    <div className='col-lg-12 mb-4 text-center'>
                        <h3 className="order-management-heading slide-from-top"> Total Orders - {order.length} </h3>
                    </div>
                </div>
                {order.map((myorder, index) => {
                    return (
                        <div className="row mb-5 border-bottom animated-order" key={index}>
                            <div className='col-lg-4 customer-details slide-from-left'>
                                <h5 className="text-center text-dark"> Customer Details </h5>
                                <p className="text-center">{myorder.customername}</p>
                                <p className="text-center">{myorder.mobile}</p>
                                <p className="text-center">{myorder.email}</p>
                                <p className="text-center">{myorder.address}</p>
                            </div>
                            <div className='col-lg-8 order-details'>
                                <div className='col-lg-7 order-details-container slide-from-right'>
                                    <h5 className='text-center order-items-heading'> Order Items - {myorder.product.length} </h5>
                                    <div className="shadow mt-3 cart-container">
                                        <div className="d-flex justify-content-between border-bottom pb-2 order-details-header">
                                            <div className='text-center item-heading'>Image</div>
                                            <div className='text-center item-heading'>Name</div>
                                            <div className='text-center item-heading'>Price</div>
                                        </div>
                                        {myorder.product.map((pinfo, index2) => (
                                            <div key={index2} className="d-flex justify-content-between align-items-center py-2 order-item">
                                                <div className='text-center item-name'>
                                                    <img src={pinfo.photo} className="product-image" alt={pinfo.name} />
                                                </div>
                                                <div className='text-center bold'>{pinfo.name}</div>
                                                <div className='text-center item-price'>&#8377; {pinfo.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default AdminOrder;
