
import React, { useState, useEffect } from 'react'
import pic from "../../images/nicebg.jpg";
// import pic from "../../images/date.jpg";
import validator from 'validator';
import axios from 'axios';
import { BASE_URL } from '../utils/apis';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AlternateLogin = () => {

    const [formValues , setFormValues] = useState({
        email: {value :"", error :""}, 
        password : {value :"", error :""}
    });

    let navigate = useNavigate();

    let [isDisabled, setIsDisabled] = useState(false);

    const [isOnline, setIsOnline] = useState(true);

    useEffect(()=>{
        window.addEventListener("online",()=>{
            setIsOnline(true);
        });

        window.addEventListener("offline",(e)=>{
            setIsOnline(false);
        });

        return(()=>{
            toast.dismiss();
        })
    },[]);


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

        if(name == "password")
        {
            newValues[name] = {
                value : value && value.trim(),
                error : !value ? "Required" : "",
            }
        }
        setFormValues(newValues);
    }

    async function handleClick()
    {
        let {email, password} = formValues;

        if(!email.value && password.value.trim() == ""){
            setFormValues({
                ...formValues,
                email : {
                    ...formValues.email,
                    error :  (!validator.isEmail(email.value) ? "Invalid Email" : "Required")
                },
                password : {
                    ...formValues.password,
                    error : "Required"
                }                
            });
            return;
        }

        if(!password.value){
            setFormValues({
                ...formValues,
                password : {
                    ...formValues.password,
                    error : "Required"
                }
            });
            return;
        }

        let data = {
            email : formValues.email.value,
            password : formValues.password.value,
        }

        try {
            setIsDisabled(true);
            let res = await axios.post(`${BASE_URL}/login`,data ,{withCredentials:true});

            if(res?.data?.token)
            {
                toast.success("Login Success",{position:"top-center", duration:2000})
                setTimeout(()=>{
                    navigate("/home");
                    setIsDisabled(false);
                },2100)               
            }
           
        } catch (err) {
            toast.error(err?.response?.data?.message || "Check Internet Connection",{position:"top-center", duration:2000})
            console.log(err.response)
            setIsDisabled(false);
        }
    }


    if(isOnline == false)
    {
        return<h2 className="text-center text-2xl">You're Offline. Please Check your network connection.</h2>
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center  lg:items-start mt-5 mb-2 lg:mx-10">
            <div className="w-full md:w-3/5 bg-cover bg-center object-cover m-2">
                <img src={pic} className="rounded-lg min-h-screen" />
            </div>
            <Toaster />
            <div className="w-full md:w-2/6 p-3 mx-5 md:mt-10">
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-pink-500">Dev Tinder</h2>
                <p className="text-center mb-2">Date❤️, Make Friends & meet new people👦👧</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block mb-1 text-pink-400">Email</label>
                        <input
                            name='email'
                            autoComplete='off'
                            placeholder="Tell us your Email Id"
                            onChange={handleChange}
                            value={formValues.email.value}
                            className="w-full px-3 py-2 rounded-md focus:outline-pink-500 focus:ring-1"
                        />
                        <span className="text-red-600 text-sm">{formValues.email.error}</span>
                    </div>
                    <div className="relative">
                        <label className="block text-pink-400">Password</label>
                        <input
                            type='password'
                            placeholder="Minimum 5 characters"
                            onChange={handleChange}
                            value={formValues.password.value}
                            name="password"
                            className="w-full px-3 py-2 rounded-md focus:outline-pink-500 focus:ring-1"
                        />
                        {/* <FontAwesomeIcon 
                          onClick={handleTogglePassword}
                            icon={!showPassword ? faEyeSlash : faEye} 
                            className={`absolute myClass right-3 text-gray-500 cursor-pointer`}
                        /> */}
                        <span className="text-red-600 text-sm">{formValues.password.error} </span>
                    </div>
                    <div>
                    {
                        isDisabled ?  
                        <button  disabled className="bg-pink-600 cursor-not-allowed w-full text-white px-6 py-2 rounded-md">
                            Logging...
                        </button> :  <button
                            className="bg-pink-500 hover:bg-pink-600 w-full text-white px-6 py-2 rounded-md"
                            onClick={handleClick}
                        >
                            Submit
                        </button>
                    }
                    </div>                   
                    <p className='text-center text-blue-500 underline'>
                       <Link to="/signup"> Create New Account  </Link>
                    </p>
                </form>
                <p 
                    className='cursor-pointer text-sm text-center mt-2 text-blue-400 hover:text-pink-500'
                    >
                    <Link to="/forgot-password"> Forgot Password </Link>
                </p>
            </div>
        </div>       
    )
}

export default AlternateLogin;
