import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import thunk from "redux-thunk";

import authSlice from './auth';
import requestNewSlice from './request-new';
import uploadLaporanSlice from "./upload-laporan";
import approvalKalkualSlice from "./approval-kalkual";
import barcodeSlice from './barcode-gen';
import requestScanSlice from './request-scan';

const persistConfig = {
    key: 'root',
    storage: storageSession
}

const reducers = combineReducers({
    auth: authSlice,
    requestNew: requestNewSlice,
    uploadLaporan: uploadLaporanSlice,
    approvalKalkual: approvalKalkualSlice,
    barcode: barcodeSlice,
    requestScan: requestScanSlice
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: {
        persistedReducer
    },
    middleware: [thunk]
})

export const persistor = persistStore(store);