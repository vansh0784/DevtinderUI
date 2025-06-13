import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate,Link } from "react-router";
const Login = () => {
    const [email,setEmail]=useState("abhi123@gmail.com");
    const [password,setPassword]=useState("Abhi@123");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        try{
            e.preventDefault();
            const result=await axios.post("http://localhost:4000/login",{
                email,
                password
            },{
                withCredentials:true,
            });
            console.log(result.data.data);
            dispatch(addUser(result.data.data));
            return navigate("/feed");
        }
        catch(e){
            console.error(e);
        }

    }
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="text-xl text-left font-bold mb-2">Login now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  required
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <p><Link to="/Signup">New user? Please signup first</Link></p>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
