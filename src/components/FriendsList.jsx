
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/apis'
import loading from "../../images/loveloading.gif";
import { BACKUP_PROFILE_URL } from '../utils/constants';
import { FaLanguage } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";

const FriendsList = () => {

    const [friendsList, setFriendsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [storeProfile , setStoreProfile] = useState(null);
    const [searchText , setSearchText] = useState("");
    const [alternateList, setAlternateList] = useState([]);

    useEffect(()=>{
        getAllFriends()
    },[]);

    useEffect(()=>{
        if(searchText && searchText.trim())
        {
            let modify = !!alternateList && alternateList.filter(val => val?.fullName?.toLowerCase().includes(searchText.trim().toLowerCase()))
            setFriendsList(modify);
        }else {
            setFriendsList(alternateList);
        }
    },[searchText])

    async function getAllFriends()
    {
        setIsLoading(true)
        try {
            let res =  await axios.get(BASE_URL + "/users/connection/all",{withCredentials:true});
            if(res.data.success){
                setFriendsList(res?.data?.data);
                setAlternateList(res.data.data);
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    if(isLoading)
    {
        <div className='mt-5 flex justify-center'>
            <img src={loading} className='w-28 h-28' />
        </div>
        return;
    }

    return (
    <nav className='mt-5 flex flex-col lg:flex-row'>
        {/* right */}
        <div className='w-full lg:w-1/4 lg:mx-8 p-2 rounded-lg bg-white'>
            <span className='text-sm'>All Connections</span>
            <div className='my-2'>
                <input 
                    onChange={(e)=> setSearchText(e.target.value)}
                    type="text" 
                    className='w-full p-2 bg-fuchsia-200 rounded-lg outline-none  focus:ring-purple-300 focus:ring-1' 
                    placeholder='Search Friends'
                />
            </div>
            <hr className="my-2" />
            {/* h-80 */}
            <div className='overflow-auto h-80 lg:h-[60vh]'>
                <p className='mb-3'>{!!friendsList && friendsList.length} Friends</p>
                {
                    !!friendsList  && friendsList.length ? friendsList.map(val=>(
                        <div key={val._id} className='flex justify-between items-center my-3'>
                            <img src={val?.photoUrl || BACKUP_PROFILE_URL} className='w-16 h-16 rounded-full'/>
                            <span className='mx-2 font-semibold'>{val.fullName}</span>
                            <span 
                                className='mx-2 font-semibold text-gray-400 text-lg cursor-pointer' 
                                title='View' 
                                onClick={()=>setStoreProfile(val)}>
                                <BsEyeFill />
                            </span>
                        </div>
                    )) :(!!friendsList && friendsList.length==0) ? <p>  <span className='font-semibold'> "{searchText} "</span> not found.</p> :<p>Opps! Your Friend List is empty.</p>
                }               
            </div>
        </div> 

        {/* left */}
        <div className="w-full lg:w-2/3 rounded-lg sticky top-0 min-h-56 lg:h-[80vh] bg-gradient-to-r from-pink-200 to-purple-300">
            <div className="w-full rounded-lg p-2 flex flex-col items-center">
                {!storeProfile ? (
                    <p className="font-bold p-5 text-center text-lg text-gray-700">
                        Select People's Name to preview their profile.
                    </p>
                ) : (
                    <div className="flex flex-col items-center">
                        <img 
                            src={storeProfile?.photoUrl} 
                            alt="Profile" 
                            className="w-44 h-44 rounded-full mb-4 object-cover shadow-md"
                        />
                        <h2 className="text-xl font-bold text-gray-800">{storeProfile?.fullName || "No Name"}</h2>
                        <p className="text-gray-600 text-sm">{storeProfile?.age ? `${storeProfile.age} years old` : "Age not available"}</p>
                        <p className="text-gray-600 text-sm font-medium">{storeProfile?.gender || "Gender not specified"}</p>
                        <p className="text-center text-gray-600 italic mb-2">
                            {storeProfile?.bio || "No bio available"}
                        </p>
                       <span className='italic font-serif'> <FaLanguage className='inline'/> I Can Communicate well in</span>
                        <p className='flex justify-evenly text-gray-600 '>
                            {storeProfile?.languages.map((lang, index)=> <span key={index} className='px-4 py-1'>{lang}</span>)}
                        </p>
                        <span className='italic font-sans'><FaReact className='inline' /> Technologies that I know  </span>
                        <p className='flex flex-wrap justify-evenly text-gray-600'>
                            {storeProfile?.skills.map((skill, index)=> <span key={index} className='px-4 py-1'>{skill}</span>)}
                        </p>                       
                    </div>
                )}
            </div>
        </div>

    </nav>
    )
}

export default FriendsList;
