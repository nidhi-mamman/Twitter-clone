import React from 'react'
import Post from './Post'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'


const Feed = () => {
  const {tweets}=useSelector(store=>store.tweet)
  return (
    <div className='w-[90%] ml-5'>
      <Post/>
      {
        tweets?.map((tweet)=><Tweet key={tweet?._id} tweet={tweet}/>)
      }
      <Tweet/>
     
    </div>
  )
}

export default Feed
