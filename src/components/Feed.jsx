import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/FeedSlice";
import { useEffect } from "react";
import Usercard from "./Usercard";

const Feed = () => {
    const dispatch=useDispatch();
    const feed=useSelector(store=>store.feed);
    const getFeed=async()=>{
        if(feed) return;
        try{
            const res=await axios.get("https://devtinder-b42n.onrender.com/feed",{
                withCredentials:true,
            })
            console.log(res);
            dispatch(addFeed(res.data.data));
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        getFeed();
    },[])
  return feed &&(
    <div className="my-10 flex justify-center items-center">
    <Usercard card={feed[0]}/>
    </div>
  )
}

export default Feed