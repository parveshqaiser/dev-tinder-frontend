

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedUser } from '../redux/messageSlice';

const LeftMessageBox = ({isLoading ,allConnection}) => {

    let dispatch = useDispatch();

    const [allFriends , setAllFriends] = useState(allConnection)
    const [searchText , setSearchText] = useState("");

    let allOnlineUsers = useSelector(store => store?.socket?.allOnlineUsers);


    useEffect(()=>{
        if(searchText.trim() !=="")
        {
            let filterData = !!allConnection && allConnection.filter(val => val.fullName.toLowerCase().includes(searchText.trim().toLowerCase()));
            setAllFriends(filterData || []);
        }else {
            setAllFriends(allConnection);
        }
    },[searchText, allConnection])

    async function handleClick(user)
    {
        dispatch(addSelectedUser(user))
    }

    return (
        <div className="w-full lg:w-1/4 h-[80vh] mt-3 flex flex-col lg:mx-3 rounded-lg">
            <div className="my-2 px-3">
                <input
                    placeholder="Search Friends..."
                    type="text"
                    onChange={(e)=> setSearchText(e.target.value)}
                    className="w-full p-2 pl-4 rounded-full bg-gray-200 outline-none focus:ring-2 focus:ring-purple-400"
                />
            </div>

            <hr className="my-2 border-gray-300 mx-3" />

            <div className="overflow-y-auto flex-1 px-3 py-2 space-y-3">
            {
                isLoading ?<p className='font-semibold text-center'>Loading Connections..</p> 
                : allFriends?.length ? allFriends.map((user) => {
                let isOnline = allOnlineUsers && allOnlineUsers.includes(user?._id);
                return(
                    <div
                        onClick={()=> handleClick(user)}
                        key={user?._id}
                        className="flex items-center gap-x-4 p-2 hover:bg-gradient-to-r from-purple-500 to-indigo-400 rounded-lg cursor-pointer transition-all"
                    >
                        <div className={`w-12 h-12 ${isOnline ? "avatar online" : ""}`}>
                            <img 
                                src={user?.photoUrl || "https://avatar.iran.liara.run/public/16"} 
                                alt="Image"
                                className='rounded-full'
                            />
                        </div>
                    <p className="text-gray-700 font-semibold">{user?.fullName || "NA"}</p>
                    </div>
                )                
            })
            : searchText.length ? <p>" {searchText}" not found</p> :<p className='font-semibold text-center'>You Don't have any connections</p> }
            </div>
        </div>
    )
}

export default LeftMessageBox;

// https://avatar.iran.liara.run/public/16