

import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/apis'
import { useDispatch } from 'react-redux'
import { addPendingRequest } from '../redux/userSlice'

const useGetAllPendingRequest = () => {
  
    let dispatch = useDispatch();

    useEffect(()=>{
        getAllPendingRequest()
    },[])

    async function getAllPendingRequest()
    {
        try {
            let res = await axios.get(BASE_URL + "/users/request/pending",{withCredentials:true});
            if(res.data.success){
                dispatch(addPendingRequest(res.data.allPendingRequest))
            }

        } catch (error) {
            console.log("error in getting pending request", error);
        }
    }
}

export default useGetAllPendingRequest;
