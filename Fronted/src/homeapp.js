import {HashRouter, Routes, Route} from 'react-router-dom';

import Home from "./home";
import HomeHeader from './header';
import Cart from './cart';
import Login from './login';

function HomeApp(){
	return(
		   <HashRouter>
                <HomeHeader/>
				<Routes>
					<Route exact path="/" element={<Home/>} />
					<Route exact path="/cart" element={<Cart/>} />
					<Route exact path="/login" element={<Login/>} />
				</Routes>
		   </HashRouter>
		)
}
export default HomeApp;