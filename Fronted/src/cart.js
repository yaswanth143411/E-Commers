/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './cart.css'

const Cart  = () =>{

    const[productlist, updateProduct] = useState([]);
    const[fullname, pickName] = useState("");
    const[mobileno, pickMobile] = useState("");
    const[email, pickEmail] = useState("");
    const[address, pickAddress] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);



    const getProduct = () =>{
        axios.get("http://127.0.0.1:988/data")
        .then(response=>{
            if(response.data.length > 0){
                updateProduct(response.data);
                setTotalPrice(calculateTotalPrice(response.data));
            }
        })
    }



    const deleteFromCart = (id) =>{
        var url = "http://127.0.0.1:988/delete/"+id;
        axios.delete(url)
        .then(response=>{
            if(response.data.length === 0)
            {
                updateProduct([]);
                setTotalPrice(0);
            } 
            else{
                getProduct();// to reload the cart list after delete
            }
        })
    }



    useEffect(()=>{
        getProduct();
    }, []);




    const saveOrder = () =>{
        var url = "http://localhost:1234/order";
        var orderData = {
            "customername":fullname, 
            "mobile":mobileno,
            "email":email,
            "address":address,
            "product":productlist
        };
        axios.post(url, orderData)
        .then(response=>{
            alert("Your Order Placed Successfully");
        })
    }
    


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        productlist.forEach((item) => {
            totalPrice += item.price;
        });
        return totalPrice;
    };


    return(
        <div className='container mt-5' style={{animation: 'pop-in 0.5s ease-out'}}>
            <div className='row'>
                <div className='col-lg-4'>
                    <div className="p-3 shadow rounded">
                        <h4> Customer Details </h4>
                        <div className='mb-3'>
                            <label>Customer Name</label>
                            <input type="text" className='form-control'
                            onChange={obj=>pickName(obj.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <label>Customer Mobile No</label>
                            <input type="text" className='form-control'
                            onChange={obj=>pickMobile(obj.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <label>Customer e-Mail Id</label>
                            <input type="text" className='form-control'
                            onChange={obj=>pickEmail(obj.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <label>Customer Address</label>
                            <textarea className='form-control'
                            onChange={obj=>pickAddress(obj.target.value)}></textarea>
                        </div>
                        <button className="btn btn-primary" onClick={saveOrder}>
                            Place My Order
                        </button>
                    </div>
                </div>
                <div className='col-lg-8' style={{ animation: 'pop-in 0.5s ease-out' }}>
                    <h4 className='text-center'> Shopping Carts : {productlist.length} </h4>
                    <div className="shadow mt-3 cart-container" style={{backgroundColor: '#f0f0f0'}}>
                        <div className="d-flex justify-content-between border-bottom pb-2" style={{background:'skyblue', padding: '10px', borderRadius:'5px'}}>
                            <div className='text-center flex-grow-1 item-heading'>Item Name</div>
                            <div className='text-center flex-grow-1 item-heading'>Item Price</div>
                            <div className='text-center flex-grow-1 item-heading'>Item Quantity</div>
                            <div className='text-center flex-grow-1 item-heading'>Action</div>
                        </div>
                        {productlist.map((product, index) => (

                            <div key={index} className="d-flex justify-content-between align-items-center py-2">
                                <div className='text-center flex-grow-1'>
                                    <img src={product.photo} className="product-image" alt={product.name} />
                                    <p style={{fontSize:'10px', fontWeight:'bold'}}>{product.name}</p>
                                </div>
                                <div className='text-center flex-grow-1'>&#8377; {product.price}</div>
                                <div className='text-center flex-grow-1'>1</div>
                                <div className='text-center flex-grow-1'>
                                    <i
                                        className='bi bi-trash text-danger delete-icon'
                                        onClick={() => deleteFromCart(product.id)}>
                                    </i>
                                </div>
                            </div>
                        ))}

                        <hr />
                        <div className="mt-3 text-center" style={{fontWeight:'bold'}}>
                            Total Price: &#8377; {calculateTotalPrice()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;