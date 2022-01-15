import React, { FC, useState } from "react";
import FileBase from "react-file-base64";
import { FaFolderPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	CreatePost,
	FetchPosts,
	SearchPost,
	setDataToPost,
	setPostData,
	updatePost,
	UpdatePost
} from "../../Features/post";
import { RootState } from "../../Store/store";
import "./sidebar.css";

// interface postdata {
// 	_id: string;
// 	title: string;
// 	message: string;
// 	tags: string[];
// 	selectedFile: string;
// 	creator: string;
// }
interface siderbarProps {
	// postdata: postdata;
	// setPostdata: React.Dispatch<React.SetStateAction<postdata>>;
}

const Sidebar: FC<siderbarProps> = () =>
	// { postdata, setPostdata }
	{
		const dispatch = useDispatch();
		const state = useSelector((state: RootState) => state.auth);
		const pageState = useSelector((state: RootState) => state.post);
		const postState = useSelector(
			(state: RootState) => state.post.posts.postData
		);
		const upload = useSelector((state: RootState) => state.post.posts.upload);

		const [search, setSearch] = useState({
			search: "",
			tags: ""
		});

		const user = localStorage.getItem("name");
		// console.log("====================================");
		// console.log(user);
		// console.log("====================================");

		const searchHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			dispatch(SearchPost(search));
		};

		const postHandler = async (
			e: React.MouseEvent<HTMLDivElement, MouseEvent>
		) => {
			console.log(postState);
			if (upload) {
				dispatch(UpdatePost(postState));
			} else {
				dispatch(
					setDataToPost({
						name: "creator",
						value: user!
					})
				);
				dispatch(
					setDataToPost({
						name: "likes",
						value: postState.likes
					})
				);
				dispatch(CreatePost(postState));
			}
		};

		const getPageCompo = (i: number) => {
			return (
				<div className='sidebar--pagenation--text'>
					<p
						onClick={() => {
							dispatch(FetchPosts({ page: i + 1 }));
						}}>
						{i + 1}
					</p>
				</div>
			);
		};

		const getPageNumber = (pages: number) => {
			let res: JSX.Element[] = [];
			for (let i = 0; i < pages; i++) {
				res[i] = getPageCompo(i);
			}
			return res;
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
								placeholder='Search with text here'
								onChange={(e) =>
									setSearch({ ...search, search: e.target.value })
								}
							/>
						</div>
						<div className='form-input'>
							<label htmlFor='title'>Tags (Comma-separated)</label>
							<input
								type='text'
								id='title'
								value={search.tags}
								placeholder='Search with tags here'
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
								{upload ? (
									<div className='sidebar--form--title-text'>Update Post</div>
								) : (
									<div className='sidebar--form--title-text'>FlashBack</div>
								)}
							</div>
							<div className='sidebar--form--input'>
								<div className='form-input'>
									<label htmlFor='title'>Title</label>
									<input
										type='text'
										id='title'
										name='title'
										value={postState.title}
										placeholder='Title'
										onChange={(e) =>
											// console.log(setPostdata({ ...postdata, messagee.target.value );
											// setpostdata({ ...postdata, title: e.target.value })
											dispatch(
												setDataToPost({
													name: e.target.id,
													value: e.target.value
												})
											)
										}
									/>
								</div>
								<div className='form-input form-input-message '>
									<label htmlFor='message'>Message</label>
									<input
										type='text'
										id='message'
										value={postState.message}
										placeholder='Message'
										onChange={(e) =>
											dispatch(
												setDataToPost({
													name: e.target.id,
													value: e.target.value
												})
											)
										}
									/>
								</div>
								<div className='form-input'>
									<label htmlFor='tags'>Tags (Comma-separated)</label>
									<input
										type='text'
										id='tags'
										value={postState.tags}
										placeholder='Tags'
										onChange={(e) =>
											dispatch(
												setDataToPost({
													name: e.target.id,
													value: e.target.value.split(",")
												})
											)
										}
									/>
								</div>
								{upload ? null : (
									<div className='form-input'>
										<label htmlFor='image'>Image Here</label>
										{/* <input type='file' id='image' /> */}
										<FileBase
											type='file'
											multiple={false}
											onDone={({ base64 }: { base64: string }): void => {
												dispatch(
													setDataToPost({
														name: "selectedFile",
														value: base64
													})
												);
											}}
										/>
									</div>
								)}
								<div className='form-submit' onClick={postHandler}>
									<p>Submit</p>
								</div>
								{/* <div
									className='form-submit'
									style={{ marginTop: "15px" }}
									onClick={clearHandler}>
									<p>clear</p>
								</div> */}
							</div>
						</div>
					) : (
						<div className='sidebar--login--notification'>
							You must need to Login to Add your Memories or Like other's
							Flashbacks{" "}
						</div>
					)}
				</div>
				<div className='sideabar--pagenations sidebar--post--area'>
					<div className='sidebar--pagenation'>
						{getPageNumber(pageState.posts.numberofPages)}
					</div>
				</div>
			</div>
		);
	};

export default Sidebar;
