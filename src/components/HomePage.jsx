

import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/apis';
import { useDispatch, useSelector } from 'react-redux';
import { addAllFeeds} from '../redux/userSlice';
import toast from 'react-hot-toast';
// import loading from "../../public/images/loading.gif";
import { useNavigate } from 'react-router-dom';
// import TinderCard from 'react-tinder-card';


const HomePage = () => {
  
    let dispatch = useDispatch();
    let feed = useSelector(store => store?.user?.allFeed);
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        getAllFeeds();
    },[]);

    // function handleSwipe(direction)
    // {
    //     if (direction === 'left' || direction === 'right') {           
    //     }
    // }

    async function getAllFeeds()
    {
        try {
            setIsLoading(true)
            let res = await axios.get(BASE_URL+"/users/feed",{withCredentials:true});
            if(res.data.success)
            {
                dispatch(addAllFeeds(res.data.data));
                setIsLoading(false)
            }           
        } catch (error) {
           
            if(error.status == 401){
                 console.log("going herreeeeeeeeeee")
                navigate("/")
            }   
            setIsLoading(false)
            toast.error(error.response.data.message, {duration : 1500})
        }
    }

    async function handleIgnoreInterest(id,status)
    {
        try {
            let res = await axios.post(BASE_URL + `/request/${status}/${id}`,{},{withCredentials:true});
            if(res.data.success){
                toast.success(status == "Interest" ? "Request Sent" : "Profile Ignored", {duration: 2000});
                setTimeout(()=>{
                    let modifyAllFeed = feed && feed.filter(val => val?._id !==id);
                    dispatch(addAllFeeds(modifyAllFeed))
                },1200)
            }

        } catch (error) {   
            console.log(error);
            toast.error(error?.response?.data?.message , {duration :2000})
        }
    }

    if(isLoading) 
    {
        <div className='mt-5 flex justify-center'>
            <img src="/images/loading.gif" className='w-24 h-24' />
        </div>
        return
    }

    return (
        <main className='w-[265px] mx-auto mt-2 p-1 bg-slate-200 rounded-md'>
            <p className='text-center'>{!!feed && feed.length>1 && "Swipe Left or Right"}</p>
            <div className="carousel rounded-box w-64">
            {
                feed && feed.map((val) =>{
                    return(
                    <div key={val._id} className="carousel-item w-full flex flex-col items-center">
                        <img
                            src={val.photoUrl}
                            className="w-full"
                            alt="Feed Images"
                        />
                        <div className="mt-2 text-center">
                            <blockquote className="text-sm font-semibold italic">{val.bio}</blockquote>
                            <span className="font-bold block">{val.fullName}</span>
                            <span className="font-semibold block">{val.age} years old</span>
                        </div>
                        <div className="flex justify-between mt-3 w-full px-3">
                            <button
                                className="rounded-full px-4 py-2 shadow-md hover:bg-red-300"
                                onClick={() => handleIgnoreInterest(val._id,"Ignore")}
                                title="Ignore"
                            >
                                ❌
                            </button>
                            <button
                                className="rounded-full px-4 py-2 shadow-md hover:bg-green-300"
                                onClick={() => handleIgnoreInterest(val._id,"Interest")}
                                title="Favorite"
                            >
                                💚
                            </button>
                        </div>                                    
                    </div>
                    )
                })
            }        
            </div>
        </main>
    )
}

export default HomePage;

/*
<>

    <div className="carousel-item w-full">
        <img
            src={val.photoUrl}
            className="w-full"
            alt="Tailwind CSS Carousel component" 
        />
    </div>
    <div>
        <blockquote className='text-sm font-semibold italic '>{val.bio}</blockquote>
        <span className='font-bold'>{val.fullName}v</span>

        <div className='flex justify-between'>
            <button
                className="rounded-full px-4 py-2 shadow-md"
                onClick={() => handleIgnoreInterest()}
                title='Ignore'
            >
            ❌
            </button>
            <button
                className="rounded-full px-4 py-2 shadow-md"
                onClick={() => handleIgnoreInterest()}
                title='Favorite'
            >
            💚
            </button>
        </div>               
    </div>
</>

*/
