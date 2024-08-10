import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./src/slices/userSlice";

export default configureStore({
    reducer: {
        user: userReducer,
    },
});
