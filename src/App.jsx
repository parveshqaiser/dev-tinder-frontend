
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import SingUpPage from './components/SingUpPage'
import AlternateLogin from './components/AlternateLogin'
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
import { addAllOnlineUsers} from './redux/socketSlice'
import { getSocket } from './utils/socket'


let SocketContext = createContext();

function App() {

  let dispatch = useDispatch();
  const socketRef = useRef(null);

  let loggedInUser = useSelector((store)=> store.user.user);
  console.log("loggedInUser ",loggedInUser)
  useEffect(()=>{
    if(loggedInUser)
    {
      socketRef.current = getSocket(loggedInUser?._id);

      socketRef.current.on("connect", () => {
        console.log("Socket connected with ID:", socketRef.current.id);
      });

      socketRef.current.on("getOnlineUsers",(onlineUsers)=>{
          dispatch(addAllOnlineUsers(onlineUsers));
      });

    
      socketRef.current.on("connect_error", (error) => {
          console.error("Connection Error:", error);
      });

      return () => {
        socketRef.current?.disconnect();
    };
    }
  },[loggedInUser])

  return(
    <> 
      <BrowserRouter basename='/'>     
        <Routes>
          <Route path='/' element={<AlternateLogin />}></Route>
          <Route path='/login' element={<AlternateLogin />}></Route>
          <Route path='/signup' element={<SingUpPage />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>  

          <Route element={<Body />}>
              <Route path='/home' element={<HomePage />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/edit' element={<EditProfile />}></Route>
              <Route path='/change/password' element={<UpdatePassword/>}></Route>
              <Route path='/request' element={<PendingRequest />}></Route>
              <Route path='/friends' element={<FriendsList />}></Route>  
              <Route path='/message' element={<SocketContext.Provider value={socketRef.current}> <Message /></SocketContext.Provider>}></Route>                   
          </Route>
          <Route path='*' element={<h1 className='text-center mt-2 text-red-400 font-semibold'> 404 !!!Requested Page Not Found</h1>}></Route>
        </Routes>       
      </BrowserRouter>
    </>
  )
}

export default App;
export {SocketContext};
