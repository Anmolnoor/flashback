import React, { FC, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

//  import icons
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
	LikePost,
	SinglePost,
	DeletePost,
	postComment,
	getComment
} from "../../Features/post";

// css imports
import "./singlepost.css";

// image imports
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import moment from "moment";
import { loadUser } from "../../Features/auth";

interface post {
	_id: string;
	title: string;
	message: string;
	tags: string[];
	likes: string[];
	selectedFile: string;
	creator: string;
	createdAt: string;
}

interface user {
	_id: string;
	title: string;
	message: string;
	tags: string[];
	likes: string[];
	creator: string;
	name: string;
}

interface payloadinta {
	user: user;
	token: string;
}

const SinglePostT: FC = () => {
	const { id } = useParams<string>();
	const [comment, setcomment] = useState("");
	const dispatch = useDispatch();
	// console.log({ id });
	const data = useSelector((state: RootState) => state.post.posts.data[0]);

	const userState = useSelector((state: RootState) => state.auth);

	const loaderState = useSelector(
		(state: RootState) => state.post.posts.loading
	);

	const comments = useSelector((state: RootState) => state.post.posts.comments);

	const deletePosthandler = () => {
		console.log("delete post", { id: data._id });
		dispatch(DeletePost({ id: data._id }));
	};

	const payload: payloadinta = {
		user: JSON.parse(localStorage.getItem("user")!),
		token: localStorage.getItem("token")!
	};

	useEffect(() => {
		dispatch(loadUser(payload));
		dispatch(getComment({ id: id! }));
		dispatch(SinglePost({ id }));
	}, []);

	return (
		<div className='single--post--container'>
			{loaderState ? (
				<div className='test'>
					<div className='Loader--home'>
						<Loader />
					</div>
				</div>
			) : data ? (
				<div className='post--body'>
					<div className='post--info'>
						<div className='post--info--title'>{data.title}</div>
						<div className='post--info--creater'>
							- {data.creator}{" "}
							<div className='post--info--time'>
								{moment(data.createdAt).fromNow()}
							</div>
						</div>

						<div className='post--info--tags'>
							{data.tags?.map((tag, index) => (
								<div key={index} className='postcard--tag'>
									<div>#{tag} &nbsp;</div>
								</div>
							))}
						</div>
						<div className='post--info--message'>{data.message}</div>
						{userState.isAuthenticated ? (
							<>
								<div className='post--info--btns'>
									<div
										onClick={() => {
											dispatch(LikePost({ postId: data._id }));
										}}
										className='post--info--like'>
										{data.likes?.length ? data.likes?.length : ""}{" "}
										<FaThumbsUp size={24} color='#111' />
									</div>
									{data.creator === userState.user?.name ? (
										<div
											onClick={deletePosthandler}
											className='post--info--delete'>
											<FaTrash size={24} color='#111' />
											delete
										</div>
									) : null}
								</div>

								<div className='post--info--comment'>
									<div className='post--info--comment--posted'>
										<div className='post--info--comment--title'>Comments</div>

										<div className='post--info--comment--posted--obj'>
											{comments.map((el, index) => {
												return (
													<div key={index}>
														<div className='post--info--comment--posted--owner'>
															{el.userId.name}
														</div>
														<div className='post--info--comment--posted--comment'>
															{el.comment}
														</div>
													</div>
												);
											})}
										</div>
									</div>
									<div className='post--info--comment--post'>
										<div className='post--info--comment--title'>
											Write a comment
										</div>
										<textarea
											// rows={2}
											className='post--info--comment--post--textbox'
											placeholder='Write your comment here'
											onChange={(e) => setcomment(e.target.value)}
											value={comment}
										/>
										<div
											className='post--info--comment--post--submitbtn'
											onClick={() => {
												if (comment) {
													dispatch(postComment({ comment, id: data._id }));
													dispatch(getComment({ id: data._id }));
												}
											}}>
											Comment
										</div>
									</div>
								</div>
							</>
						) : null}
					</div>
					<div className='post--image'>
						<img src={data.selectedFile} alt='post-memory-here' width='100%' />
					</div>
				</div>
			) : null}
			{/* <div className='related--posts--title'>Related Posts</div> */}
			<div className='post--related-posts'>{/* <Postcard /> */}</div>
		</div>
	);
};

export default SinglePostT;

// <div className='post--info--comment'>
// 	<div className='post--info--comment--posted'>
// 		<div className='post--info--comment--title'>Comments</div>
// 		{comments.map((comment) => {})}
// 	</div>
// 	<div className='post--info--comment--posted--obj'>
// 		<div className='post--info--comment--posted--owner'>
// 			{/* {comment.userId.name}
// 													{console.log({
// 														"this is the fucking data ": comment
// 													})} */}
// 			A
// 		</div>
// 		<div className='post--info--comment--posted--comment'>
// 			{/* {comment.comment} */}A
// 		</div>
// 	</div>
// 	;
// 	<div className='post--info--comment--post'>
// 		<div className='post--info--comment--title'>Write a comment</div>
// 		<textarea
// 			// rows={2}
// 			className='post--info--comment--post--textbox'
// 			placeholder='Write your comment here'
// 			onChange={(e) => setcomment(e.target.value)}
// 			value={comment}
// 		/>
// 		<div
// 			className='post--info--comment--post--submitbtn'
// 			onClick={() => {
// 				if (comment) {
// 					dispatch(postComment({ comment, id: userId }));
// 				}
// 			}}>
// 			Comment
// 		</div>
// 	</div>
// </div>;
