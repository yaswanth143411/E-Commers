import {HashRouter, Routes, Route} from 'react-router-dom';

import Dashboard from "./admin/dashboard";
import AdminProduct from './admin/product';
import AdminOrder from './admin/order';

function App(){
	return(
		   <HashRouter>
				<Routes>
					<Route exact path="/" element={<Dashboard/>} />
					<Route exact path="/dashboard" element={<Dashboard/>} />
					<Route exact path="/manageproduct" element={<AdminProduct/>} />
					<Route exact path="/manageorder" element={<AdminOrder/>} />
				</Routes>
		   </HashRouter>
		)
}
export default App;