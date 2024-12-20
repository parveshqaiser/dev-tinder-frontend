
import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import messageSlice from "./messageSlice";
import socketSlice from "./socketSlice";

let reduxStore = configureStore({
    reducer : {
        user : userSlice,
        message : messageSlice,
        socket : socketSlice
    }
});

export default reduxStore;