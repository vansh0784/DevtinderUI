import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../utils/userSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [selectedOption, setSelectedOption] = useState("");

  const handleLogout = async () => {
    try {
      await axios.post("https://devtinder-b42n.onrender.com/logout", {}, {
        withCredentials: true,
      });
      dispatch(deleteUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === "connections") navigate("/connections");
    else if (value === "requests") navigate("/recieved/requests");
    else if (value === "chat") navigate("/chat/123"); // replace 123 with actual id if dynamic
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">{"</>"} devTinder</Link>
      </div>

      <div className="flex-none gap-4 items-center">
        {/* Dropdown for other routes */}
        {user && (
          <select
            className="select select-bordered"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Explore</option>
            <option value="connections">Connections</option>
            <option value="requests">Requests</option>
            <option value="chat">Chat</option>
          </select>
        )}

        {/* Edit Profile Button */}
        {user && (
          <button
            onClick={() => navigate("/profile")}
            className="btn btn-outline btn-sm"
          >
            Edit Profile
          </button>
        )}

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            className="btn btn-error btn-sm text-white"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
