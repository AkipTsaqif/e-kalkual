import { createSlice } from "@reduxjs/toolkit";

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
            state.NoIN = action.payload;
        },
        cancelApproval: (state, action) => {
            state.NoIN = "";
        }
    }
});

export const approvalKalkualActions = approvalKalkualSlice.actions;
export default approvalKalkualSlice.reducer;
