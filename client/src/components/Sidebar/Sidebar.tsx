import React, { FC, useState } from "react";
import FileBase from "react-file-base64";
import { FaFileAlt, FaFolderPlus } from "react-icons/fa";
import "./sidebar.css";

interface SidebarProps {
	isAuthenticated: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isAuthenticated }) => {
	const [search, setSearch] = useState({
		search: "",
		tags: ""
	});
	const [post, setPost] = useState({
		title: "",
		message: "",
		tags: "",
		file: ""
	});

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
					<div
						className='form-submit'
						onClick={(e) => {
							e.preventDefault();
							console.log({ search });
						}}>
						<p>Search</p>
					</div>
				</div>
			</div>
			<div className='sidebar--post--area'>
				{isAuthenticated ? (
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
									value={post.title}
									onChange={(e) => setPost({ ...post, title: e.target.value })}
								/>
							</div>
							<div className='form-input form-input-message '>
								<label htmlFor='message'>Message</label>
								<input
									type='text'
									id='message'
									value={post.message}
									onChange={(e) => setPost({ ...post, message: e.target.value })}
								/>
							</div>
							<div className='form-input'>
								<label htmlFor='tags'>Tags (Comma-separated)</label>
								<input
									type='text'
									id='tags'
									value={post.tags}
									onChange={(e) => setPost({ ...post, tags: e.target.value })}
								/>
							</div>
							<div className='form-input'>
								<label htmlFor='image'>Image Here</label>
								{/* <input type='file' id='image' /> */}
								<FileBase
									type='file'
									multiple={false}
									onDone={({ base64 }: { base64: string }): void =>
										setPost({ ...post, file: base64 })
									}
								/>
							</div>
							<div
								className='form-submit'
								onClick={(e) => {
									e.preventDefault();
									console.log(post);
								}}>
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
						<p>1</p>
					</div>
					<div className='sidebar--pagenation--text sidebar--pagenation--text--neg'>
						<p>n-1</p>
					</div>
					<div className='sidebar--pagenation--text'>
						<p>n</p>
					</div>
					<div className='sidebar--pagenation--text sidebar--pagenation--text--peg'>
						<p>n+1</p>
					</div>
					<div className='sidebar--pagenation--text'>
						<p>T</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
