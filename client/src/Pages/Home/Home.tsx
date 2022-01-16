import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// components imports

import Postcard from "../../components/PsotCard/Postcard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RootState } from "../../Store/store";
import Loader from "../../components/Loader/Loader";
import { FetchPosts } from "../../Features/post";
import { loadUser, logout } from "../../Features/auth";

// css imports
import "./home.css";
import Swal from "sweetalert2";

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
	// const [postdata, setPostdata] = useState({
	// _id: "",
	// title: "",
	// message: "",
	// tags: [""],
	// selectedFile: "",
	// creator: ""
	// });

	const state = useSelector((state: RootState) => state.post);
	const userState = useSelector((state: RootState) => state.auth.error);
	const loaderState = useSelector(
		(state: RootState) => state.post.posts.loading
	);

	const payload: payloadinta = {
		user: JSON.parse(localStorage.getItem("user")!),
		token: localStorage.getItem("token")!
	};

	if (userState === 403) {
		dispatch(logout());
		Swal.fire("Session Expired!!", "Please Login Again", "error");
	}
	useEffect(() => {
		dispatch(loadUser(payload));
		dispatch(FetchPosts({ page: 1 }));
	}, []);

	return (
		<div className='home--container'>
			{loaderState ? (
				<div className='test'>
					<div className='Loader--home'>
						<Loader />
					</div>
				</div>
			) : (
				<div className='home--postcards'>
					<div className='home--content'>
						{state.posts.data.length > 0 ? (
							state.posts.data?.map((post, index) => (
								<Postcard
									key={index}
									{...post}
									// setPostdata={setPostdata}
								/>
							))
						) : (
							<>
								<p>No Post Found!!!</p>
							</>
						)}
					</div>
				</div>
			)}
			<div className='home--sidebar'>
				<Sidebar
				//  postdata={postdata}
				// setPostdata={setPostdata}
				/>
			</div>
		</div>
	);
};

export default Home;
