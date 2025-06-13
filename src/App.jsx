import { Routes } from "react-router";
// import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Body from "./components/Body";
import { Route } from "react-router";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections"
import EditProfile from "./components/EditProfile";
import Requests from "./components/Requests";
import Chat from "./components/Chat";

function App() {
  return (
    <>

        <Routes >
          <Route path="/" element={<Body/>}>
            <Route path="/feed" element={<Feed/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/connections" element={<Connections/>}></Route>
            <Route path="/recieved/requests" element={<Requests/>}></Route>
            <Route path="/editProfile" element={<EditProfile/>}></Route>
            <Route path="/Signup" element={<Signup/>}></Route>
            <Route path="/chat/:connectionId" element={<Chat/>}></Route>
          </Route>
        </Routes>
    </>
  );
}

export default App;
