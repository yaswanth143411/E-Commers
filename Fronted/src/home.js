import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css';

const Home = () => {
    const [productlist, updateProduct] = useState([]);
    const [msg, updateMsg] = useState("");
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = () => {  
        axios.get("http://127.0.0.1:988/data")
            .then(response => {
                if (response.data.length > 0) {
                    updateProduct(response.data);
                }
            })
            .catch(error => console.error("Error fetching products:", error));
    }

    const addtoCart = (productinfo) => {
        toast.success('Item added to cart', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        const productWithNumberPrice = { ...productinfo, price: parseFloat(productinfo.price) };

        var url = "http://localhost:1234/cart";
        axios.post(url, productWithNumberPrice)
            .then(response => {
                updateMsg(productinfo.name + " Added to Cart");
            })
            .catch(error => console.error("Error adding to cart:", error));
    }

    const onChange = (e) => {
        setSearch(e.target.value);
    }

    const openDetailsModal = (product) => {
        setSelectedProduct(product);
    }

    const closeModal = () => {
        setSelectedProduct(null);
    }

    const filterByCategory = (category) => {
        setSelectedCategory(category);
    }
    

    return (
        <div>
            {/* Carousel code... */}
            <div id="carouselExampleIndicators" class="carousel slide carousel-dark" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="amazonbackground.jpg" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="amazonbackground1.jpg" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="amazonbackground2.jpg" class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            
            <div className='container mt-2'>
                <div className='row'>
                    <div className='col-lg-12 mt-5 '>
                        <select onChange={(e) => filterByCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                        </select>
                    </div>
                    <div className='col-lg-12 mb-5 d-flex flex-column align-items-center'>
                        <input type="text" value={search} onChange={onChange} placeholder="Search..." className='form-control w-25' style={{marginTop: '-40px'}} />
                        <p className='text-danger text-center mt-2' style={{ fontWeight: 'bold', fontSize: '15px' }}>{msg}</p>
                    </div>

                    {productlist.filter(product => selectedCategory ? product.pfamily.toLowerCase() === selectedCategory : true)
                    .filter(product => product.name.toLowerCase().includes(search.toLowerCase())).map((product, index) => {
                        return (
                            <div className="col-lg-3 sm-3 mb-4" key={index}>
                                <div className='p-3 shadow product-card' data-bs-toggle="modal" data-bs-target={`#details-${index}`} onClick={() => openDetailsModal(product)}>
                                    <h5 className='text-center mt-2'> {product.name} </h5>
                                    <img src={product.photo} height="140" width="100%" alt={product.name}  className='mt-2'/>
                                    <p className='text-center mt-3' style={{ fontWeight: 'bold' }}>Rs. &#8377;{product.price} </p>
                                </div>
                                {/* Product details modal */}
                                <div className="modal fade" id={`details-${index}`} tabIndex="-1" aria-labelledby={`detailsLabel-${index}`} aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`detailsLabel-${index}`}>{product.name}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <img src={product.photo} width="200" height="300" alt={product.name} />
                                                    </div>
                                                    <div className="col">
                                                        <strong class="mt-5">Details :</strong>
                                                        {/* <div>{product.details}</div> */}
                                                        <div className="details" style={{ maxWidth: "200px", wordWrap: "break-word" }}>{product.details}</div>
                                                        <div class="mt-5"><strong>Product Family : </strong>{product.pfamily}</div>
                                                        <h3 class="mt-5"><strong>Price :</strong> &#8377; {product.price}</h3>
                                                        <p class="mt-5">
                                                            <button style={{ fontWeight: 'bold' }} className='btn btn-danger btn-sm' onClick={() => addtoCart(product)}>
                                                                <i className='fa fa-shopping-cart'></i> Add to Cart
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <div class="features">
                <div>
                    <div>
                        <span class="bi bi-truck"></span> FREE SHIPPING
                    </div>
                    <div class="feature-text">
                        From all orders over $100
                    </div>
                </div>
                <div>
                    <div>
                        <span class="bi bi-arrow-repeat"></span> FREE RETURNS
                    </div>
                    <div class="feature-text">
                        Return money within 30 days
                    </div>
                </div>
                <div>
                    <div>
                        <span class="bi bi-lock"></span> SECURE SHOPPING
                    </div>
                    <div class="feature-text">
                    You're in safe hands
                </div>
            </div>
            <div>
                <div>
                    <span class="bi bi-tag"></span> OVER 10,000 STYLES
                </div>
                <div class="feature-text">
                    We have everything you need
                </div>
            </div>
        </div>
        <div class="site-main">
           <div>
             <div class="site-main-subtitle"><strong>NEW COLLECTION</strong></div>
             <div class="site-main-title">Best Picks 2024</div>
             <div class="site-main-text">
                Appear, dry there darkness they're seas, dry waters thing fly midst. Beast, above fly brought Very green.
             </div>
           </div> 
        </div>
        <footer>
        <div>
            <div class="footer-brand-title">Shopper</div>
            <div>
                <span class="bi bi-facebook"></span>
                <span class="bi bi-youtube"></span>
                <span class="bi bi-twitter"></span>
                <span class="bi bi-instagram"></span>
            </div>
        </div>
        <div>
            <div class="footer-title">SUPPORT</div>
            <span>Contact Us</span>
            <span>FAQs</span>
            <span>Size Guide</span>
            <span>Shipping & Returns</span>
        </div>
        <div>
            <div class="footer-title">SHOP</div>
            <span>Men's Shopping</span>
            <span>Women's Shopping</span>
            <span>Kids' Shopping</span>
            <span>Discounts</span>
        </div>
        <div>
            <div class="footer-title">COMPANY</div>
            <span>Our Story</span>
            <span>Careers</span>
            <span>Terms & Conditions</span>
            <span>Privacy & Cookie policy</span>
        </div>
        <div>
            <div class="footer-title">CONTACT</div>
            <address>
                <span>1-202-555-0105</span>
                <span>1-202-555-0106</span>
                <span>help@shopper.com</span>
            </address>
        </div>
   </footer>
            <ToastContainer />
        </div>
    )
}

export default Home;
