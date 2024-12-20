
import React, { useContext, useEffect } from 'react'
import LeftMessage from './LeftMessage';
import RightContainer from './RightContainer';
import useGetAllConnections from '../shared/useGetAllConnections';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllMessages from '../shared/useGetAllMessages';
import { SocketContext } from '../App';
import { addAllMessages } from '../redux/messageSlice';

const Message = () => {
    let socket = useContext(SocketContext);

    let dispatch = useDispatch();
    useGetAllMessages();

    let allMessages = useSelector(store => store?.message?.allMessages);
    console.log("socket ",socket)
    
    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            dispatch((prevState) => addAllMessages([...prevState.allMessages, newMessage]));
        };
    
        socket?.on("addNewMessage", handleNewMessage);
    
        return () => {
            socket?.off("addNewMessage", handleNewMessage);
        };
    }, [socket]);

    let {isLoading} = useGetAllConnections();

    let allConnection = useSelector(store => store?.user?.allConnectionUsers);

    return (
        <div className='flex'>        
            <LeftMessage isLoading={isLoading} allConnection ={allConnection}/>
            <RightContainer />
        </div>
    )
}

export default Message;

// flex h-[85vh]  overflow-hidden bg-pink-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50