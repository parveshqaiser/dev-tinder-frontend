
import { io } from "socket.io-client";

let socket;

export const getSocket = (userId) => {
    if (!socket) 
    {
        socket = io("http://127.0.0.1:9000", {
            transports: ["polling", "websocket"],
            query: {userId},
        });
        socket.on("connect", () => {
            console.log("Socket connected: ", socket.id);
        });
      
        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
