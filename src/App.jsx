
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
// import LoginPage from './components/LoginPage'
import SingUpPage from './components/SingUpPage'
import AlternateLogin from './components/AlternateLogin'
import { Provider } from 'react-redux'
import appStore from './redux/configureStore'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import Body from './components/Body'
import UpdatePassword from './components/UpdatePassword'
import PendingRequest from './components/PendingRequest'
import FriendsList from './components/FriendsList'

function App() {
  return(
    <>
    <Provider store={appStore}> 
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<AlternateLogin />}></Route>
          <Route path='/login' element={<AlternateLogin />}></Route>
          <Route path='/signup' element={<SingUpPage />}></Route>

          <Route element={<Body />}>
              <Route path='/home' element={<HomePage />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/edit' element={<EditProfile />}></Route>
              <Route path='/change/password' element={<UpdatePassword/>}></Route>
              <Route path='/request' element={<PendingRequest />}></Route>
              <Route path='/friends' element={<FriendsList />}></Route>
          </Route>
          <Route path='*' element={<h1 className='text-center mt-2 text-red-400 font-semibold'> 404 !!!Requested Page Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
