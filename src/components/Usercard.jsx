import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserfromFeed } from "../utils/FeedSlice";
const Usercard = ({ card }) => {
  console.log(card);
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const handleProfileRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/connection/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(deleteUserfromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  if (!feed) return;
  if (feed.length == 0)
    return (
      <h1 className="font-bold text-blue-950 text-2xl flex justify-center">
        No new users are found!!
      </h1>
    );
  // console.log(firstName+lastName+about);
  const {_id, firstName, lastName, About } = card;
  return (
    <div className="card glass w-96 ">
      <figure>
        <img
          src="https://imgs.search.brave.com/UqIPtFQTN21z71iv43mJL78qBF20hlF1ovB4k3qLq5Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE5LzI2LzQ2/LzM2MF9GXzYxOTI2/NDY4MF94MlBCZEdM/RjU0c0ZlN2tUQnRB/dlpuUHlYZ3ZhUncw/WS5qcGc"
          alt="car!"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {About}
        <div className="card-actions justify-evenly items-center">
          <button className="btn btn-secondary" onClick={()=>handleProfileRequest("interested",_id)}>Interested</button>
          <button className="btn btn-primary" onClick={()=>handleProfileRequest("ignored",_id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
