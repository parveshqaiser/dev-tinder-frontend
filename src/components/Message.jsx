
import React from 'react'
import LeftMessage from './LeftMessage';
import RightContainer from './RightContainer';
import useGetAllConnections from '../shared/useGetAllConnections';
import { useSelector } from 'react-redux';

const Message = () => {

    let {isLoading} = useGetAllConnections();

    let allConnection = useSelector(store => store?.user?.allConnectionUsers);

    return (
        <div className='flex'>        
            <LeftMessage isLoading={isLoading} allConnection ={allConnection}/>
            <RightContainer />
        </div>
    )
}

export default Message;

// flex h-[85vh]  overflow-hidden bg-pink-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50