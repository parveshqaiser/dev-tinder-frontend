

import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const Profile = () => {

    let user = useSelector(store=> store?.user?.user);
    return (
        <>
        <nav className="mt-5">
            <div className="flex flex-col lg:flex-row items-center justify-center max-w-4xl mx-auto bg-gradient-to-r from-pink-200 to-purple-300  shadow-lg rounded-lg overflow-hidden border-2 p-2">
                {/* image container */}
                <div className="sm:w-1/3 sm:h-1/4 sm:p-3 w-full m-2">
                    <img
                        className=" object-cover rounded-full border-4 border-gray-300"
                        src={user?.photoUrl}
                        alt="profile"
                    />
                </div>

                {/* right details */}
                <div className="md:w-2/3 md:pl-4 pl-2">
                    <p className="text-3xl font-semibold text-gray-800">{user?.fullName}</p>
                    <p className="text-lg text-gray-600 font-medium mt-1">{user?.email}</p>
                    <p className="italic text-gray-500 mt-2">{user?.bio}</p>

                    <hr className="my-3 border-gray-300" />
                    
                    <div className="flex justify-start gap-x-8 text-gray-600">
                        <span className="">♀ / ♂️ {user?.gender}</span>
                        <span className="">🔞 {user?.age}</span>
                    </div>
                    
                    <hr className="my-3 border-gray-300" />
                    <h2 className="text-xl text-center font-semibold text-gray-700 my-2">Your Interests 📝</h2>
                    <p className="flex flex-wrap justify-evenly text-gray-600 gap-2">
                    {
                        user && user?.skills?.map((val)=>(
                        <span className="px-4 py-2 bg-gray-200 rounded-full"> {val || "NA"}</span>
                        ))
                    }                        
                    </p>

                    <hr className="my-3 border-gray-300" />
                    
                    <h2 className="text-xl text-center font-semibold text-gray-700 my-2">Languages Spoken 🗣</h2>
                    <p className="flex flex-wrap justify-evenly text-gray-600 gap-2">
                    {
                        user && user?.languages && user?.languages?.map((val)=>(
                            <>
                            <span className="px-4 py-2 bg-gray-200 rounded-full">{val}</span>
                            </>
                        ))
                    }
                    </p>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Profile;
