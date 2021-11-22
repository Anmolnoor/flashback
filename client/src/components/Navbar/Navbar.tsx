import React, { FC } from "react";
import { NavLink } from "react-router-dom";

// Logo
import Logo from "../../images/logo.svg";
import Image from "../../images/bg.jpg";
// css imports
import "./navbar.css";

interface NavbarProps {
	isAuthenticated: boolean;
	setisAuthenticated: (open: boolean) => void;
}

const Navbar: FC<NavbarProps> = ({ isAuthenticated, setisAuthenticated }) => {
	return (
		<>
			<div className='navbar-container'>
				<NavLink to='/' className='navbar-logo'>
					<img src={Logo} alt='logo' height='70px' />
				</NavLink>
				<div className='navbar-links'>
					{isAuthenticated ? (
						<div className='navbar--profile--btn'>
							<div className='navbar--profile'>
								<img
									src={Image}
									alt='profile-user'
									style={{ borderRadius: "50px" }}
									height='60px'
									width='60px'
								/>
							</div>
							<div className='navbar--profile--name'>Anmol Noor</div>
							<div className='navbar--btn'>
								<NavLink
									to='/logout'
									onClick={() => setisAuthenticated(!isAuthenticated)}
									className='signin--btn '>
									<p>LogOut</p>
								</NavLink>
							</div>
						</div>
					) : (
						<NavLink
							to='/auth'
							onClick={() => setisAuthenticated(!isAuthenticated)}
							className='signin--btn '>
							<p>Sign IN</p>
						</NavLink>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;
