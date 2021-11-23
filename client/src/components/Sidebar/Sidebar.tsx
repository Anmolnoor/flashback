import React, { FC, useState } from "react";
import FileBase from "react-file-base64";
import { FaFolderPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost, FetchPosts, SearchPost } from "../../Features/post";
import { RootState } from "../../Store/store";
import "./sidebar.css";

interface postdata {
	title: string;
	message: string;
	tags: string[];
	selectedFile: string;
	creator: string;
}
interface siderbarProps {
	postdata: postdata;
	setPostdata: React.Dispatch<React.SetStateAction<postdata>>;
}

const Sidebar: FC<siderbarProps> = ({ postdata, setPostdata }) => {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.auth);
	const pageState = useSelector((state: RootState) => state.post);
	const [search, setSearch] = useState({
		search: "",
		tags: ""
	});

	const user = localStorage.getItem("name");

	const searchHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		dispatch(SearchPost(search));
	};

	const postHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		// console.log(postdata);
		dispatch(CreatePost(postdata));
	};

	const pageHandler1 = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		dispatch(FetchPosts({ page: 1 }));
	};
	const pageHandler2 = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		dispatch(FetchPosts({ page: 2 }));
	};

	return (
		<div className='sidebar--container '>
			<div className='sidebar--search--area sidebar--post--area'>
				<div className='sidebar--form--input'>
					<div className='form-input'>
						<label htmlFor='title'>Search</label>
						<input
							type='text'
							id='title'
							value={search.search}
							onChange={(e) => setSearch({ ...search, search: e.target.value })}
						/>
					</div>
					<div className='form-input'>
						<label htmlFor='title'>Tags (Comma-separated)</label>
						<input
							type='text'
							id='title'
							value={search.tags}
							onChange={(e) => setSearch({ ...search, tags: e.target.value })}
						/>
					</div>
					<div className='form-submit' onClick={searchHandler}>
						<p>Search</p>
					</div>
				</div>
			</div>
			<div className='sidebar--post--area'>
				{state.isAuthenticated ? (
					<div className='sidebar--post--from'>
						<div className='sidebar--form--title'>
							<FaFolderPlus size={25} />
							<div className='sidebar--form--title-text'>FlashBack</div>
						</div>
						<div className='sidebar--form--input'>
							<div className='form-input'>
								<label htmlFor='title'>Title</label>
								<input
									type='text'
									id='title'
									value={postdata.title}
									onChange={(e) =>
										setPostdata({ ...postdata, title: e.target.value, creator: String(user) })
									}
								/>
							</div>
							<div className='form-input form-input-message '>
								<label htmlFor='message'>Message</label>
								<input
									type='text'
									id='message'
									value={postdata.message}
									onChange={(e) => setPostdata({ ...postdata, message: e.target.value })}
								/>
							</div>
							<div className='form-input'>
								<label htmlFor='tags'>Tags (Comma-separated)</label>
								<input
									type='text'
									id='tags'
									value={postdata.tags}
									onChange={(e) => setPostdata({ ...postdata, tags: e.target.value.split(",") })}
								/>
							</div>
							<div className='form-input'>
								<label htmlFor='image'>Image Here</label>
								{/* <input type='file' id='image' /> */}
								<FileBase
									type='file'
									multiple={false}
									onDone={({ base64 }: { base64: string }): void =>
										setPostdata({ ...postdata, selectedFile: base64 })
									}
								/>
							</div>
							<div className='form-submit' onClick={postHandler}>
								<p>Submit</p>
							</div>
						</div>
					</div>
				) : (
					<div className='sidebar--login--notification'>
						You must need to Login to Add your Memories or Like other's Flashbacks{" "}
					</div>
				)}
			</div>
			<div className='sideabar--pagenations sidebar--post--area'>
				<div className='sidebar--pagenation'>
					<div className='sidebar--pagenation--text'>
						<p onClick={pageHandler1}>1</p>
					</div>
					{
						pageState.posts.numberofPages > 1 ? (
							<div className='sidebar--pagenation--text'>
								<p onClick={pageHandler2}>2</p>
							</div>
						) : null
						// <>
						// 	<div className='sidebar--pagenation--text'>
						// 		<p onClick={pageHandler}>2</p>
						// 	</div>
						// 	<div className='sidebar--pagenation--text'>
						// 		<p onClick={pageHandler}>3</p>
						// 	</div>
						// </>
					}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;