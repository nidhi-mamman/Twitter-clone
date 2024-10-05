import React from 'react';
import { IoIosSearch } from "react-icons/io";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const RightSlider = ({ otherUsers }) => {
  return (
    <div className='w-full md:w[50%] mt-5 md:mt-0'>
      {/* Search bar */}
      <div className='flex bg-gray-100 px-3 py-2 my-2 rounded-full items-center'>
        <IoIosSearch size="20px" color='gray' />
        <input
          type="text"
          placeholder='Search'
          className='bg-gray-100 px-2 text-black outline-none'
        />
      </div>

      {/* Follow section */}
      <div className='follow bg-gray-100 border border-gray-200 rounded p-2'>
        <h1 className='font-bold'>Who to follow</h1>
        {otherUsers?.map((user) => (
          <div key={user?._id} className='flex items-center justify-between my-2'>
            <div className='flex'>
              <Avatar
                twitterHandle="sitebase"
                src="https://i.pinimg.com/736x/6b/30/9a/6b309a2ccde102f45ef6c4e5c3f40052.jpg"
                round={true}
                size="40"
              />
              <div className='px-2'>
                <h1>{user?.name}</h1>
                <p>{`@${user?.username}`}</p>
              </div>
            </div>
            <Link to={`/profile/${user?._id}`}>
              <button className='rounded-full text-white bg-black font-bold px-3 py-1 hover:bg-[#109BF0]'>
                Follow
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSlider;
