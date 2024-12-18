

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/apis';

import loading from "../../images/robot.gif";
import { addSelectedUser } from '../redux/messageSlice';

const RightContainer = () => {
    
    let dispatch = useDispatch();
    let selectedUser = useSelector(store=> store?.message?.selectedUser);

    let [allMessages , setAllMessages] = useState([]);
    const [message , setMessage] = useState("");
    const [isDisabled , setIsDisabled] = useState(true);

    const scrollBar = useRef();

    useEffect(()=>{
        async function getAllMessages()
        {
            if(selectedUser!==null){
                try {
                    let res = await axios.get(BASE_URL+ `/get/messages/${selectedUser?._id || ""}`,{withCredentials:true});
                    if(res.data.success)
                    {
                        setAllMessages(res.data.getAllMessages.messages || [])
                    }
                } catch (error) {
                    console.log(error);
                }
            }           
        }
        getAllMessages()
    },[selectedUser]);

    useEffect(()=>{
        return (()=>{
            dispatch(addSelectedUser(null))
        })
    },[])

    useEffect(()=>{
        scrollBar.current?.scrollIntoView({behavior : "smooth"});
    },[allMessages])

    function handleChange(e)
    {
        let {value} = e.target;
        if(!value){
            setIsDisabled(true);
            setMessage("");
        }else {
            value = value.charAt(0).toUpperCase() +  value.slice(1);
            setMessage(value);
            setIsDisabled(false);
        }
    }

    async function handleSubmit()
    {
        try {
            let res = await axios.post(BASE_URL+ `/send/message/${selectedUser?._id}`,{message},{withCredentials:true});
            if(res.data.success){
                setAllMessages([...allMessages,res.data.addNewMessage])
            }

        } catch (error) {
            console.log("error in sending msg" ,error)
        }       
        setMessage("");
        setIsDisabled(true);
    }

    return (
        <div className={`rounded-lg w-3/5 h-[85vh] flex flex-col shadow-lg mx-2 ${!selectedUser? "bg-gradient-to-r from-pink-300 to-purple-400 my-1" : ""}`}>
        {
            selectedUser == null ? 
            <div>
                <img src={loading}  className="w-56 m-auto"/> 
                <p className='text-center font-mono'>Welcome <span className='text-2xl font-bold text-purple-600'> Admin </span></p>
                <p className='text-center font-mono'>Please Select a chat to start messaging</p>
            </div> : (
            <>
            <div className="flex items-center gap-x-4 mt-1 p-2 bg-gradient-to-r from-purple-500 to-indigo-400 text-white rounded-t-md">
                <div className="avatar online w-12  rounded-full">
                    <img src={selectedUser?.photoUrl ||"https://avatar.iran.liara.run/public/16"}  />
                </div>
                <p className="text-lg font-semibold">{selectedUser?.fullName || "John"}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-2 bg-gradient-to-r from-blue-200 to-blue-300">
            {
                allMessages && allMessages.length ? allMessages.map(user =>(
                <div ref={scrollBar}  key={user?._id} className={`chat ${user?.fromUserId == selectedUser?._id ? "chat-start" : "chat-end"}`}>
                    
                    <div className="chat-bubble  bg-purple-200 text-black shadow-md">
                        {user?.message}
                    </div>
                    <time className="text-xs text-gray-500">12:45</time>
                </div>
                )) : <p className='text-center text-sm font-mono'>Say Hi to start a conversation</p>
            } 
            </div>

            <div className="p-2 bg-gray-50 border-t rounded-b-lg relative">
                <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    className="w-full p-2 pl-4 pr-12 rounded-full bg-gray-200 outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Type Something..."
                />
                <button onClick={handleSubmit} disabled={isDisabled} className={`absolute right-5 top-1/2 transform -translate-y-1/2 text-purple-500 ${isDisabled? "cursor-not-allowed" :""}`}>
                    <IoMdSend size={24} />
                </button>
            </div>
            </>
            )
        }
           
        </div>
    )
}

export default RightContainer;
