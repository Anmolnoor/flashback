import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Postcard from "../../components/PsotCard/Postcard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RootState } from "../../Store/store";
import Loader from "../../components/Loader/Loader";
// components imports

// css imports
import "./home.css";
import { FetchPosts } from "../../Features/post";
import { loadUser } from "../../Features/auth";

// declare module "react-router-dom" {
// 	export interface OutletProps {
// 		isAuthenticated?: boolean;
// 	}
// }

interface post {
	_id: string;
	title: string;
	message: string;
	tags: string[];
	likes: string[];
	creator: string;
	name: string;
}
interface payloadinta {
	user: post;
	token: string;
}

const Home: FC = () => {
	const dispatch = useDispatch();
	const [postdata, setPostdata] = useState({
		title: "",
		message: "",
		tags: [""],
		selectedFile: "",
		creator: ""
	});

	const state = useSelector((state: RootState) => state.post);

	const payload: payloadinta = {
		user: JSON.parse(localStorage.getItem("user")!),
		token: localStorage.getItem("token")!
	};

	useEffect(() => {
		// payload.user ? : console.log("login Required");
		dispatch(loadUser(payload));
		dispatch(FetchPosts({ page: 1 }));
	}, []);
	return (
		<div className='home--container'>
			<div className='home--postcards'>
				<div className='home--content'>
					{state.posts.data ? (
						state.posts.data?.map((post, index) => (
							<Postcard key={index} {...post} setPostdata={setPostdata} />
						))
					) : (
						<p>no post Loaded yet</p>
					)}
				</div>
			</div>
			<div className='home--sidebar'>
				<Sidebar postdata={postdata} setPostdata={setPostdata} />
			</div>
		</div>
	);
};

export default Home;
