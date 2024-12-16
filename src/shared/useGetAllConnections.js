
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/apis';

const useGetAllConnections = () => {
 
    let navigate = useNavigate();

    useEffect(()=>{
        getData();
    },[]);

    async function getData()
    {
        try {
            let res = await axios.get(BASE_URL + "/users/connection/all",{withCredentials:true});
            console.log(res);
        } catch (error) {
            if(error.status == 401){
                navigate("/")
            }         
            console.log("error ",error)
        }
    }
}

export default useGetAllConnections;
