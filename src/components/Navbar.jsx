import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { deleteUser } from "../utils/userSlice";
const Navbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try{
      await axios.post("https://devtinder-b42n.onrender.com/logout",{
        withCredentials:true,
      });
      dispatch(deleteUser());
      navigate("/login");

    } catch(err){
      console.error(err);
    }
  }
  const user=useSelector(store=>store.user);
  return (
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl"> {"</>"} devTinder</Link>
        </div>
        {/* <p className="text-center">Welcome, {user.firstName}</p> */}
        <div className="flex-none gap-2">
          {user&&<div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow"
            >
              <li className="mt-1">
                <Link to="/profile" className="justify-between">
                  {user.firstName}
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="mt-1">
                <Link to="/connections">Connections</Link>
              </li>
              <li className="mt-1">
                <Link to="/recieved/requests">All Requests</Link>
              </li>
              <li className="mt-1">
                <Link to="/chat/:connectionId">Chat</Link>
              </li>
              <li className="mt-1">
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>}
        </div>
      </div>
  );
};

export default Navbar;
