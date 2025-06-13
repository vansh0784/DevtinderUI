import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requests";
import { useEffect } from "react";

// For handling all the requests that have been received by the user
const Requests = () => {
  const requestRecieved = useSelector((store) => store.recievedreq);
  const dispatch = useDispatch();

  const handleRequest = async () => {
    try {
      const req = await axios.get(
        "http://localhost:3000/user/request/recieved",
        {
          withCredentials: true,
        }
      );
      console.log(req.data.connectReq);
      dispatch(addRequest(req.data.connectReq));
    } catch (err) {
      console.error(err);
    }
  };
  const requestReview=async(status,id)=>{
    try{
        // at post when you don't pass any data pass empty{} otherwise it will create problem
        const req=await axios.post(`http://localhost:3000/request/review/${status}/${id}`,{},{
            withCredentials:true,
        });
        console.log(req);

    }
    catch(err){
        console.error(err);
    }
  }
  console.log(requestRecieved);
  useEffect(() => {
    handleRequest();
  }, []); // Dependency array added correctly to prevent unnecessary reruns

  return (
    <div>
      <div className="flex items-center flex-col my-5 mx-auto">
        <h1 className="text-bold text-2xl my-5">All Requests are Here..!</h1>
        {requestRecieved &&
          requestRecieved.map((req) => {
            const reqId=req?._id;
            const {_id,firstName,lastName,About}=req.fromId;
            return (
              <div key={_id} className="card bg-neutral-content text-neutral w-96 my-3">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{ firstName+" "+lastName|| "Request Title"}</h2>
                  <p>{About|| "No description available."}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={()=>requestReview("accepted",reqId)}>Accept</button>
                    <button className="btn btn-secondary" onClick={()=>requestReview("rejected",reqId)}>Reject</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Requests;
