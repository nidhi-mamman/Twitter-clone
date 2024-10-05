import express from 'express';
import dotenv from 'dotenv';
import dataconnect from './Config/database.js';
import cookieParser from 'cookie-parser';
import userRoute from './Router/UserRoute.js';
import TweetRoute from './Router/TweetRoute.js';
import cors from 'cors';

dotenv.config({
    path: ".env"
});

// Connect to database
dataconnect();

const app = express();

// Middleware
app.use(express.urlencoded({
    extended: true,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

// Correct CORS configuration
const corsoption = {
    origin: "https://twitter-clone-1-f6uy.onrender.com",
    credentials: true,  // Fix the typo
};
app.use(cors(corsoption));


// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", TweetRoute);

// Simple route for testing
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "Coming from backend...",
        success: true
    });
});
app.get('/', (req, res) => {
    res.send('Welcome to the TwitterClone API');
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
});
