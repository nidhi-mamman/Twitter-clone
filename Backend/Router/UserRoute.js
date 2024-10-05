import express from "express";
import { Register,Login,logout, Bookmarks, getMyProfile, otherUser, follow, unFollow } from "../Controllers/UserController.js";
import isAuthenticated from "../Config/auth.js";
const router = express.Router()

router.route("/signup").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(logout)
router.route("/bookmark/:id").put(isAuthenticated,Bookmarks)
router.route("/profile/:id").get(isAuthenticated ,getMyProfile)
router.route("/otheruser/:id").get(isAuthenticated,otherUser)
router.route("/follow/:id").post(isAuthenticated,follow)
router.route("/unfollow/:id").post(isAuthenticated,unFollow)
// router.route("/showbookmark/:userId").post(isAuthenticated,showBookmark)
export default router;

