import express from "express";
import { createTweet, deleteTweet, getAllTweet, getFollowingTweet, LikeOrDislike } from "../Controllers/TweetController.js";
import isAuthenticated from "../Config/auth.js";
const router = express.Router()

router.route("/create").post(isAuthenticated ,createTweet)
router.route("/delete/:id").delete(isAuthenticated, deleteTweet)
router.route("/like/:id").put(isAuthenticated,LikeOrDislike);
router.route("/alltweets/:id").get(isAuthenticated,getAllTweet);
router.route("/followingtweets/:id").get(isAuthenticated,getFollowingTweet);

export default router;
