import React, { FC, useEffect } from "react";
import Loader from "../../components/Loader/Loader";

//  import icons
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { LikePost, SinglePost, DeletePost } from "../../Features/post";

// css imports
import "./singlepost.css";

// image imports
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import moment from "moment";

interface post {
	_id: string;
	title: string;
	message: string;
	tags: string[];
	likes: string[];
	selectedFile: string;
	creator: string;
	createdAt: string;
	createdby: string;
}

const SinglePostT: FC = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	console.log({ id });
	const data: post = useSelector(
		(state: RootState) => state.post.posts.data[0]
	);
	const userState = useSelector((state: RootState) => state.auth);
	const loaderState = useSelector(
		(state: RootState) => state.post.posts.loading
	);

	const deletePosthandler = () => {
		console.log("delete post", { id: data._id });
		dispatch(DeletePost({ id: data._id }));
	};

	useEffect(() => {
		dispatch(SinglePost({ id }));
	}, [id]);

	return (
		<div className='single--post--container'>
			{loaderState ? (
				<div className='test'>
					<div className='Loader--home'>
						<Loader />
					</div>
				</div>
			) : (
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
											<div className='post--info--comment--posted--owner'>
												Anmol Noor
											</div>
											<div className='post--info--comment--posted--comment'>
												This is a test comment. This is a commet here releated
												with this post
											</div>
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
										/>
										<div className='post--info--comment--post--submitbtn'>
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
			)}
			{/* <div className='related--posts--title'>Related Posts</div> */}
			<div className='post--related-posts'>{/* <Postcard /> */}</div>
		</div>
	);
};

export default SinglePostT;
