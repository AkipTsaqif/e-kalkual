import { createSlice } from "@reduxjs/toolkit";

const labelSlice = createSlice({
    name: "label",
    initialState: {
        RequestID: "",
        NoIN: "",
        TipeKalkual: "",
        TipeAlat: "",
        Departemen: "",
        Jenis: "",
        JenisKalkual: "",
        NamaAlat: "",
        NoKontrol: "",
        Lokasi: "",
        TglKalkual: "",
        EDKalkual: "",
        Approvee: "",
        Approver: "",
        TglApprove: "",
        ParameterUji: "",
    },
    reducers: {
        generateLabel: (state, action) => {
            console.log(action.payload)
            state.RequestID = action.payload.RequestID;
            state.NoIN = action.payload.NoIN;
            state.TipeKalkual = action.payload.TipeKalkual;
            state.TipeAlat = action.payload.Tipe;
            state.Departemen = action.payload.Departemen;
            state.Jenis = action.payload.Jenis;
            state.JenisKalkual = action.payload.JenisKalkual;
            state.NamaAlat = action.payload.Nama;
            state.NoKontrol = action.payload.NoKontrol;
            state.Lokasi = action.payload.Lokasi;
            state.TglKalkual = action.payload.TglKalkual;
            state.EDKalkual = action.payload.EDKalkual;
            state.Approvee = action.payload.Approvee;
            state.Approver = action.payload.Approver;
            state.TglApprove = action.payload.TglApprove;
            state.ParameterUji = action.payload.ParameterUji;
        },
        removeLabel: () => labelSlice.initialState,
        generateQR: (state, action) => {
            state.NoIN = action.payload;
        }
    }
});

export const labelActions = labelSlice.actions;
export default labelSlice.reducer;
