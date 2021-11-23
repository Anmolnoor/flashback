import React, { FC } from "react";
import { NavLink } from "react-router-dom";

// Logo
import Logo from "../../images/logo.svg";
import Image from "../../images/bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
// css imports
import "./navbar.css";
import { logout } from "../../Features/auth";

interface NavbarProps {
	isAuthenticated?: boolean;
	setisAuthenticated?: (open: boolean) => void;
}

const Navbar: FC<NavbarProps> = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<>
			<div className='navbar-container'>
				<NavLink to='/' className='navbar-logo'>
					<img src={Logo} alt='logo' height='70px' />
				</NavLink>
				<div className='navbar-links'>
					{auth.isAuthenticated ? (
						<div className='navbar--profile--btn'>
							<div className='navbar--profile'>
								{auth.user?.name.charAt(0)}
								{/* <img
									src={Image}
									alt='profile-user'
									style={{ borderRadius: "50px" }}
									height='60px'
									width='60px'
								/> */}
							</div>
							<div className='navbar--profile--name'>{auth.user?.name}</div>
							<div className='navbar--btn'>
								<NavLink to='/logout' onClick={logoutHandler} className='signin--btn '>
									<p>LogOut</p>
								</NavLink>
							</div>
						</div>
					) : (
						<NavLink to='/auth' className='signin--btn '>
							<p>Sign IN</p>
						</NavLink>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;
