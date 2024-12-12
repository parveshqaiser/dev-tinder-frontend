

import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/apis';
import toast from 'react-hot-toast';
import { addPendingRequest } from "../redux/userSlice";

const PendingRequest = () => {

    let allRequest = useSelector(store => store?.user?.allPendingRequest);

    let dispatch = useDispatch();

    async function handleAcceptReject(id , status)
    {
        try {
            let res= await axios.post(BASE_URL + `/request/review/${status}/${id}`,{},{withCredentials:true});

            if(res.data.success){
                toast.success(res.data.message ,{duration:2500});
                let modify = allRequest.filter(val => val?._id !== id);
                dispatch(addPendingRequest(modify))
                
            }
        } catch (error) {
            console.log("error", error);
            toast.error(error.response.data.message || error?.response?.data, {duration: 2500})
        }
    }

    return (
    <div className="mt-5 mx-5 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {
            !!allRequest && allRequest.length ? allRequest.map((val) => (
                <div 
                    key={val._id} 
                    className="bg-white shadow-md hover:bg-gray-100 rounded-lg p-5 flex flex-col items-center"
                >
                    {/* <p>sent 2 days ago</p> */}
                    <img 
                        src={val?.fromUserId?.photoUrl} 
                        alt={val?.fromUserId?.fullName} 
                        className="w-24 h-24 rounded-full mb-3 object-cover"
                    />
                    
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">{val?.fromUserId?.fullName}</h2>
                        <p className="text-sm text-gray-600">{val?.fromUserId?.age } years old</p>
                        <p className="text-sm font-semibold text-gray-600">{val?.fromUserId?.gender}</p>
                        <p className="text-sm text-gray-600 mt-2">{val?.fromUserId?.bio || "No bio available"}</p>
                    </div>

                    <div className="mt-1 flex gap-2">                      
                        <button 
                            onClick={()=> handleAcceptReject(val?._id ,"Reject")}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Reject
                        </button>
                        <button 
                            onClick={()=> handleAcceptReject(val?._id ,"Accept")}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            )) : <p className='text-lg font-semibold'>You Don't have any new Friend Request</p>
        }
    </div>
    )
}

export default PendingRequest
