import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/contact';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';
import toast from 'react-hot-toast';

const LeftSlider = () => {
  const { user } = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate('/login');
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full md:w-[15%] h-auto md:h-screen md:fixed '>
      <div className='mt-2 '>
        <img
          width="44px"
          src="https://loodibee.com/wp-content/uploads/Twitter-X-Logo.png"
          className="img-fluid rounded-top"
          alt="logo"
        />
      </div>

      <div className='mt-4'>
        <div className='flex items-center m-2 px-3 py-3 hover:bg-gray-100 rounded-full cursor-pointer'>
          <IoHomeOutline size="24px" />
          <Link to='/' className='px-2 font-bold text-lg hidden sm:block'>Home</Link>
        </div>

        <div className='flex items-center m-2 px-3 py-3 hover:bg-gray-100 rounded-full cursor-pointer'>
          <IoIosSearch size="24px" />
          <h1 className='px-2 font-bold text-lg hidden sm:block'>Explore</h1>
        </div>

        <div className='flex items-center m-2 px-3 py-3 hover:bg-gray-100 rounded-full cursor-pointer'>
          <CiBellOn size="24px" />
          <h1 className='px-2 font-bold text-lg hidden sm:block'>Notifications</h1>
        </div>

        <Link to={`/profile/${user?._id}`}>
          <div className='flex items-center m-2 px-3 py-3 hover:bg-gray-100 rounded-full cursor-pointer'>
            <CiUser size="24px" />
            <h1 className='px-2 font-bold text-lg hidden sm:block'>Profile</h1>
          </div>
        </Link>
        <Link to={`/showBookmark/${user?._id}`}>
          <div className='flex items-center m-2 px-3 py-3 hover:bg-gray-100 rounded-full cursor-pointer'>
            <CiBookmark size="24px" />
            <h1 className='px-2 font-bold text-lg hidden sm:block'>Bookmarks</h1>
          </div>
        </Link>

        

        <div onClick={logoutHandler} className='flex items-center m-2 px-3 py-3 hover:bg-gray-100 rounded-full cursor-pointer'>
          <RiLogoutCircleLine size="24px" />
          <h1 className='px-2 font-bold text-lg hidden sm:block'>Logout</h1>
        </div>

        <Link to=''>
          <button className='bg-[#109BF0] w-full px-5 py-2 rounded-full text-white text-md font-bold mt-4 hidden sm:block'>
            Post
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LeftSlider;
