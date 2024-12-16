

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/apis';
import toast, { Toaster } from 'react-hot-toast';

const UpdatePassword = () => {

    let initialFormValues = {
        currentPassword : {value : "", error : ""},
        newPassword : {value : "", error : ""},
        confirmPassword : {value : "", error : ""},
    };

    useEffect(()=>{
        return(()=>{
            toast.dismiss();
        })
    },[])

    const [formValues, setFormValues] = useState({
        currentPassword : {value : "", error : ""},
        newPassword : {value : "", error : ""},
        confirmPassword : {value : "", error : ""},
    });

    function handleChange(e)
    {
        let {name ,value} = e.target;

        let newValues = {...formValues};
        
        newValues[name] ={
            value : value && value.trim(),
            error : !value ? "Required" : ""
        };

        setFormValues(newValues);
    }

    async function handleSubmit()
    {
        let {currentPassword, newPassword ,confirmPassword} = formValues;

        if(!currentPassword.value){
            setFormValues({
                ...formValues,
                currentPassword : {
                    ...formValues.currentPassword,
                    error : "Required"
                }
            });
            return;
        }

        if(!newPassword.value){
            setFormValues({
                ...formValues,
                newPassword : {
                    ...formValues.newPassword,
                    error : "Required"
                }
            });
            return;
        }

        if(!confirmPassword.value){
            setFormValues({
                ...formValues,
                confirmPassword : {
                    ...formValues.confirmPassword,
                    error : "Required"
                }
            });
            return;
        }

        if(newPassword.value !== confirmPassword.value){
            setFormValues({...formValues, confirmPassword : {...formValues.confirmPassword, error :"Password Not Matched"}});
            return;
        }

        let data = {
            password : currentPassword.value,
            newPassword : newPassword.value
        };

        try {
            let res = await axios.patch(BASE_URL + "/profile/change/password",data , {withCredentials:true});
            console.log(res);

            if(res?.data?.success){
                toast.success(res.data.message,{duration: 2000});
                setTimeout(()=>{
                    setFormValues(initialFormValues);
                },1000);                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error?.response?.data, {duration: 2000})
        }
    }

    return (
        <div className='max-w-lg mx-auto mt-10 border-2 shadow-md p-5'>
            <Toaster  />
            <p className='text-lg text-center text-pink-700 mb-2'>Update Password</p>
            <div className='mb-2'>
                <label className='block'>Your Current Password <span className='text-red-600'>*</span></label>
                <input 
                    onChange={handleChange}
                    type='password' 
                    value={formValues.currentPassword.value}
                    name='currentPassword'
                    className='w-full p-2 rounded-lg outline-none focus:ring-purple-40000 focus:ring-1' 
                />
                <span className='text-red-500 text-sm'>{formValues.currentPassword.error}</span>
            </div>
            <div className='mb-2'>
                <label className='block'>Your New Password <span className='text-red-600'>*</span></label>
                <input 
                    onChange={handleChange}
                    type='password' 
                    value={formValues.newPassword.value}
                    name='newPassword'
                    className='w-full p-2 rounded-lg outline-none  focus:ring-purple-500 focus:ring-1'
                />
                <span className='text-red-500 text-sm'>{formValues.newPassword.error}</span>
            </div>
            <div className='mb-2'>
                <label className='block'>Confirm New Password <span className='text-red-600'>*</span></label>
                <input 
                    onChange={handleChange} 
                    type='password' 
                    value={formValues.confirmPassword.value}
                    name='confirmPassword'
                    className='w-full p-2 outline-none rounded-lg  focus:ring-purple-500 focus:ring-1' 
                />
                <span className='text-red-500 text-sm'>{formValues.confirmPassword.error}</span>
            </div>
            <div className='text-center'>
                <button 
                    onClick={handleSubmit}
                    className="bg-pink-500 hover:bg-pink-600 w-1/4 p-2 rounded-md"
                >Submit</button>
            </div>
        </div>
    )
}

export default UpdatePassword;
