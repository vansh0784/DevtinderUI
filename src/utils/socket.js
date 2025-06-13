import io from "socket.io-client"

export const createSocketConnection=()=>{
    return io("https://devtinder-b42n.onrender.com");
};