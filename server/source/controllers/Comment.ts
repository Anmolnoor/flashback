import { Request, Response, NextFunction, request } from "express";
import logging from "../config/logging";
import mongoose, { isValidObjectId } from "mongoose";
import Comment from "../models/Comment";

const NAMESPACE = "Comments";

const getAllComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logging.info(NAMESPACE, "Comments route called");
	// const postId = req.body.pid;
	// const comments = await Comment.aggregate([{ $match: { commnet: postId } }]);
	const comments = await Comment.find();
	console.log(comments);

	return res.status(200).json({
		message: "Comments",
		data: comments
	});
	// next();
};

const getComment = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "Comments route called");
	const postId = req.params.id;
	console.log(postId);

	// const comments = await Comment.aggregate([{ $match: { commnet: postId } }]);
	const comments = await Comment.find({ postId: postId }).populate({
		path: "userId",
		fields: "name"
	});
	console.log(comments);

	return res.status(200).json({
		message: "Comments",
		number: comments.length,
		comments
	});
	// next();
};
const postComment = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "Comments route called");
	const userId = req.userId;
	const postId = req.params.id;
	const { comment } = req.body;
	console.log(req.body, userId, postId);

	const doc = await Comment.create({ postId, userId, comment });
	return res.status(201).json({
		message: "Comments",
		data: doc
	});
	// next();
};

export default { getComment, postComment, getAllComment };
