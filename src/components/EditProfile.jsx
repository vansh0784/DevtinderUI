import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [About, setAbout] = useState(user?.About || "");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/edit/Profile",
        { firstName, lastName, About },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    } catch (e) {
      console.error(e);
      setShowToast(true); // Show error toast
      setTimeout(() => setShowToast(false), 3000); // Auto-hide error toast
    }
  };

  return (
    <div className="flex justify-evenly items-start bg-base-200">
      <div className="flex justify-center my-4">
        <div className="hero bg-base-200 ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={saveProfile}>
                <h1 className="text-xl text-left font-bold mb-2">
                  Edit Profile
                </h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">About</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={About}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Save profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center my-4">
        <div className=" card bg-base-200 w-96 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://imgs.search.brave.com/oJUxonEvz7P_qkOC_-rYriP6a_qd9HESeJEXuACr75k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk5LzczLzI2/LzM2MF9GXzI5OTcz/MjY2OF9nWnFLVmJ1/Mktqcm9MWXRUOWhS/WmZFMzdBWldGSEpR/bi5qcGc"
              alt="Profile"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
            <p>{`${About}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
