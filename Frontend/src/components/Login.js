import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/contact.js';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice.js';

const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const [name, setname] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSignupHandler = () => {
    setisLogin(!isLogin);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError('Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a number.');
      return;
    }
    setError('');

    try {
      let res;
      if (isLogin) {
        res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          withCredentials: true
        });
        dispatch(getUser(res?.data?.user));
        console.log(res);
      } else {
        res = await axios.post(`${USER_API_END_POINT}/signup`, { name, username, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        });
        console.log(res);
      }

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error(error);
    }
  };
  return (
    <div className='w-screen h-screen flex items-center justify-center px-4 md:px-0'>
      <div className='flex flex-col md:flex-row items-center w-full md:w-[60%] justify-evenly'>
        <div className='hidden md:block'>
          <img width="350px" src="https://loodibee.com/wp-content/uploads/Twitter-X-Logo.png" alt="Logo" />
        </div>
        <div className='w-full md:w-auto'>
          <h1 className=' font-bold text-3xl md:text-5xl my-3'>Happening now</h1>
          <h1 className='text-xl md:text-2xl font-bold mt-4 mb-2'>{isLogin ? "Login" : "SignUp"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-full md:w-[90%]'>
            {
              !isLogin && (
                <>
                  <input value={name} onChange={(e) => { setname(e.target.value) }} className='outline-blue-800 rounded-full border-2 border-gray-400 py-1 px-3 my-2 ' type='text' placeholder='Name' />
                  <input value={username} onChange={(e) => { setusername(e.target.value) }} className='outline-blue-800 rounded-full border-2 border-gray-400 py-1 px-3 my-2 ' type='text' placeholder='Username' />
                </>
              )
            }
            <input value={email} onChange={(e) => { setemail(e.target.value) }} className='outline-blue-800 rounded-full border-2 border-gray-400 py-1 px-3 my-2 ' type='email' placeholder='Email' />
            <input value={password} onChange={(e) => { setpassword(e.target.value) }} className='outline-blue-800 rounded-full border-2 border-gray-400 py-1 px-3 my-2 ' type='password' placeholder='Password' />

            {error && <p className='text-red-500'>{error}</p>}

            <button className='rounded-full text-white font-bold px-3 py-2 bg-[#109BF0] w-full'>{isLogin ? "Login" : "SignUp"}</button>
            <div>
              <h1 className='cursor-pointer my-3 '>{isLogin ? "Do not have an account?" : "Already have an account?"}<span className="text-[#109BF0] font-bold" onClick={loginSignupHandler}>{isLogin ? "Signup" : "Login"}</span></h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
