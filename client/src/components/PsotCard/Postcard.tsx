import React, { FC } from "react";

// css imports
import "./postcard.css";

// image imports
import Image from "../../images/bg.jpg";
import { Link } from "react-router-dom";

const Postcard: FC = () => {
	return (
		<Link to='/post/thisisatest' className='postcard-container'>
			<div className='postcard-header'>
				<div className='postcard--image'>
					<img src={Image} alt='postcard' height='240px' />
				</div>
				<div className='postcard--creater'>Anmol Noor</div>
				<div className='postcard--time'> 2 days ago</div>
				<div className='postcard--options'>O</div>
			</div>
			<div className='postcard-body'>
				<div className='postcard--tags'>this is a tag </div>
				<div className='postcard--title'>This is the title </div>
				<div className='postcard--message'>The message gose here...</div>
				<div className='postcard--btns'>
					<div className='postard--btn--like postcard--btn'>Like</div>
					<div className='postard--btn--delete postcard--btn'>Delete</div>
				</div>
			</div>
		</Link>
	);
};

export default Postcard;
