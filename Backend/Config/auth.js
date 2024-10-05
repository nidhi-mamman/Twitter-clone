import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({
    path: "../config/.env"  // Ensure this path is correct
});

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
    try {
        // Check if token is present in cookies
        console.log('Cookies:', req.cookies);
        const token = req.cookies?.token;

        console.log("Token received:", token);  // Debug: Log the token to see if it's received

        // If no token is present, return 401 Unauthorized
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. No token provided.",
                success: false
            });
        }

        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.TOKENKEY);

        console.log("Decoded token:", decoded);  // Debug: Log the decoded token

        // Attach user information to the request object
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error("Authentication error:", error);

        // Determine the type of error and respond accordingly
        let message = "Invalid or expired token.";
        if (error instanceof jwt.TokenExpiredError) {
            message = "Token has expired.";
        } else if (error instanceof jwt.JsonWebTokenError) {
            message = "Invalid token.";
        }

        // Return appropriate response for token errors
        return res.status(403).json({
            message: message,
            success: false
        });
    }
};

export default isAuthenticated;
