import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/contact';
import { useSelector } from 'react-redux';
import Tweet from './Tweet'; // Assuming the Tweet component is in the same directory

const BookmarkPage = () => {    const { user } = useSelector(store => store.user);
    const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(`${TWEET_API_END_POINT}/bookmarks/${user?._id}`, { withCredentials: true });
                setBookmarkedTweets(response.data.bookmarks);
            } catch (err) {
                setError('Failed to load bookmarks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchBookmarks();
        }
    }, [user]);

    if (loading) return <p>Loading bookmarks...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Bookmarked Tweets</h1>
            {bookmarkedTweets.length === 0 ? (
                <p>No bookmarks found.</p>
            ) : (
                <div>
                    {bookmarkedTweets.map(tweet => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookmarkPage;
