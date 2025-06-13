import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
const Body = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const userData=useSelector(store=>store.user);
  const fetchUser=async()=>{
    try{
      if(userData===true) return;
      const res=await axios.get("https://devtinder-b42n.onrender.com/profile",{
        withCredentials:true
      });
      // console.log(res);
      // console.log(res.data);
      dispatch(addUser(res.data))
    }
    catch(err){
      if(err.status==401){
        navigate("/login");
      }
      console.error(err);
    }
  }
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body

// whenever we refreshes the page our redux store gets empty/null but we have the cookies/token of user so we can make a api call ad get back the user to the user in store .. by using use effect --> use effect helps us to call functions inside it after the component gets loaded