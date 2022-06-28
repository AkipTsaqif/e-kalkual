import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth';
import requestNewSlice from './request-new';
import uploadLaporanSlice from "./upload-laporan";

const store = configureStore({
    reducer: {
        auth: authSlice,
        requestNew: requestNewSlice,
        uploadLaporan: uploadLaporanSlice
    }
})

export default store;