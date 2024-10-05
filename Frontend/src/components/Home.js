import React, { useEffect } from 'react';
import LeftSlider from './LeftSlider';
import RightSlider from './RightSlider';
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from '../hooks/useOtherUsers';
import { useSelector } from "react-redux";
import useGetMyTweet from '../hooks/useGetMyTweet';

const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Custom Hook
  useOtherUsers(user?._id);
  useGetMyTweet(user?._id);

  return (
    <div className='flex flex-col md:flex-row justify-between w-full md:w-[80%] mx-auto '>
      {/* Left Slider */}
      <div className='w-[20%] md:w-[15%] '>
        <LeftSlider />
      </div>

      {/* Main Content (Outlet for dynamic routing) */}
      <div className='w-[100%] md:w-[55%]'>
        <Outlet />
      </div>

      {/* Right Slider (moves to bottom on mobile) */}
      <div className='w-full md:w-[20%] mt-1 md:mt-0 '>
        <RightSlider otherUsers={otherUsers} />
      </div>
    </div>
  );
};

export default Home;
