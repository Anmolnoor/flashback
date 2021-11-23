import React, { FC, useEffect } from "react";

//  import icons
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { LikePost, SinglePost } from "../../Features/post";
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
	const data: post = useSelector((state: RootState) => state.post.posts.data[0]);
	const loggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);

	useEffect(() => {
		dispatch(SinglePost({ id }));
	}, [id]);

	return (
		<div className='single--post--container'>
			<div className='post--body'>
				<div className='post--info'>
					<div className='post--info--title'>{data.title}</div>
					<div className='post--info--creater'>- {data.creator}</div>
					<div className='post--info--tags'>
						{data.tags?.map((tag, index) => (
							<div key={index} className='postcard--tag'>
								<div>#{tag} &nbsp;</div>
							</div>
						))}
					</div>
					<div className='post--info--time'>{moment(data.createdAt).fromNow()}</div>
					<div className='post--info--message'>{data.message}</div>
					{loggedIn ? (
						<div className='post--info--btns'>
							<div
								onClick={() => {
									dispatch(LikePost({ postId: data._id }));
								}}
								className='post--info--like'>
								{data.likes?.length ? data.likes?.length : ""} <FaThumbsUp size={24} color='#111' />
							</div>
							<div className='post--info--delete'>
								<FaTrash size={24} color='#111' /> delete
							</div>
						</div>
					) : null}
				</div>
				<div className='post--image'>
					<img src={data.selectedFile} alt='post-memory-here' width='100%' />
				</div>
			</div>
			{/* <div className='related--posts--title'>Related Posts</div> */}
			<div className='post--related-posts'>{/* <Postcard /> */}</div>
		</div>
	);
};

export default SinglePostT;
