
import { io } from "socket.io-client";

let socket;

export const getSocket = (userId) => {
    if (!socket) {
        socket = io("http://127.0.0.1:9000", {
            transports: ["polling", "websocket"],
            query: { userId },
        });
    }
    return socket;
};