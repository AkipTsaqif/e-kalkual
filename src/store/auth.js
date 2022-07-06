import { createSlice } from "@reduxjs/toolkit";
import { colorRandomizer } from "../utils/colorRandomizer";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authorized: false,
        user: null,
        token: null,
        expiry: null,
        isLoggedOut: null,
        profileColor: colorRandomizer
    },
    reducers: {
        login: (state, action) => {
            state.authorized = true;
            state.isLoggedOut = null;
            state.user = action.payload.Username;
            state.token = action.payload.Token;
            state.expiry = action.payload.ExpiresIn;
            state.profileColor = colorRandomizer();
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