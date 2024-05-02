import React, { useState, useEffect } from 'react';
import AdminHeader from './adminheader';
import axios from 'axios';
import './dashboard.css'; // Import CSS file for styles

const Dashboard = () => {
    const [allProduct, updateProduct] = useState([]);
    const [allOrders, updateOrder] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    // const getProduct = () => {
    //     axios.get("http://localhost:1234/product")
    //         .then(response => {
    //             if (response.data.length > 0) {
    //                 updateProduct(response.data);
    //             }
    //         })
    // }


    const getProduct = () => {
        axios.get("http://127.0.0.1:988/data")
            .then(response=>{
                console.log("Product data:", response.data);
                if(response.data.length>0){
                    updateProduct(response.data);
                }
            })
            .catch(error => console.error("Error fetching products:", error));
    }



    // const getOrders = () => {
    //     axios.get("http://localhost:1234/order")
    //         .then(response => {
    //             if (response.data.length > 0) {
    //                 updateOrder(response.data);
    //             }
    //         })
    // }


    const getOrders = () => {
        axios.get("http://localhost:1234/order")
            .then(response=>{
                console.log("Order data:", response.data);
                if(response.data.length>0){
                    updateOrder(response.data);
                }
            })
            .catch(error => console.error("Error fetching orders:", error));
    }



    useEffect(() => {
        getProduct();
        getOrders();
    }, []);

    useEffect(() => {
        // Counting animation effect
        const productCountInterval = setInterval(() => {
            setProductCount(count => {
                const newCount = allProduct.length;
                return newCount === count ? count : count + 1;
            });
        }, 100);

        const orderCountInterval = setInterval(() => {
            setOrderCount(count => {
                const newCount = allOrders.length;
                return newCount === count ? count : count + 1;
            });
        }, 100);

        // Clear intervals on component unmount
        return () => {
            clearInterval(productCountInterval);
            clearInterval(orderCountInterval);
        };
    }, [allProduct, allOrders]);

    return (
        <>
            <AdminHeader />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-12 text-center slide-from-top'>
                        <h3>Dashboard</h3>
                    </div>
                </div>
                <div className='row mt-4 text-center'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-4'>
                        <div className='p-4 rounded shadow text-white bg-info hover-effect slide-from-left'>
                            <i className="fa fa-suitcase fa-2x"></i>
                            <h5 className="count-effect">Total Products <br /> {productCount}</h5>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='p-4 rounded shadow text-white bg-warning hover-effect slide-from-right'>
                            <i className="fa fa-phone fa-2x"></i>
                            <h5 className="count-effect">Total Orders <br /> {orderCount}</h5>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
