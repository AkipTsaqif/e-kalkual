import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authorized: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.authorized = true;
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.authorized = false;
            state.user = null;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;