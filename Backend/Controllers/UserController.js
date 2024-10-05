import { User } from "../Models/UserSchema.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';  // Add this line to import mongoose
export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Basic validation
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash password and create user
        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({
            name, username, email, password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Invalid Credential",
                success: false
            });
        }

        // Compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credential",
                success: false
            });
        }

        // Create JWT token
        const tokenData = { userId: user._id };
        const token = await jwt.sign(tokenData, process.env.TOKENKEY, { expiresIn: "1d" });

        // Set cookie and return response
        return res.status(200)
            .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 1 day expiry
            .json({
                message: `Welcome back, ${user.name}`,
                user,
                success: true
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const logout= (req,res)=>{
    return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
        message:"Logout Successfully",
        success:true

    })

}

// bookmarks
export const Bookmarks = async (req, res) => {
    try {
        const loginUserId = req.body.id; // Extract the logged-in user's ID from the request body
        const tweetId = req.params.id;   // Extract the tweet's ID from the URL params

        // Find the user by ID
        const user = await User.findById(loginUserId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the tweet is already bookmarked
        if (user.bookmarks.includes(tweetId)) {
            // Remove from bookmarks (dislike)
            await User.findByIdAndUpdate(loginUserId, { $pull: { bookmarks: tweetId } });
            return res.status(200).json({
                success: true,
                message: "Removed from Bookmarks"
            });
        } else {
            // Add to bookmarks (like)
            await User.findByIdAndUpdate(loginUserId, { $push: { bookmarks: tweetId } });
            return res.status(200).json({
                success: true,
                message: "Saved to Bookmarks"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}


// Get my profile

export const getMyProfile = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID." });
        }

        // Find the user by ID, excluding the password field
        const user = await User.findById(id).select("-password");

        // If no user is found, return a 404 error
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Return the found user profile
        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        // Return a 500 Internal Server Error response
        return res.status(500).json({ error: "An error occurred while fetching the profile." });
    }
};

// otheruser

export const otherUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find all users except the current user (id)
        const otherUsers = await User.find({ _id: { $ne: id } });

        // If no other users are found
        if (!otherUsers || otherUsers.length === 0) {
            return res.status(404).json({
                message: "No other users found."
            });
        }

        // Return the list of other users with a 200 status
        return res.status(200).json({
            otherUsers
        });

    } catch (error) {
        console.error("Error fetching other users:", error);

        // Return 500 for internal server error
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// follow 
export const follow = async (req, res) => {
    try {
        const loginId = req.body.id;  // ID of the user who is trying to follow
        const userId = req.params.id;  // ID of the user to be followed

        // Fetch the logged-in user and the target user
        const loginUser = await User.findById(loginId);
        const user = await User.findById(userId);

        // Check if both users exist
        if (!loginUser) {
            return res.status(404).json({ message: 'Logged-in user not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Target user not found' });
        }

        // Check if the logged-in user is already following the target user
        if (!user.followers.includes(loginId)) {
            // Follow the target user
            await user.updateOne({ $push: { followers: loginId } });
            await loginUser.updateOne({ $push: { following: userId } });
            return res.status(200).json({ message: `${loginUser.name} is now following ${user.name}` });
        } else {
            return res.status(400).json({ message: `${loginUser.name} is already following ${user.name}` });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// unfollow
export const unFollow=async(req,res)=>{
    try {
        const loginId=req.body.id;
        const userId=req.params.id;
        const loginUser= await User.findById(loginId)
        const user= await User.findById(userId)
        if(user.followers.includes(loginId)){
            await user.updateOne({$pull:{followers:loginId}})
            await loginUser.updateOne({$pull:{following:userId}})
        }
        else{
            return res.status(404).json({
                message:`User not followed yet`
            })
        }
        return res.status(404).json({
            message:`User unfollow to ${user.name}`
        })   
    } catch (error) {
        console.log(error)
    }
}

// Inside your user routes file
// export const showBookmark = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const user = await User.findById(userId).populate('bookmarks'); // Assuming bookmarks contain tweet references

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ bookmarks: user.bookmarks });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Server error', error: error.message });
//     }
// }; 
