import express from "express";
//getPost,
import Controller from "../controllers/Comment";
import Middleware from "../middleware/Auth";

const router = express.Router();

// router.route("/comments").get(Controller.getAllComment);
router
	.route("/:id/comments")
	.get(Middleware.Auth, Controller.getComment)
	.post(Middleware.Auth, Controller.postComment);

export default router;
