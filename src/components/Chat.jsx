import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { allConnect } from "../utils/allConnections";
import axios from "axios";
import { Link } from "react-router";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { connectionId } = useParams(); // from URL: /chat/:connectionId
  const user = useSelector((state) => state.user);
  const myConnections = useSelector((state) => state.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = user?._id;

  const [socket, setSocket] = useState(null);

  // Fetch connections list from server
  const fetchConnections = async () => {
    try {
      const res = await axios.get("https://devtinder-b42n.onrender.com/user/connectionList", {
        withCredentials: true,
      });
      dispatch(allConnect(res.data.data));
    } catch (e) {
      console.error("Failed to load connections", e);
    }
  };

  // Load connections if not already available
  useEffect(() => {
    if (!myConnections || myConnections.length === 0) {
      fetchConnections();
    }
  }, []);

  // Establish socket connection and listeners
  useEffect(() => {
    if (!userId || !connectionId) return;

    const sock = createSocketConnection();
    setSocket(sock);

    sock.on("connect", () => {
      sock.emit("joinChat", {
        firstName: user?.firstName,
        userId,
        connectionId,
      });
    });

    // Listen for messages from other users
    sock.on("messageRecieved", ({ firstName, text, userId: senderId }) => {
      if (text && senderId !== userId) {
        setMessages((prev) => [...prev, { firstName, text }]);
      }
    });

    return () => {
      sock.disconnect();
    };
  }, [userId, connectionId]);

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    // Show it instantly in UI
    setMessages((msg) => [...msg, { firstName: user.firstName, text: newMessage }]);

    // Emit to server
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      text: newMessage,
      userId,
      connectionId,
    });

    setNewMessage("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 h-[85vh] border shadow-md rounded-xl flex flex-col bg-white">
      {/* Header + Friend Selector */}
      <div className="p-4 border-b bg-gray-100 flex justify-between items-center">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <select
          className="border px-3 py-1 rounded focus:outline-none text-sm"
          value={connectionId}
          onChange={(e) => navigate(`/chat/${e.target.value}`)}
        >
          <option disabled value="">
            Select a friend
          </option>
          {myConnections.map((con) => (
            <Link to={`/chat/${con?._id}`}>
            <option key={con._id} value={con._id}>
              {con.firstName} {con.lastName}
            </option>
            </Link>
          ))}
        </select>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-5">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat ${
                msg.firstName === user.firstName ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header text-sm text-gray-500 mb-1">{msg.firstName}</div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50 text-xs">Seen</div>
            </div>
          ))
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t flex gap-3 bg-gray-100">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
