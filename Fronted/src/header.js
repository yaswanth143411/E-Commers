import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomeHeader = ({ cartItemCount, addToCart }) => {
    const [showCategories, setShowCategories] = useState(false);
    const [search, setSearch] = useState(false);

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const toggleSearch = () => {
        setSearch(prevState => !prevState);
    };

    const onChange = (e) => {
        setSearch(e.target.value);
    };
    
    

    return (
        <div>
            <header>
                <div>
                    <span className="a">Shopper.</span>
                </div>
                <nav className="first">  
                    <ul>   
                        <li><Link className="nav-link active" to="/">Home</Link></li>
                        {/* <li onMouseEnter={toggleCategories} onMouseLeave={toggleCategories} onClick={toggleCategories}>
                            <span className="nav-link active mt-2">Categories</span>
                            {showCategories && (
                                <ul className="submenu">
                                    <li><Link className="nav-link active" to="/">Electronics</Link></li>
                                    <li><Link className="nav-link active" to="/">Fashion</Link></li>
                                </ul>
                            )}
                        </li> */}
                        {/* <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </a>
                            <ul class="dropdown-menu">
                                <li><Link className="nav-link active" to="/Electronics">Electronics</Link></li>
                                <li><Link className="nav-link active" to="/fashion">Fashion</Link></li>
                            </ul>
                        </li> */}
                        {/* <li><Link className="nav-link active" to="/cart">My Cart</Link></li> */}
                        <li><Link className="nav-link active" to="/login">Admin Login</Link></li>
                    </ul>
                </nav>
                <div className="icons">
                    <div className="search-icon-container">
                        <span className="fa fa-search icon" onClick={toggleSearch}></span>
                        <input
                            className={`p-1 shadow form-control search-input ${search ? 'show' : ''}`}
                            type='text'
                            placeholder='Search here'   
                        />
                    </div>
                    <span className="fa fa-heart icon"></span>
                    <Link to="/cart" className="bi bi-cart4 icon" style={{color:'white'}}>
                        <span class="badge position-absolute top-0 end-0 bg-danger rounded-circle" id="lblCount"></span>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default HomeHeader;
