import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth';
import requestNewSlice from './request-new';

const store = configureStore({
    reducer: {
        auth: authSlice,
        requestNew: requestNewSlice
    }
})

export default store;