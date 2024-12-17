
import { createSlice } from "@reduxjs/toolkit";

let messageSlice = createSlice({
    name :"message",
    initialState : {
        selectedUser : null,
    },
    reducers : {
        addSelectedUser : (state, action)=>{
            state.selectedUser = action.payload
        }
    }
});

export let {addSelectedUser} = messageSlice.actions;

export default messageSlice.reducer;
