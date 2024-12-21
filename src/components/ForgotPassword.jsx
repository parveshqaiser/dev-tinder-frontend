

import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BASE_URL } from '../utils/apis';
import { useNavigate } from 'react-router-dom';
import { FaUnlockAlt } from "react-icons/fa";

const ForgotPassword = () => {

    const [formValues, setFormValues] = useState({
        email : {value : "", error : ""},
        newPassword : {value : "", error : ""},
        confirmPassword : {value : "", error : ""}
    });

    let navigate = useNavigate();

    const [showEmail , setShowEmail] = useState(true);


    function handleChange(e)
    {
        let {name, value} = e.target;
        let newValues = {...formValues};

        newValues[name] = {
            value : value && value.trim(),
            error : !value ? "Required" : value.trim() == "" ? "Required" : ""
        }
        setFormValues(newValues)
    }

    async function handleSubmit(status)
    {
        let {email, newPassword, confirmPassword} = formValues;
        if(status == "email")
        {
            if(formValues.email.value == "")
            {
                setFormValues({...formValues, email : {...formValues.email, error : "Required *"}});
                return;
            }
    
            let email = formValues.email.value;
            try {
                let res = await axios.post(BASE_URL+ "/check/email",{email}, {withCredentials: true});
                if(res.data.success){
                    toast.success("Email valid", {duration : 2000})
                    setTimeout(()=>{
                        setShowEmail(false)
                    },1300)
                }
            } catch (error) {
                console.log("er ", error);
                toast.error(error?.response?.data?.message, {duration : 2000})
            }
        }
        
        if(status == "password")
        {
            if(newPassword.value == "")
            {
                setFormValues({...formValues, newPassword : {...formValues.newPassword, error : "Required *"}});
                return;
            }

            if(confirmPassword.value == "")
            {
                setFormValues({...formValues, confirmPassword : {...formValues.confirmPassword, error : "Required *"}});
                return;
            }

            if(newPassword.value !== formValues.confirmPassword.value)
            {
                setFormValues({...formValues, confirmPassword : {...formValues.confirmPassword, error : "Password Not matched*"}});
                return;
            }

            let data = {
                email : email.value,
                newPassword : newPassword.value,
                confirmPassword : confirmPassword.value
            }

            try {
                let res = await axios.post(BASE_URL + "/forgot/password",data, {withCredentials: true})
                if(res.data.success){
                    toast.success(res.data.message , {duration : 1000})
                    setTimeout(()=>{
                        navigate("/login")
                    },1100)
                   
                }
            } catch (error) {
                toast.error(error?.response?.data?.message, {duration : 2000})
            }
        }        
    }



    return(
    <div className='md:max-w-lg mx-auto bg-gradient-to-r from-pink-300 to-purple-400 mt-10 rounded-lg shadow-md p-5'>
        <Toaster  />
        <div className='flex gap-x-2 justify-center'>
            <p className='text-lg text-pink-700 mb-2'>Forgot Password </p><FaUnlockAlt size={24} />
        </div>
        {showEmail && (
        <div className='mb-2'>
            <label className='block'>Your Current Email </label>
            <input 
                onChange={handleChange}
                type='text' 
                value={formValues.email.value}
                name='email'
                className='w-full p-2 rounded-lg outline-none focus:ring-purple-40000 focus:ring-1' 
            />
            <span className='text-red-500 text-sm'>{formValues.email.error}</span>
        </div>
        )}

        {!showEmail && (
        <>
            <div className='mb-2'>
                <label className='block'>Your New Password</label>
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
                <label className='block'>Confirm New Password</label>
                <input 
                    onChange={handleChange} 
                    type='password' 
                    value={formValues.confirmPassword.value}
                    name='confirmPassword'
                    className='w-full p-2 outline-none rounded-lg  focus:ring-purple-500 focus:ring-1' 
                />
                <span className='text-red-500 text-sm'>{formValues.confirmPassword.error}</span>
            </div>
            </>
        )}
        
        <div className='text-center'>
            <button 
                onClick={()=>handleSubmit(showEmail ? "email" : "password")}
                className="bg-pink-500 hover:bg-pink-600 w-1/2 p-2 rounded-md animated-button transition-all duration-300"
            >
                {showEmail ? "Verify Email" : "Submit Password"}
            </button>
        </div>
    </div>
    )
}

export default ForgotPassword
