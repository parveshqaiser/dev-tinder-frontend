
import { createSlice } from "@reduxjs/toolkit";

let messageSlice = createSlice({
    name :"message",
    initialState : {
        selectedUser : null,
        allMessages : [],
    },
    reducers : {
        addSelectedUser : (state, action)=>{
            state.selectedUser = action.payload
        },
        addAllMessages : (state, action)=> {
            state.allMessages= action.payload
        }
    }
});

export let {addSelectedUser, addAllMessages} = messageSlice.actions;

export default messageSlice.reducer;
