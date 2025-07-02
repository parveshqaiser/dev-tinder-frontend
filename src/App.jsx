
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import SingUpPage from './components/SingUpPage'
import Login from './components/Login'
import {useDispatch, useSelector } from 'react-redux'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import Body from './components/Body'
import UpdatePassword from './components/UpdatePassword'
import PendingRequest from './components/PendingRequest'
import FriendsList from './components/FriendsList'
import Message from './components/Message'
import ForgotPassword from './components/ForgotPassword'
import { createContext, useEffect, useRef, } from 'react'
import { addAllOnlineUsers} from './redux/socketSlice';

import { disconnectSocket, getSocket } from './utils/socket'
import { Toaster } from 'react-hot-toast'


let SocketContext = createContext();

function App() {

    let dispatch = useDispatch();
    const socketRef = useRef(null);

    let loggedInUser = useSelector((store)=> store.user.user);
    
    useEffect(()=>{
		let socketValue = null;
		if(loggedInUser)
		{
			socketValue = getSocket(loggedInUser?._id)
			socketValue.emit("requestOnlineUsers");
			
			socketValue.on("getOnlineUsers", (onlineUsers)=>{
				dispatch(addAllOnlineUsers(onlineUsers));
			})		
		}

        return () => {
        	// console.log("Socket cleanup");
        	disconnectSocket();
        };

    },[loggedInUser, dispatch])


  return(
	<>
	<SocketContext.Provider value={socketRef}>
		<BrowserRouter basename='/'>     
			<Toaster />
			<Routes>
				<Route path='/' element={<SingUpPage />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/signup' element={<SingUpPage />}></Route>
				<Route path='/forgot-password' element={<ForgotPassword />}></Route>  

				<Route element={<Body />}>
					<Route path='/home' element={<HomePage />}></Route>
					<Route path='/profile' element={<Profile />}></Route>
					<Route path='/edit' element={<EditProfile />}></Route>
					<Route path='/change/password' element={<UpdatePassword/>}></Route>
					<Route path='/request' element={<PendingRequest />}></Route>
					<Route path='/friends' element={<FriendsList />}></Route>  
					<Route path='/message' element={<Message />}></Route>                   
				</Route>
				<Route path='*' element={<h1 className='text-center mt-2 text-red-400 font-semibold'> 404 !!!Requested Page Not Found</h1>}></Route>
			</Routes>     
		</BrowserRouter>
	</SocketContext.Provider>
	</>)
}

export default App;
export {SocketContext};