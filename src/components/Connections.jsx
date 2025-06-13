import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allConnect } from "../utils/allConnections";
import { Link } from "react-router";

const Connections = () => {
  const myConnections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get("https://devtinder-b42n.onrender.com/user/connectionList", {
        withCredentials: true,
      });
      dispatch(allConnect(res.data.data));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!myConnections || myConnections.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-2xl font-semibold">
        No Connections Found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-center font-bold text-4xl text-slate-800 mb-8">Your Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {myConnections.map(({ _id, firstName, lastName, About }) => (
          <div key={_id} className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center gap-3 hover:shadow-xl transition-shadow duration-200">
            <img
              src="https://imgs.search.brave.com/oboiGq-D86hDqLflTdHiJDvYfklmIHGAZCY6TBj1LJQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGVuZG8uaW8vd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMTEv/YXNzZXQtaHVtYW4t/Y3VzdG9tZXJzLnBu/Zw"
              alt="profile"
              className="rounded-full w-24 h-24 object-cover border-2 border-gray-300"
            />
            <h2 className="text-xl font-semibold text-slate-700">
              {firstName} {lastName}
            </h2>
            <p className="text-sm text-gray-500 text-center px-2">{About || "No bio available."}</p>
            <Link to={`/chat/${_id}`}>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-150">
                Chat
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
