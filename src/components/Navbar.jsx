
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_PROFILE_URL } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/apis';
import { removeUser } from '../redux/userSlice';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BsFillPersonPlusFill, BsFillHouseDoorFill ,BsKeyFill, BsWrench } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";

const Navbar = ({user}) => {

    let navigate = useNavigate();

    let dispatch = useDispatch();

    let allRequest = useSelector(store => store?.user?.allPendingRequest);

    useEffect(()=>{
        toast.dismiss();
    },[])

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleDropDown()
    {
        setIsDropdownOpen(false)
    }

    async function handleLogout()
    {
        try {
            let res = await axios.post(BASE_URL + "/logout",{},{withCredentials: true});
            if(res.data.success);
            {
                toast.success("Log out success",{duration: 1500,position: 'top-center'});
                setTimeout(()=>{
                    navigate("/login");
                    dispatch(removeUser());
                },1800); 
            }                  

        } catch (error) {
            toast.error(error.message,{duration: 1200,position: 'top-center'});
            console.log("** ", error);
        }
    }

    return (
    <>
    <Toaster />
    <div className="navbar bg-pink-500">
        <div className="flex-1">
            <span className="btn btn-ghost text-2xl text-white">Dev Tinder</span>
        </div>

        {user && <div className='text-white'>{user?.gender == "Male" ? "Mr " : "Miss "} <span className='font-semibold'>&nbsp; {user?.fullName}</span></div>}

        <button role="button" tabIndex={1} className="btn btn-ghost btn-circle">
            <div className="indicator dropdown dropdown-end">
                <label tabIndex={1} className="cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item">{allRequest.length || 0}</span>
                </label>

                {/* Dropdown Menu */}
                <ul
                    tabIndex={1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-12 w-40 p-1 shadow"
                >                    
                <li>
                    <Link to='/request'>View Request</Link>
                </li>                    
                </ul>
            </div>
        </button>

        <div className="flex-none gap-2 mx-5">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" onClick={()=> setIsDropdownOpen(!isDropdownOpen)} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        {
                            user && (
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user?.photoUrl || DEFAULT_PROFILE_URL} 
                            />
                            )
                        }                    
                    </div>
                </div>
                {isDropdownOpen && (
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                     <li>
                        <Link to='/home' onClick={handleDropDown}> <BsFillHouseDoorFill />Home</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="justify-between" onClick={handleDropDown}>Profile
                            <span className="badge">New</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/edit" onClick={handleDropDown}><FaUserEdit />Edit Profile</Link>
                    </li>
                    <li>
                        <Link to='/friends' onClick={handleDropDown}><BsFillPersonPlusFill /> Friends</Link>
                    </li>
                   
                    <li>
                        <Link to='/change/password' onClick={handleDropDown}><BsKeyFill /> Change Password</Link>
                    </li>
                    <li>
                        <Link onClick={handleLogout}> <BsWrench />Logout</Link>
                    </li>
                </ul>
            )}                
            </div>
        </div>

        <dialog id="open_model" className="modal">
            <div className="modal-box">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">✕</button>
                </form>
                <h5 className="font-semibold text-md">All Request {allRequest.length || 0}</h5>
                {/* {
                    !!allRequest && allRequest.map(val=>(
                        <>
                        <div>
                            <img src={val?.fromUserId?.photoUrl} className='w-12 rounded-full' />
                            <p>click to view</p>
                        </div>
                        
                        </>
                    )) 
                }                */}
            </div>
        </dialog>
    </div>
    </>
    
    )
}

export default Navbar
