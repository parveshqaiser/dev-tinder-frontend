
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {FaArrowLeft } from "react-icons/fa"
import { IoFlash } from "react-icons/io5"
import { MdEmail } from "react-icons/md"
import axios from 'axios';
import toast from 'react-hot-toast'
import { BASE_URL } from '../utils/apis';
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

    const handleSubmit = async(status)=>
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
                toast.error(error?.response?.data?.message || error?.message, {duration : 2000})
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
            };

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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">

        <section className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
            {/* left side */}
            <aside>
                <div className="text-center space-y-2 p-6 pb-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <MdEmail className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Forgot Dev Tinder Password?</h2>
                    <p className="text-gray-300 text-sm px-4">
                        No worries! Enter your email address to reset your passowrd.
                    </p>
                </div>
            </aside>

            {/* right side */}
            <aside className="w-full max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg">
                    <div className="p-4 pb-0">
                        <Link
                            to="/login"
                            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                        >
                            <FaArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Link>
                    </div>

                    <div className="space-y-6 p-6 pt-2">
                    {showEmail && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    type='text' 
                                    autoComplete='off'
                                    value={formValues.email.value}
                                    name='email'
                                    placeholder="Enter your registered email"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none pl-12"
                                />
                                <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                            <span className='text-white text-sm'>{formValues.email.error}</span>
                        </div>
                    )} 
                    {!showEmail && (
                    <>
                        <div className='space-y-2'>
                            <label className="text-sm font-medium text-gray-300">Your New Passowrd</label>
                            <input 
                                onChange={handleChange}
                                type='password' 
                                value={formValues.newPassword.value}
                                name='newPassword'
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none"
                            />
                            <span className='text-white text-sm'>{formValues.newPassword.error}</span>
                        </div>
                        <div className='space-y-2'>
                            <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
                            <input 
                                onChange={handleChange} 
                                type='password' 
                                value={formValues.confirmPassword.value}
                                name='confirmPassword'
                                 className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded-md focus:outline-none"
                            />
                            <span className='text-white text-sm'>{formValues.confirmPassword.error}</span>
                        </div>
                    </>
                    )}                       
                        
                        
                        <button 
                            onClick={()=>handleSubmit(showEmail ? "email" : "password")}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105 rounded-md"
                        >
                            {showEmail ? "Verify Email" : "Reset Password"}
                        </button>
                                    
                    </div>
                </div>
            </aside>
        </section>
    </main>
    );
}

export default ForgotPassword;
