

import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import useGetUserProfile from '../shared/useGetUserProfile';
import { useSelector } from 'react-redux';
import useGetAllPendingRequest from '../shared/useGetAllPendingRequest';

const Body = () => {

    useGetUserProfile(); // custom hook of user
    useGetAllPendingRequest();
    let user = useSelector((store)=> store?.user?.user);

    return (
    <>
        <Navbar  user={user}/>
        <Outlet />
    </>
    )
}

export default Body;
