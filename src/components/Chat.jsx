import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { connectionId } = useParams();
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !connectionId) return;
    const socket = createSocketConnection();

    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
    });

    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      connectionId,
    });

    socket.on("messageRecieved", ({ firstName, text }) => {
      if (text) {
        setMessages((msg) => [...msg, { firstName, text }]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, connectionId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      text: newMessage,
      userId,
      connectionId,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-lg mx-auto my-10 border rounded-md shadow-lg border-gray-300 bg-white flex flex-col h-[70vh]">
      <h1 className="text-lg font-semibold bg-gray-100 border-b border-gray-300 p-4 w-full text-center">
        Chat
      </h1>
      <div className="flex-1 overflow-y-auto w-full p-5 bg-gray-50">
        {messages.map((msg, idx) => {
          if (msg.text === "") return null; // Skip empty messages
          return (
            <div key={idx} className="chat chat-start">
              <div className="chat-header">
                <time className="text-xs opacity-50">{msg.firstName}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-300 p-4 w-full flex items-center gap-2 bg-gray-100">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-secondary-content text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
