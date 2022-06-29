import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import thunk from "redux-thunk";

import authSlice from './auth';
import requestNewSlice from './request-new';
import uploadLaporanSlice from "./upload-laporan";

const persistConfig = {
    key: 'root',
    storage: storageSession
}

const reducers = combineReducers({
    auth: authSlice,
    requestNew: requestNewSlice,
    uploadLaporan: uploadLaporanSlice
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: {
        persistedReducer
    },
    middleware: [thunk]
})

export const persistor = persistStore(store);