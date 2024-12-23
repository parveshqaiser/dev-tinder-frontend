

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BASE_URL } from '../utils/apis';
import { Link, useNavigate } from 'react-router-dom';
import { FaUnlockAlt } from "react-icons/fa";
import img from "../../images/forgot.jpg"
import validator from 'validator';

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

        if(name == "email")
        {
            newValues[name] ={
                value : value && value.trim(),
                error : !value ? "Required" : !validator.isEmail(value) ? "Invalid Email" : "",
            }
        }
        
        if (name == "newPassword" || name == "confirmPassword")
        {
            newValues[name] = {
                value : value && value.trim(),
                error : !value ? "Required" : "Password must be of length 6 chars"
            }
        }
        setFormValues(newValues)
    }

    async function handleSubmit(status)
    {
        var {email, newPassword, confirmPassword} = formValues;

        if(status == "email")
        {
            if((!validator.isEmail(email.value)))
            {
                setFormValues({
                    ...formValues,
                    email : {
                        ...formValues.email,
                        error :  !email.value ? "Required*" : "Invalid Email"
                    }});
                return;
            }
    
            let emailData = formValues.email.value;
            try {
                let res = await axios.post(BASE_URL+ "/check/email",{emailData}, {withCredentials: true});
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
            if(newPassword.value == "" || newPassword.value.length<=5)
            {
                setFormValues({...formValues,
                    newPassword : {...formValues.newPassword,
                        error : !newPassword.value ? "Required*" : newPassword.value.length <=5 ? "Password Length must be 6 chars" : ""
                    }});
                return;
            }

            if(confirmPassword.value == "" || confirmPassword.value.length<=5)
            {
                setFormValues({...formValues,
                    confirmPassword : {...formValues.confirmPassword,
                        error : !confirmPassword.value ? "Required*" : confirmPassword.value.length <=5 ? "Password Length must be 6 chars" : ""
                    }});
                return;
            }

            if(newPassword.value !== formValues.confirmPassword.value)
            {
                setFormValues({...formValues,
                    newPassword : {...formValues.newPassword,error : ""},
                    confirmPassword : {...formValues.confirmPassword, error : "Password Not matched*"}
                });
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
                    toast.success(res.data.message , {duration : 2000})
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-3 lg:px-20">
            <>
                <img src={img}  className='rounded-lg'/>
            </>

            <div className="text-center md:text-left">
                <div className='flex items-center'>
                    <p className='text-3xl font-bold text-pink-500 mb-4'>Forgot Password ? <FaUnlockAlt size={24} /></p>
                </div>
                {showEmail && (
                    <div className='mb-2'>
                        <label className='block text-gray-600 mb-2'>Please enter your email address below </label>
                        <input 
                            onChange={handleChange}
                            type='text' 
                            autoComplete='off'
                            value={formValues.email.value}
                            name='email'
                            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none"
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
                            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none"
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
                            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none"
                        />
                        <span className='text-red-500 text-sm'>{formValues.confirmPassword.error}</span>
                    </div>
                </>
                )}
                <div className=''>
                    <button 
                        onClick={()=>handleSubmit(showEmail ? "email" : "password")}
                        className="bg-pink-500 hover:bg-pink-600 sm:w-1/3 w-full p-2 rounded-md animated-button transition-all duration-300"
                    >
                        {showEmail ? "Verify Email" : "Reset Password"}
                    </button>
                </div>
                <p className='underline text-sm text-blue-500 my-2'> <Link to="/login">Back to Login</Link></p>
        
            </div>
        </div>
    </div>
    );
}

export default ForgotPassword;

{/* <h1 className="text-2xl font-bold text-pink-500 mb-4">Forgot Password?</h1> */}