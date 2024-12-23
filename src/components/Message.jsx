
import React, { useContext, useEffect } from 'react'
import useGetAllConnections from '../shared/useGetAllConnections';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllMessages from '../shared/useGetAllMessages';
import { SocketContext } from '../App';
import { addAllMessages } from '../redux/messageSlice';
import { getSocket } from '../utils/socket';
import RightMessageBox from './RightMessageBox';
import LeftMessageBox from './LeftMessageBox';


const Message = () => {
    // let socket = useContext(SocketContext);

    // console.log("socket ",socket)

    let dispatch = useDispatch();
    useGetAllMessages();

    let allMessages = useSelector(store => store?.message?.allMessages);

    useEffect(()=>{
        const socket = getSocket(); 
        if (socket) 
        {
            socket.on("addNewMessage", (message) => {
                dispatch(addAllMessages([...allMessages,message]))
            });
        }
    
        return () => {
            if (socket) 
            {
                socket.off("newMessage");
            }
        };
    },[allMessages])

    let {isLoading} = useGetAllConnections();

    let allConnection = useSelector(store => store?.user?.allConnectionUsers);

    return (
        <div className='flex flex-col lg:flex-row'>        
            <LeftMessageBox isLoading={isLoading} allConnection ={allConnection}/>
            <RightMessageBox />
        </div>
    )
}

export default Message;

// flex h-[85vh]  overflow-hidden bg-pink-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50