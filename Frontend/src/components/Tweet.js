import Avatar from 'react-avatar';
import { LuMessageCircle } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { CiBookmark} from "react-icons/ci"; // Assume CiBookmarkCheck for the "checked" bookmark
import axios from 'axios';
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utils/contact';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetslice.js';
import { MdOutlineDeleteOutline } from "react-icons/md";


const Tweet = ({tweet}) => {
    const {user}=useSelector(store=>store.user);
    const dispatch=useDispatch();
    const likeOrDislike=async(id)=>{
        try {
            const res=await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{withCredentials:true});
            dispatch(getRefresh());
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    const Bookmark=async(id)=>{
        try {
            const res=await axios.put(`${USER_API_END_POINT}/bookmark/${id}`,{id:user?._id},{withCredentials:true});
            dispatch(getRefresh());
            console.log(res);
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }
    const deleteTweetHandler=async(id)=>{
        try {
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{withCredentials:true});
            dispatch(getRefresh());
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    return (
        <div className='w-[100%] border border-gray-200 my-1 p-1 rounded'>
            <div className='flex  '>
                <Avatar twitterHandle="sitebase" src="https://i.pinimg.com/736x/6b/30/9a/6b309a2ccde102f45ef6c4e5c3f40052.jpg" round={true} size="40" />
                <div className='ml-2 w-[80%]'>
                    <div className='flex '>
                        <h1 className='font-bold'>{tweet?.userdetails[0]?.name}</h1>
                        <p className='text-gray-600 text-sm ml-1'>{`@${tweet?.userdetails[0]?.username}`}</p>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>
                    <div className='flex items-center justify-between my-2'>
                        <div className='flex items-center '>
                            <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer '>
                            <LuMessageCircle size="24px"/>
                            </div>
                            <p className='ml-2'>0</p>
                        </div>
                        <div className='flex items-center'>
                            <div onClick={(id)=>likeOrDislike(tweet?._id)}className=' p-2 hover:bg-pink-200 rounded-full cursor-pointer '>
                                <CiHeart size="24px" />
                            </div>
                            <p className='ml-2'>{tweet?.like?.length}</p>
                        </div>
                        <div className='flex items-center '>
                            <div onClick={()=>Bookmark(tweet?._id)} className=' p-2 hover:bg-yellow-200 rounded-full cursor-pointer '>
                                <CiBookmark size="24px" />
                            </div>
                            <p className='ml-2'>0</p>
                        </div>
                        {
                            user?._id === tweet?.userId && (<div onClick={()=>deleteTweetHandler(tweet?._id)} className='flex items-center '>
                                <div className=' p-2 hover:bg-red-200 rounded-full cursor-pointer '>

                                    <MdOutlineDeleteOutline size="24px" />

                                </div>
                                <p className='ml-2'>0</p>
                            </div>)
                        }
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Tweet
