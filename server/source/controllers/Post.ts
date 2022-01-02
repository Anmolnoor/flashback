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

export const getPosts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logging.info(NAMESPACE, "Get Posts route called");
	const { page } = req.query;
	try {
		const LIMIT = 6;
		const startIndex = (Number(page) - 1) * LIMIT;
		const totle = await PostMessage.countDocuments({});

		const posts = await PostMessage.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);
		logging.info(
			NAMESPACE,
			`Totle number of posts:${totle} and startIndex:${startIndex}`
		);
		res
			.status(200)
			.json({
				data: posts,
				currentPage: Number(page),
				numberofPages: Math.ceil(totle / LIMIT)
			});
	} catch (error) {
		logging.error(NAMESPACE, "Error in getPosts", error);
		res.status(404).json({ message: "Post Not Found" });
	}
};
// get post by searchQuery and tags

export const getPostBySearch = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logging.info(NAMESPACE, "Get Post By Search route called");

	const { searchQuery, tags } = req.query;
	try {
		if (searchQuery && tags) {
			const title = new RegExp(searchQuery, "i");

			const posts = await PostMessage.find({
				$or: [{ title }, { tags: { $in: tags.split(",") } }]
			});
			logging.info(NAMESPACE, `Totle number of posts : ${posts.length}`);
			res.status(200).json({ data: posts });
		} else {
			logging.error(NAMESPACE, "Error in getPostBySearch");
			res.status(404).json({ message: "Post Not Found" });
		}
	} catch (error) {
		logging.error(NAMESPACE, "Error in getPostBySearch", error);
		res.status(404).json({ message: "Post Not Found" });
	}
};

export const getPost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Get Post by ID route called");
	const { id } = req.params;
	logging.info(NAMESPACE, `Post ID :${id}`, id);
	try {
		const post = await PostMessage.findById(id);
		logging.info(NAMESPACE, `Post Found with ID:${id}`);
		res.status(200).json(post);
	} catch (error) {
		logging.error(NAMESPACE, "Error in getPost", error);
		res.status(404).json({ message: "Post Not Found" });
	}
};

export const createPost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Create Post route called");
	const post = req.body;
	logging.info(NAMESPACE, "Post to be created", req.body.title);
	const newPostMessage = new PostMessage({
		...post,
		createdAt: new Date().toISOString()
	});
	try {
		await newPostMessage.save();
		logging.info(NAMESPACE, "Post Created");
		res.status(201).json(newPostMessage);
	} catch (error) {
		logging.error(NAMESPACE, "Error in createPost", error);
		res.status(409).json({ message: "Something went Wrong" });
	}
};

export const updatePost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Update Post route called");
	const { id } = req.params;
	logging.info(NAMESPACE, `Post ID:${id}`);

	const { title, message, creator, selectedFile, tags } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		logging.error(NAMESPACE, "Invalid ID", id);
		return res.status(404).send(`No post with id: ${id}`);
	}

	const updatedPost = {
		creator,
		title,
		message,
		tags,
		selectedFile,
		updatedAt: new Date().toISOString()
	};
	await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
	logging.info(NAMESPACE, `Post Updated with ID:${id}`);
	res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Delete Post route called");
	const { id } = req.params;
	const userId = req.userId;
	logging.warn(NAMESPACE, `Post ID:${id}`);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		logging.error(NAMESPACE, "Invalid ID", id);
		return res.status(404).send(`No post with id: ${id}`);
	}

	await PostMessage.findByIdAndRemove(id);
	logging.info(NAMESPACE, "Post Deleted", id);
	res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req: Request, res: Response) => {
	logging.info(NAMESPACE, "Like Post route called");
	const { id } = req.params;
	const userId = req.userId;
	logging.info(NAMESPACE, `Post ID:${id} UserID:${userId}`);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		logging.error(NAMESPACE, "Invalid ID", id);
		return res.status(404).send(`No post with id: ${id}`);
	}

	try {
		const post = await PostMessage.findById(id);
		logging.info(NAMESPACE, `Post Found with the id ${id}`);
		// const index = post!.likes.findIndex((id) => id === userId);
		const index = post!.likes.findIndex((_id) => _id === userId);
		if (index === -1) {
			logging.info(NAMESPACE, "User like the post");
			post!.likes.push(userId);
			console.log({ index, post, id });
		} else {
			post!.likes.splice(index, 1);
			console.log({ index, post, id });
		}

		const updatedPost = await PostMessage.findByIdAndUpdate(id, post!, {
			new: true
		});
		logging.info(NAMESPACE, "Post Updated");
		res.status(200).json(updatedPost);
	} catch (error) {
		logging.error(NAMESPACE, "Error in likePost", error);
		res.status(404).json({ message: "Post Not Found" });
	}
};

export default {
	postController,
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
	likePost,
	getPostBySearch
};
