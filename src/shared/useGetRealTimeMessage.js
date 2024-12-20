
import { useContext, useEffect } from "react"
import { SocketContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { addAllMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  
    let socket = useContext(SocketContext);

    console.log("** ", socket);
    let allMessages = useSelector(store => store?.message?.allMessages);

    let dispatch = useDispatch();

    useEffect(()=>{
        socket?.on("addNewMessage",(addNewMessage)=>{
        console.log("addNewMessage ****************", addNewMessage);
        dispatch(addAllMessages([...allMessages, addNewMessage]))
    })
    },[socket,allMessages])
}

export default useGetRealTimeMessage;
   