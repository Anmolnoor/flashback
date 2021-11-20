import express from "express";
//getPost,
import Controller from "../controllers/Post";
import Middleware from "../middleware/Auth";

const router = express.Router();

router.get("/search", Controller.getPostBySearch);
router.get("/", Controller.getPosts);
router.get("/:id", Controller.getPost);

router.post("/", Middleware.Auth, Controller.createPost);
router.patch("/:id", Middleware.Auth, Controller.updatePost);
router.delete("/:id", Middleware.Auth, Controller.deletePost);
router.patch("/:id/likePost", Middleware.Auth, Controller.likePost);

export default router;
