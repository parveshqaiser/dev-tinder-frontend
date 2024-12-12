
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/apis';

const useGetUserProfile = () => {
 
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=>{
        getUserData()
    },[]);

    async function getUserData()
    {
        try {
            let res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
            if (res.data.success);
            {
                dispatch(addUser(res.data.user));
            }
           
        } catch (error) {
            if(error.status == 401){
                navigate("/")
            }          
            console.log("error ",error)
        }
    }
}

export default useGetUserProfile;
