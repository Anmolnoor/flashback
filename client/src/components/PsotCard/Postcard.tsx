import React, { FC } from "react";
import moment from "moment";
// import Like from "./Like";
// css imports
import "./postcard.css";

// image imports
// import Image from "../../images/bg.jpg";
import { Link } from "react-router-dom";
import { FaEllipsisV, FaThumbsUp, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { DeletePost, LikePost, setPostData } from "../../Features/post";
import { RootState } from "../../Store/store";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Store/store";

interface postdata {
	_id: string;
	title: string;
	message: string;
	tags: string[];
	selectedFile: string;
	creator: string;
}
interface PostcardProps {
	_id: string;
	creator: string;
	createdAt: string;
	tags: string[];
	title: string;
	message: string;
	likes: string[];
	selectedFile: string;
	createdby: string;
	// setPostdata: React.Dispatch<React.SetStateAction<postdata>>;
}

const Postcard: FC<PostcardProps> = ({
	_id,
	creator,
	likes,
	message,
	selectedFile,
	tags,
	createdAt,
	title,
	createdby
	// setPostdata
}) => {
	const userState = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch();
	const deletePosthandler = () => {
		console.log("delete post", { id: _id });
		dispatch(DeletePost({ id: _id }));
	};

	const optionHandler = () => {
		// console.log("clicked");
		// console.log(selectedFile);

		dispatch(
			setPostData({
				_id,
				title,
				message,
				tags,
				selectedFile,
				creator,
				createdAt,
				createdby,
				likes
			})
		);
		// setPostdata({
		// 	_id,
		// 	title,
		// 	message,
		// 	tags,
		// 	selectedFile,
		// 	creator
		// });
	};

	return (
		<div className='postcard-container'>
			<div className='postcard-header'>
				<div className='postcard--image'>
					<img src={selectedFile} alt='postcard' height='240px' />
				</div>
				<div className='postcard--creater'>{creator}</div>
				<div className='postcard--time'> {moment(createdAt).fromNow()}</div>

				{creator === userState.user?.name ? (
					<div onClick={optionHandler} className='postcard--options'>
						<FaEllipsisV size={30} color='#fff' />
					</div>
				) : null}
			</div>
			<div className='postcard-body'>
				<div className='postcard--tags'>
					{tags?.map((tag, index) => (
						<div key={index} className='postcard--tag'>
							<div>#{tag} &nbsp;</div>
						</div>
					))}
				</div>
				<Link to={`/post/${_id}`} className='postcard--link'>
					<div className='postcard--title'>{title} </div>
					<div className='postcard--message'>{message}</div>
				</Link>
				{userState.isAuthenticated ? (
					<div className='postcard--btns'>
						<div className='postard--btn--like postcard--btn'>
							<div
								onClick={() => {
									// console.log("this is working");

									dispatch(LikePost({ postId: _id }));
								}}
								className='postcard--info--like'>
								{/* <Like likes={likes} userId={userId} /> */}
								{likes?.length ? likes?.length : ""}{" "}
								<FaThumbsUp size={24} color='#111' />
							</div>
						</div>
						{creator === userState.user?.name ? (
							<div
								onClick={deletePosthandler}
								className='postard--btn--delete postcard--btn'>
								<FaTrash size={24} color='#111' />
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Postcard;
