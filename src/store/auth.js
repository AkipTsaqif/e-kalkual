import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authorized: false,
        user: null,
        token: null,
        expiry: null,
        isLoggedOut: false
    },
    reducers: {
        login: (state, action) => {
            state.authorized = true;
            state.isLoggedOut = false;
            state.user = action.payload.Username;
            state.token = action.payload.Token;
            state.expiry = action.payload.ExpiresIn;
        },
        logout: (state, action) => {
            state.authorized = false;
            state.isLoggedOut = true;
            state.user = null;
            state.token = null;
            state.expiry = null;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;