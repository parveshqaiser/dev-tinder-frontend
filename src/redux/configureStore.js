
import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import messageSlice from "./messageSlice";

let appStore = configureStore({
    reducer : {
        user : userSlice,
        message : messageSlice
    }
});

export default appStore;