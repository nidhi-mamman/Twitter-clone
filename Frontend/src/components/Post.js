import axios from 'axios';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TWEET_API_END_POINT } from '../utils/contact';
import { getIsActive, getRefresh } from '../redux/tweetslice';

const Post = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector(store => store.user);
  const { isActive } = useSelector(store => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/create`,
        {
          description,
          id: user?._id
        },
        {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
        setDescription("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.Message || "Error posting tweet");
    }
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className='w-full md:w-[100%]'>
      <div className='createpost w-full'>
        <div>
          <div className='flex items-center justify-evenly m-2 border-b border-gray-300'>
            <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-500" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
              <h3 className='font-bold text-gray-600 text-lg'>For You</h3>
            </div>
            <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-500" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
              <h3 className='font-bold text-gray-600 text-lg'>Following</h3>
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='avatar'>
            <Avatar
              twitterHandle="sitebase"
              src="https://i.pinimg.com/736x/6b/30/9a/6b309a2ccde102f45ef6c4e5c3f40052.jpg"
              round={true}
              size="40"
            />
          </div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="What is happening?"
            className='w-full px-2 text-xl border-none outline-none'
          />
        </div>
        <div className='flex justify-between my-2 py-3 border-b border-gray-300'>
          <div>
            <CiImageOn size="20px" />
          </div>
          <button
            onClick={submitHandler}
            className='bg-[#109BF0] px-4 py-1 rounded-full text-white text-md font-bold'
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
