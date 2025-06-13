import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allConnect } from "../utils/allConnections";
import { Link } from "react-router";

const Connections = () => {
  const myConnections=useSelector(state=>state.connections)
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connectionList", {
        withCredentials: true,
      });
    //   console.log(res.data.data);
      dispatch(allConnect(res.data.data));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);
  console.log(myConnections)
  // Check if myConnections is valid and not empty
  if (!myConnections || myConnections.length === 0) {
    return <h1>No Connections Found</h1>;
  }

  return (
    <div className="flex items-center flex-none mx-auto flex-col">
      <h1 className="text-center font-bold text-3xl my-5">All Connections</h1>
      <div className=" rounded-box max-w-md space-x-4 p-4 justify-center">
        {myConnections.map((connect) => {
          const { _id, firstName, lastName, About } = connect;
          return (
            <div key={_id} className="my-4 flex flex-col items-center border border-gray-800 p-2 w-full ">
              <img
                src="https://imgs.search.brave.com/oboiGq-D86hDqLflTdHiJDvYfklmIHGAZCY6TBj1LJQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGVuZG8uaW8vd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMTEv/YXNzZXQtaHVtYW4t/Y3VzdG9tZXJzLnBu/Zw"
                alt="profileImg"
                className="rounded-full w-20 h-20 mx-auto"
              />
              <h1 className="text-black text-xl font-semibold">{firstName + " " + lastName}</h1>
              <p className="text-black text-xs font-normal">{About}</p>
              <Link to={"/chat/"+_id}><button className="text-black text-bold rounded bg-slate-500">Chat</button></Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
