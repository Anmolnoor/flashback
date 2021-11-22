import React, { FC } from "react";

//  import icons
import { FaThumbsUp, FaTrash } from "react-icons/fa";

// css imports
import "./singlepost.css";

// image imports
import Image from "../../images/bg.jpg";
import Postcard from "../../components/PsotCard/Postcard";
// interface SinglePostProps {
// 	isAuthenticated: boolean;
// }

const SinglePost: FC = () => {
	return (
		<div className='single--post--container'>
			<div className='post--body'>
				<div className='post--info'>
					<div className='post--info--title'>This is the title</div>
					<div className='post--info--creater'>- Anmol Noor</div>
					<div className='post--info--tags'>#this #is #a #tag #here</div>
					<div className='post--info--time'>2 days ago</div>
					<div className='post--info--message'>The message gose here...</div>
					<div className='post--info--btns'>
						<div className='post--info--like'>
							<FaThumbsUp size={24} color='#111' /> Like
						</div>
						<div className='post--info--delete'>
							<FaTrash size={24} color='#111' /> delete
						</div>
					</div>
				</div>
				<div className='post--image'>
					<img src={Image} alt='post-memory-here' width='100%' />
				</div>
			</div>
			<div className='related--posts--title'>Related Posts</div>
			<div className='post--related-posts'>
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
	);
};

export default SinglePost;

{
	/* <img src={Image} alt='postcard' height='240px' />
Anmol Noor
2 days ago
O

>this is a tag 
 */
}

// The message gose here...
// Like;
// Delete;
