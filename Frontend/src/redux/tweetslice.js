import { createSlice } from "@reduxjs/toolkit";

const tweetslice = createSlice({
    name: "tweet",
    initialState: {
        tweets: [] ,// Default to an array instead of null to avoid errors when mapping
        refresh:false,
        isActive:true,
    },
    reducers: {
        getAllTweets: (state, action) => {
            state.tweets = action.payload; // Ensure payload is correctly set
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh; // Ensure payload is correctly set
        },
        getIsActive: (state,action) => {
            state.isActive = action.payload; // Ensure payload is correctly set
        },
    },
});

export const { getAllTweets, getRefresh, getIsActive } = tweetslice.actions;
export default tweetslice.reducer;
