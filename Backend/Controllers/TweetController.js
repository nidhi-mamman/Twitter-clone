import { Tweet } from "../Models/TweetSchema.js";
import { User } from "../Models/UserSchema.js";

// Create a new tweet
export const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        const user= await User.findById(id)
        await Tweet.create({
            description,
            userId: id,
            userdetails:user
        });

        return res.status(201).json({
            message: "Tweet created successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Unable to create tweet.",
            success: false,
        });
    }
};

// Delete a tweet
export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Unable to delete tweet.",
            success: false,
        });
    }
};

// Like or Dislike a tweet
export const LikeOrDislike = async (req, res) => {
    try {
        const loginUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);

        if (!tweet) {
            return res.status(404).json({
                message: "Tweet not found",
                success: false,
            });
        }

        if (tweet.like.includes(loginUserId)) {
            // Dislike
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loginUserId } });
            return res.status(200).json({
                message: "User disliked your tweet",
                success: true,
            });
        } else {
            // Like
            await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loginUserId } });
            return res.status(200).json({
                message: "User liked your tweet",
                success: true,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Unable to process like/dislike",
            success: false,
        });
    }
};

// Get all tweets including following users
export const getAllTweet = async (req, res) => {
    try {
        const id = req.params.id;
        const loginUser = await User.findById(id);

        if (!loginUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        const loginUserTweet = await Tweet.find({ userId: id });
        const followingTweet = await Promise.all(
            loginUser.following.map((otherUserId) => {
                return Tweet.find({ userId: otherUserId });
            })
        );

        return res.status(200).json({
            tweets: loginUserTweet.concat(...followingTweet),
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Unable to retrieve tweets.",
            success: false,
        });
    }
};

// Get only following users' tweets
export const getFollowingTweet = async (req, res) => {
    try {
        const id = req.params.id;
        const loginUser = await User.findById(id);

        if (!loginUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        const followingTweet = await Promise.all(
            loginUser.following.map((otherUserId) => {
                return Tweet.find({ userId: otherUserId });
            })
        );

        return res.status(200).json({
            tweets: [].concat(...followingTweet),
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Unable to retrieve following tweets.",
            success: false,
        });
    }
};
