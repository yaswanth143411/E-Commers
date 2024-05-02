import React,{useState} from 'react';
import {Link} from 'react-router-dom';


const AdminHeader = () =>{  

        return(
            <div>
                <header>
                    <div>
                        <span className="a">Shopper.</span>
                    </div>
                    <nav className="first">
                        <ul>
                            <li><Link className="nav-link active" to="/dashboard">Dashboard</Link></li>
                            <li><Link className="nav-link active" to="/manageorder">Orders</Link></li>
                            <li><Link className="nav-link active" to="/manageproduct">Products</Link></li>
                        </ul>
                    </nav>
                    <div className="icons">
                        <Link className="nav-link active" onClick={logout}>Logout</Link>
                    </div>
                </header>
            </div>
        )
}
export default AdminHeader;

const logout = () =>{
    localStorage.clear();// it clear history of browser
    window.location.href="http://localhost:3000/#/login"; // redirect to login page
    window.location.reload();// after goining to login page it will reload again
}