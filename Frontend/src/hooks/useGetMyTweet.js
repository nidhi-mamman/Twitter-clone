import axios from "axios"
import { TWEET_API_END_POINT} from "../utils/contact"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTweets } from "../redux/tweetslice"
import toast from 'react-hot-toast';

const useGetMyTweet = (id) => {
    const dispatch = useDispatch();
    const {refresh,isActive}=useSelector(store=>store.tweet);

    const fetchMyTweet = async () => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
                withCredentials: true
            });

            console.log("all tweets")
            console.log(res)
            dispatch(getAllTweets(res.data.tweets))
            console.log(res);

        } catch (error) {
            console.log(error)
        }
    }
    const followingTweetHandler = async () => {
        
        try {
            axios.defaults.withCredentials=true;
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`);
            dispatch(getAllTweets(res.data.tweets));

            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }
    useEffect(() => {
        if(isActive){
            fetchMyTweet();
        }
        else{
            followingTweetHandler();
        }
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive,refresh  ]);

}

export default useGetMyTweet