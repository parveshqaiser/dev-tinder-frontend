
import React from 'react'
import pic from "../../images/nicebg.jpg";
import axios from 'axios';
import { BASE_URL } from '../utils/apis';

const LoginPage = () => {

    // this component we are not using now because of UI issue.

    return (
    <div className="min-h-svh justify-center flex bg-no-repeat bg-center" style={{ backgroundImage: `url(${pic})` }}>
        <div className="mt-16">
            <h2 className="text-center font-semibold text-xl mb-2 text-pink-500">
                Login to your Account
            </h2>
            <div className="mb-2">
                <input
                    type="text"
                    name='email'
                    className="w-full bg-transparent 
                    my-2 pt-2 pr-10 pb-2 pl-4 
                    rounded-3xl focus:outline-none 
                    border-2 text-red-500 placeholder-current"
                    placeholder="Email Address"
                />
                <span className="text-red-600 text-md">Error</span>
            </div>   
        
            <div className="mb-2">
                <input
                    type="password"
                    name="password"
                    className="w-full bg-transparent 
                    my-2 pt-2 pr-10 pb-2 pl-4 
                    rounded-3xl focus:outline-none 
                    border-2 text-red-500 placeholder-current"
                    placeholder="Password"
                />
                <span className="text-red-600 text-md">Error</span>
            </div>   
            <button 
                className='bg-red-700 w-full cursor-pointer h-11 font-bold rounded-3xl hover:bg-red-400' 
            >
                Login
            </button>
        </div>
    </div>
    )
}

export default LoginPage
