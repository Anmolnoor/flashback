import react, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

// Pages imports
import Home from "../Pages/Home/Home";
import Auth from "../Pages/Auth/Auth";
import SinglePost from "../Pages/Post/SinglePost";
// Components imports

const MainRoutes = () => {
	const [isAuthenticated, setisAuthenticated] = useState(false);
	const Err = () => {
		return (
			<div>
				<h1>Error 404</h1>
				<p>Page not found</p>
			</div>
		);
	};

	return (
		<Router>
			<Navbar isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} />
			<Routes>
				<Route path='/' element={<Navigate replace to='/posts' />} />
				<Route path='/posts' element={<Outlet />}>
					<Route path='' element={<Home />} />
				</Route>
				<Route path='/post' element={<Outlet />}>
					<Route path='' element={<Navigate replace to='/' />} />
					<Route path=':id' element={<SinglePost />} />
				</Route>

				<Route path='auth' element={isAuthenticated ? <Navigate replace to='/posts' /> : <Auth />} />
				<Route path='logout' element={<Navigate replace to='/' />} />
				<Route path='*' element={<Err />} />
			</Routes>
		</Router>
	);
};

export default MainRoutes;
