import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Age: "",
    Gender: "",
    About: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signup", formData, {
        withCredentials: true,
      });
      if(res.status==200){
        navigate("/login");
      }
      console.log("Signup successful:", res.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-full max-w-lg shadow-lg p-8 my-4">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="Age"
              placeholder="Enter age"
              value={formData.Age}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Select Gender</p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="Gender"
                  value="male"
                  checked={formData.Gender === "male"}
                  onChange={handleChange}
                  className="radio radio-primary mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="Gender"
                  value="female"
                  checked={formData.Gender === "female"}
                  onChange={handleChange}
                  className="radio radio-primary mr-2"
                />
                Female
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="about" className="block text-sm font-medium">
              About
            </label>
            <textarea
              id="about"
              name="About"
              placeholder="Tell us about yourself"
              value={formData.About}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mt-2"
            ></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
