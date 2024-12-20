

import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/apis';
import { addAllMessages } from '../redux/messageSlice';

const useGetAllMessages = () => {
    
    let dispatch = useDispatch();
    let selectedUser = useSelector(store=> store?.message?.selectedUser);

    useEffect(()=>{
        async function getAllMessages()
        {
            if(selectedUser!==null){
                try {
                    let res = await axios.get(BASE_URL+ `/get/messages/${selectedUser?._id || ""}`,{withCredentials:true});
                    if(res.data.success)
                    {
                        dispatch(addAllMessages(res.data.getAllMessages.messages || []))
                        // setAllMessages(res.data.getAllMessages.messages || [])
                    }
                } catch (error) {
                    console.log("err getting all msg ", error);
                }
            }           
        }
        getAllMessages()
    },[selectedUser])
}

export default useGetAllMessages;
