import { Request, Response, NextFunction, request } from "express";
import logging from "../config/logging";
import mongoose, { isValidObjectId } from "mongoose";
import PostMessage from "../models/Post";

const NAMESPACE = "Post Controller";

const postController = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "Post Controller route called");
	return res.status(200).json({
		message: "Post Controller"
	});
	// next();
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "Get Posts route called");
	const { page } = req.query;
	try {
		const LIMIT = 8;
		const startIndex = (Number(page) - 1) * LIMIT;
		const totle = await PostMessage.countDocuments({});

		const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
		logging.info(NAMESPACE, `Totle number of posts:${totle} and startIndex:${startIndex}`, posts);
		res.status(200).json({ data: posts, currentPage: Number(page), numberofPages: Math.ceil(totle / LIMIT) });
	} catch (error) {
		logging.error(NAMESPACE, "Error in getPosts", error);
		res.status(404).json({ message: "Post Not Found" });
	}
};
// get post by searchQuery and tags
export const getPostBySearch = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "Get Posts by Search Query route called");
	const { searchQuery, tags, page } = req.query;
	try {
		const LIMIT = 8;
		const startIndex = (Number(page) - 1) * LIMIT;
		const totle = await PostMessage.countDocuments().where("title").equals(searchQuery).where("tags").equals(tags);

		const posts = await PostMessage.find()
			.where("title")
			.equals(searchQuery)
			.where("tags")
			.equals(tags)
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);
		logging.info(NAMESPACE, `Totle number of posts:${totle} and startIndex:${startIndex}`, posts);
		res.status(200).json({ data: posts, currentPage: Number(page), numberofPages: Math.ceil(totle / LIMIT) });
	} catch (error) {
		logging.error(NAMESPACE, "Error in getPosts", error);
		res.status(404).json({ message: "Post Not Found" });
	}
};

export const getPost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Get Post by ID route called");
	const { id } = req.params;
	logging.info(NAMESPACE, `Post ID :${id}`, id);
	try {
		const post = await PostMessage.findById(id);
		logging.info(NAMESPACE, "Post Found", post);
		res.status(200).json(post);
	} catch (error) {
		logging.error(NAMESPACE, "Error in getPost", error);
		res.status(404).json({ message: "Post Not Found" });
	}
};

export const createPost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Create Post route called");
	const post = req.body;
	logging.info(NAMESPACE, "Post to be created", post);
	const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
	try {
		await newPostMessage.save();
		logging.info(NAMESPACE, "Post Created", newPostMessage);
		res.status(201).json(newPostMessage);
	} catch (error) {
		logging.error(NAMESPACE, "Error in createPost", error);
		res.status(409).json({ message: "Something went Wrong" });
	}
};

export const updatePost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Update Post route called");
	const { id } = req.params;
	logging.info(NAMESPACE, `Post ID:${id}`, id);

	const { title, message, creator, selectedFile, tags } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		logging.error(NAMESPACE, "Invalid ID", id);
		return res.status(404).send(`No post with id: ${id}`);
	}

	const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

	await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
	logging.info(NAMESPACE, "Post Updated", updatedPost);
	res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Delete Post route called");
	const { id } = req.params;
	const userId = req.userId;
	logging.warn(NAMESPACE, `Post ID:${id}`, id);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		logging.error(NAMESPACE, "Invalid ID", id);
		return res.status(404).send(`No post with id: ${id}`);
	}

	await PostMessage.findByIdAndRemove(id);
	logging.info(NAMESPACE, "Post Deleted", id);
	res.json({ message: "Post deleted successfully." });
};

// export const likePost = async (req: CustomRequest, res: Response) => {
// 	logging.info(NAMESPACE, "Like Post route called");
// 	const { id } = req.params;
// 	const userId = req?.userId;
// 	logging.info(NAMESPACE, `Post ID:${id} User ID:${userId}`, { id, userId });
// 	if (!userId) {
// 		logging.error(NAMESPACE, "User ID not found", userId);
// 		return res.json({ message: "Unauthenticated" });
// 	}

// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		logging.error(NAMESPACE, "Invalid ID", id);
// 		return res.status(404).send(`No post with id: ${id}`);
// 	}

// 	const post = await PostMessage.findById(id);
// 	logging.info(NAMESPACE, "Post Found", post);
// 	const index = post.likes.findIndex((id) => id === String(userId));

// 	if (index === -1) {
// 		post.likes.push(userId);
// 	} else {
// 		post.likes = post.likes.filter((id) => id !== String(userId));
// 	}
// 	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
// 	res.status(200).json(updatedPost);
// };

// like posts by user id and post id and return the updated post object with likes array updated by user id
export const likePost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Like Post route called");
	const { id } = req.params;
	const userId = req.userId;
	logging.info(NAMESPACE, `Post ID:${id} User ID:${userId}`, { id, userId });
	if (!userId) {
		logging.error(NAMESPACE, "User ID not found", userId);
		return res.json({ message: "Unauthenticated" });
	}

	if (!mongoose.Types.ObjectId.isValid(id)) {
		logging.error(NAMESPACE, "Invalid ID", id);
		return res.status(404).send(`No post with id: ${id}`);
	}

	const post = await PostMessage.findById(id);
	logging.info(NAMESPACE, "Post Found", post);
	const index = post?.likes!;

	if (!isValidObjectId(userId)) {
		logging.error(NAMESPACE, "Invalid ID", userId);
		return res.status(404).send(`Invalid userID: ${id}`);
	} else {
		if (index?.includes(userId)) {
			logging.info(NAMESPACE, "User already liked the post hence Dislike");
			post?.likes?.splice(post?.likes?.indexOf(userId), 1);
		} else {
			logging.info(NAMESPACE, "User liked the post");
			post?.likes.push(userId);
		}
	}

	const updatedPost = await PostMessage.findByIdAndUpdate(id, { post }, { new: true });
	res.status(200).json(updatedPost);
};

export default { postController, getPosts, getPost, createPost, updatePost, deletePost, likePost, getPostBySearch };
