import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name : "socket",
    initialState : {
        allOnlineUsers : []
    },
    reducers : {
        addAllOnlineUsers : (state, action)=> {
            state.allOnlineUsers = action.payload
        },
    }
});

export let {addAllOnlineUsers} = socketSlice.actions;
export default socketSlice.reducer;