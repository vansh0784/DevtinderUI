import { useSelector } from "react-redux";
import { Link } from "react-router";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const {firstName,lastName,About}=user;
  console.log(user);
  return (
    user && (<div className="flex justify-center items-center my-5 mx-10">

      <div className=" card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://imgs.search.brave.com/oJUxonEvz7P_qkOC_-rYriP6a_qd9HESeJEXuACr75k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk5LzczLzI2/LzM2MF9GXzI5OTcz/MjY2OF9nWnFLVmJ1/Mktqcm9MWXRUOWhS/WmZFMzdBWldGSEpR/bi5qcGc"
            alt="Profile"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{`${firstName} ${lastName} `}</h2>
          <p>{About}</p>
          <div className="card-actions">
            <p className="btn btn-primary"><Link to="/editProfile">Edit Profile</Link></p>
          </div>
        </div>
      </div>
      </div>
    )
  );
};

export default Profile;
{
  /* <div><EditProfile user={user}/></div> */
}
