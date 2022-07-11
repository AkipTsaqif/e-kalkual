import { createSlice, combineReducers } from "@reduxjs/toolkit";

const approvalKalkualSlice = createSlice({
    name: "approvalKalkual",
    initialState: {
        NoIN: "",
        TipeKalkual: "",
        NamaAlat: "",
        NoKontrol: "",
        Departemen: "",
        Lokasi: "",
        TglKalkual: "",
        EDKalkual: "",
        Remarks: ""
    },
    reducers: {
        selectApproval: (state, action) => {
            console.log(action.payload);
            state.NoIN = action.payload;
        }
    }
});

export const approvalKalkualActions = approvalKalkualSlice.actions;
export default approvalKalkualSlice.reducer;
