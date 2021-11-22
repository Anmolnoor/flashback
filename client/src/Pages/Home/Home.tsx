import React, { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Postcard from "../../components/PsotCard/Postcard";
import Sidebar from "../../components/Sidebar/Sidebar";

// components imports

// css imports
import "./home.css";

// declare module "react-router-dom" {
// 	export interface OutletProps {
// 		isAuthenticated?: boolean;
// 	}
// }
interface HomeProps {
	isAuthenticated: boolean;
}

const Home: FC<HomeProps> = ({ isAuthenticated }) => {
	return (
		<div className='home--container'>
			<div className='home--postcards'>
				<div className='home--content'>
					<Postcard />
					<Postcard />
					<Postcard />
					<Postcard />
					<Postcard />
					<Postcard />
					<Postcard />
					<Postcard />
					<Postcard />
					<Postcard />
				</div>
			</div>
			<div className='home--sidebar'>
				<Sidebar isAuthenticated={isAuthenticated} />
			</div>
		</div>
	);
};

export default Home;
