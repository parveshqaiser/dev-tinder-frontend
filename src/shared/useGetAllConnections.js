
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/apis';
import { useDispatch } from 'react-redux';
import { addAllConnection } from '../redux/userSlice';

const useGetAllConnections = () => {
 
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{
        getData();
    },[]);

    async function getData()
    {
        setIsLoading(true)
        try {
            let res = await axios.get(BASE_URL + "/users/connection/all",{withCredentials:true});
            if(res?.data?.success){
                dispatch(addAllConnection(res.data.data))
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            if(error.status == 401){
                navigate("/")
            }         
            console.log("error ",error)
        }
    }

    return {isLoading}
}

export default useGetAllConnections;
